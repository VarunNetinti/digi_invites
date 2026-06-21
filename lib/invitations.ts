import fs from "fs/promises";
import path from "path";
import { Invitation } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "invitations.json");

export async function ensureDataFile(): Promise<void> {
  try { await fs.access(DATA_DIR); } catch { await fs.mkdir(DATA_DIR, { recursive: true }); }
  try { await fs.access(DATA_FILE); } catch { await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), "utf-8"); }
}

export async function getAllInvitations(): Promise<Invitation[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Invitation[];
}

/** Backfill new fields so old invitations don't crash templates */
function normaliseInvitation(inv: Invitation): Invitation {
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

export async function getInvitationBySlug(slug: string): Promise<Invitation | null> {
  const invitations = await getAllInvitations();
  const inv = invitations.find((i) => i.slug === slug) ?? null;
  return inv ? normaliseInvitation(inv) : null;
}

export async function saveInvitation(invitation: Invitation): Promise<void> {
  const invitations = await getAllInvitations();
  invitations.push(invitation);
  await fs.writeFile(DATA_FILE, JSON.stringify(invitations, null, 2), "utf-8");
}

export function generateSlug(brideName: string, groomName: string): string {
  const clean = (name: string) =>
    name.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
  return `${clean(brideName)}-${clean(groomName)}`;
}

export async function generateUniqueSlug(brideName: string, groomName: string): Promise<string> {
  const base = generateSlug(brideName, groomName);
  const invitations = await getAllInvitations();
  const existingSlugs = new Set(invitations.map((inv) => inv.slug));
  if (!existingSlugs.has(base)) return base;
  let counter = 2;
  while (existingSlugs.has(`${base}-${counter}`)) counter++;
  return `${base}-${counter}`;
}
