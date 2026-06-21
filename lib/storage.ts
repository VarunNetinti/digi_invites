/**
 * lib/storage.ts
 * Unified invitation storage adapter.
 *
 * Priority:
 *   1. MongoDB Atlas  — when MONGODB_URI is set and reachable
 *   2. Local JSON     — data/invitations.json  (fallback)
 *
 * All callers (API routes) import from here; they never touch the DB or FS directly.
 */

import { Invitation } from "./types";
import { connectToDatabase } from "./db";

// ─── lazy import of local JSON helpers so they are only loaded when needed ────
async function localStore() {
  return await import("./invitations");
}

// ─── lazy import of Mongoose model ────────────────────────────────────────────
async function getModel() {
  const { default: InvitationModel } = await import("./models/Invitation");
  return InvitationModel;
}

// ─── Normalise helper (keeps old invitations compatible) ─────────────────────
function normalise(inv: Invitation): Invitation {
  return {
    ...inv,

    events: inv.events ?? [],
    coupleHashtag: inv.coupleHashtag ?? "",
    rsvpWhatsapp: inv.rsvpWhatsapp ?? "",
    venueMapUrl: inv.venueMapUrl ?? "",
    backgroundMusicUrl: inv.backgroundMusicUrl ?? "",
    specialNote: inv.specialNote ?? "",
    brideAbout: inv.brideAbout ?? "",
    groomAbout: inv.groomAbout ?? "",
    heroImageUrls: inv.heroImageUrls ?? [],
    storyImageUrls: inv.storyImageUrls ?? [],
    brideFamilyImageUrls: inv.brideFamilyImageUrls ?? [],
    groomFamilyImageUrls: inv.groomFamilyImageUrls ?? [],

    brideFamily: {
      fatherName: inv.brideFamily?.fatherName ?? "",
      motherName: inv.brideFamily?.motherName ?? "",
      members: inv.brideFamily?.members ?? [],
    },

    groomFamily: {
      fatherName: inv.groomFamily?.fatherName ?? "",
      motherName: inv.groomFamily?.motherName ?? "",
      members: inv.groomFamily?.members ?? [],
    },
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAllInvitations(): Promise<Invitation[]> {
  const conn = await connectToDatabase();

  if (conn) {
    const Model = await getModel();
    const docs = await Model.find({}).lean();
    return (docs as unknown as Invitation[]).map(normalise);
  }

  const local = await localStore();
  return local.getAllInvitations();
}

export async function getInvitationBySlug(slug: string): Promise<Invitation | null> {
  const conn = await connectToDatabase();

  if (conn) {
    const Model = await getModel();
    const doc = await Model.findOne({ slug }).lean();
    if (!doc) return null;
    return normalise(doc as unknown as Invitation);
  }

  const local = await localStore();
  return local.getInvitationBySlug(slug);
}

export async function saveInvitation(invitation: Invitation): Promise<void> {
  const conn = await connectToDatabase();

  if (conn) {
    const Model = await getModel();
    await Model.create(invitation);
    return;
  }

  const local = await localStore();
  return local.saveInvitation(invitation);
}

export async function expireInvitation(id: string): Promise<void> {
  const conn = await connectToDatabase();

  if (conn) {
    const Model = await getModel();
    await Model.updateOne({ id }, { $set: { expired: true } });
    return;
  }

  // Local JSON fallback — update in-place
  const local = await localStore();
  const all = await local.getAllInvitations();
  const updated = all.map((inv) => (inv.id === id ? { ...inv, expired: true } : inv));
  const fs = await import("fs/promises");
  const path = await import("path");
  const DATA_FILE = path.join(process.cwd(), "data", "invitations.json");
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
}

// Re-export slug helpers (they are DB-agnostic)
export async function generateUniqueSlug(brideName: string, groomName: string): Promise<string> {
  const clean = (n: string) =>
    n.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
  const base = `${clean(brideName)}-${clean(groomName)}`;

  const all = await getAllInvitations();
  const existing = new Set(all.map((i) => i.slug));
  if (!existing.has(base)) return base;
  let counter = 2;
  while (existing.has(`${base}-${counter}`)) counter++;
  return `${base}-${counter}`;
}

/** Returns which backend is active — useful for health checks / logging */
export async function getStorageBackend(): Promise<"mongodb" | "local"> {
  const conn = await connectToDatabase();
  return conn ? "mongodb" : "local";
}

export async function updateInvitation(id: string, data: Partial<Invitation>): Promise<boolean> {
  const conn = await connectToDatabase();

  if (conn) {
    const Model = await getModel();
    const res = await Model.updateOne({ id }, { $set: data });
    return res.modifiedCount > 0;
  }

  // Local JSON fallback
  const local = await localStore();
  const all = await local.getAllInvitations();
  let found = false;
  const updated = all.map((inv) => {
    if (inv.id === id) { found = true; return { ...inv, ...data }; }
    return inv;
  });
  if (!found) return false;
  const fs = await import("fs/promises");
  const path = await import("path");
  const DATA_FILE = path.join(process.cwd(), "data", "invitations.json");
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return true;
}

export async function deleteInvitation(id: string): Promise<boolean> {
  const conn = await connectToDatabase();

  if (conn) {
    const Model = await getModel();
    const res = await Model.deleteOne({ id });
    return res.deletedCount > 0;
  }

  // Local JSON fallback
  const local = await localStore();
  const all = await local.getAllInvitations();
  const filtered = all.filter((inv) => inv.id !== id);
  if (filtered.length === all.length) return false;
  const fs = await import("fs/promises");
  const path = await import("path");
  const DATA_FILE = path.join(process.cwd(), "data", "invitations.json");
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export async function getInvitationById(id: string): Promise<Invitation | null> {
  const conn = await connectToDatabase();

  if (conn) {
    const Model = await getModel();
    const doc = await Model.findOne({ id }).lean();
    if (!doc) return null;
    return normalise(doc as unknown as Invitation);
  }

  const local = await localStore();
  const all = await local.getAllInvitations();
  const inv = all.find((i) => i.id === id) ?? null;
  return inv ? normalise(inv) : null;
}

export async function archiveInvitation(
  id: string,
  snapshotUrl: string
): Promise<boolean> {
  const updates = {
    archived: true,
    archivedAt: new Date().toISOString(),
    archiveSnapshotUrl: snapshotUrl,
    // Wipe all Cloudinary image arrays — images are deleted separately via API
    imageUrls: [],
    heroImageUrls: [],
    storyImageUrls: [],
    brideFamilyImageUrls: [],
    groomFamilyImageUrls: [],
  };

  const conn = await connectToDatabase();

  if (conn) {
    const Model = await getModel();
    const res = await Model.updateOne({ id }, { $set: updates });
    return res.modifiedCount > 0;
  }

  // Local JSON fallback
  const local = await localStore();
  const all = await local.getAllInvitations();
  let found = false;
  const updated = all.map((inv) => {
    if (inv.id === id) { found = true; return { ...inv, ...updates }; }
    return inv;
  });
  if (!found) return false;
  const fs = await import("fs/promises");
  const path = await import("path");
  const DATA_FILE = path.join(process.cwd(), "data", "invitations.json");
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return true;
}
