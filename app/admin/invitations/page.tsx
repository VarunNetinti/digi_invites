"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Invitation } from "@/lib/types";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";

const templateName = (id: string) =>
  TEMPLATE_REGISTRY.find((t) => t.id === id)?.name ?? id;
const templateEmoji = (id: string) =>
  TEMPLATE_REGISTRY.find((t) => t.id === id)?.emoji ?? "💍";

function fmt(d: string) {
  if (!d) return "—";
  try { return new Date(d + "T00:00:00").toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return d; }
}

function timeAgo(iso: string) {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return "Today";
  if (d === 1) return "Yesterday";
  if (d < 30) return `${d} days ago`;
  const m = Math.floor(d / 30);
  return m === 1 ? "1 month ago" : `${m} months ago`;
}

type ArchiveStage =
  | "idle"
  | "screenshot"   // taking screenshot
  | "uploading"    // uploading snapshot to Cloudinary
  | "deleting"     // deleting original images
  | "saving"       // saving archive record to DB
  | "done"
  | "error";

export default function InvitationsListPage() {
  const router = useRouter();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"active" | "archived">("active");

  // Archive flow state
  const [confirmArchive, setConfirmArchive] = useState<Invitation | null>(null);
  const [archiveStage, setArchiveStage] = useState<ArchiveStage>("idle");
  const [archiveError, setArchiveError] = useState("");
  const [archiveResult, setArchiveResult] = useState<{ snapshotUrl: string; inv: Invitation } | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "authenticated") router.replace("/admin/login");
  }, [router]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/invitations");
      const data = await res.json();
      const sorted = [...(data.invitations ?? [])].sort(
        (a: Invitation, b: Invitation) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setInvitations(sorted);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Archive handler ──────────────────────────────────────────────────────
  const handleArchive = async (inv: Invitation) => {
    setArchiveStage("screenshot");
    setArchiveError("");

    try {
      const res = await fetch("/api/archive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: inv.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Archive failed");

      // Update local state
      setInvitations(prev =>
        prev.map(i => i.id === inv.id
          ? { ...i, archived: true, archivedAt: new Date().toISOString(), archiveSnapshotUrl: data.snapshotUrl, imageUrls: [], heroImageUrls: [], storyImageUrls: [], brideFamilyImageUrls: [], groomFamilyImageUrls: [] }
          : i
        )
      );

      setArchiveStage("done");
      setArchiveResult({ snapshotUrl: data.snapshotUrl, inv });
    } catch (err) {
      setArchiveError(err instanceof Error ? err.message : "Archive failed");
      setArchiveStage("error");
    }
  };

  const closeArchiveModal = () => {
    setConfirmArchive(null);
    setArchiveStage("idle");
    setArchiveError("");
    setArchiveResult(null);
  };

  // ── Filtered lists ──────────────────────────────────────────────────────
  const active = invitations.filter(i =>
    !i.archived &&
    `${i.brideName} ${i.groomName} ${i.slug}`.toLowerCase().includes(search.toLowerCase())
  );
  const archived = invitations.filter(i =>
    i.archived &&
    `${i.brideName} ${i.groomName} ${i.slug}`.toLowerCase().includes(search.toLowerCase())
  );
  const displayed = tab === "active" ? active : archived;

  // ── Stage labels for archive progress ──────────────────────────────────
  const stageLabel: Record<ArchiveStage, string> = {
    idle: "",
    screenshot: "📸 Taking full-page screenshot…",
    uploading: "☁️ Uploading snapshot to Cloudinary…",
    deleting: "🗑 Deleting original images…",
    saving: "💾 Saving deactivation record…",
    done: "✅ Deactivated successfully",
    error: "❌ Deactivation failed",
  };

  // ── Spinner ──────────────────────────────────────────────────────────────
  const isProcessing = ["screenshot", "uploading", "deleting", "saving"].includes(archiveStage);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'Montserrat',sans-serif", color: "#fff" }}>

      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, height: 60, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,15,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{ fontSize: 18 }}>💍</span>
          <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: 20, color: "#c9a84c" }}>Digi Invites</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/dashboard" style={{ padding: "7px 16px", borderRadius: 8, background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", color: "#0a0a0f", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}>+ New</Link>
          <button onClick={() => { sessionStorage.removeItem("admin_auth"); router.push("/admin/login"); }} style={{ padding: "7px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", cursor: "pointer", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid #1a1a2e", padding: "0 28px", display: "flex", gap: 0 }}>
        {[
          { key: "active" as const, label: "Active Invitations", count: invitations.filter(i => !i.archived).length },
          { key: "archived" as const, label: "Deactivated", count: invitations.filter(i => i.archived).length },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{ padding: "14px 20px", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: tab === t.key ? "#c9a84c" : "#555", background: "none", border: "none", borderBottom: tab === t.key ? "2px solid #c9a84c" : "2px solid transparent", marginBottom: -1, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
          >
            {t.label}
            <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: tab === t.key ? "rgba(201,168,76,0.15)" : "#1a1a2e", color: tab === t.key ? "#c9a84c" : "#555" }}>{t.count}</span>
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 28px" }}>

        {/* Stats + Search */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {[
              { label: "Total", value: invitations.length, color: "#c9a84c" },
              { label: "Active", value: invitations.filter(i => !i.archived).length, color: "#4ade80" },
              { label: "Deactivated", value: invitations.filter(i => i.archived).length, color: "#888" },
            ].map(s => (
              <div key={s.label} style={{ padding: "12px 18px", background: "#111118", border: "1px solid #1e1e2e", borderRadius: 12, minWidth: 72, textAlign: "center" }}>
                <p style={{ fontSize: 22, color: s.color, fontFamily: "'Playfair Display',serif", lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: 9, color: "#555", letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div style={{ position: "relative", flex: 1, maxWidth: 340 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#555", fontSize: 14 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or slug…"
              style={{ width: "100%", padding: "10px 14px 10px 36px", borderRadius: 10, background: "#111118", border: "1px solid #1e1e2e", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200, gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #c9a84c", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
            <p style={{ color: "#555", fontSize: 13 }}>Loading…</p>
          </div>
        ) : displayed.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{tab === "archived" ? "🗃️" : "💍"}</div>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 36, color: "#c9a84c", marginBottom: 8 }}>
              {search ? "No results found" : tab === "archived" ? "No deactivated invitations" : "No invitations yet"}
            </p>
            <p style={{ color: "#555", fontSize: 13 }}>
              {search ? `No invitations match "${search}"` : tab === "archived" ? "Deactivated invitations appear here with their snapshots." : "Create your first wedding invitation to get started."}
            </p>
            {!search && tab === "active" && (
              <Link href="/admin/dashboard" style={{ display: "inline-block", marginTop: 20, padding: "12px 28px", background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", color: "#0a0a0f", borderRadius: 10, textDecoration: "none", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>+ Create Invitation</Link>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {displayed.map(inv => (
              <div key={inv.id} style={{ background: inv.archived ? "rgba(17,17,24,0.6)" : "#111118", border: `1px solid ${inv.archived ? "#1a1a2e" : "#1e1e2e"}`, borderRadius: 16, padding: "20px 24px", display: "grid", gridTemplateColumns: inv.archived ? "auto auto 1fr auto" : "auto 1fr auto", gap: 20, alignItems: "center", opacity: inv.archived ? 0.75 : 1, transitionProperty: "border-color", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = inv.archived ? "#2a2a3a" : "rgba(201,168,76,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = inv.archived ? "#1a1a2e" : "#1e1e2e")}
              >
                {/* Snapshot thumbnail for archived */}
                {inv.archived && inv.archiveSnapshotUrl && (
                  <div style={{ width: 48, height: 64, borderRadius: 6, overflow: "hidden", border: "1px solid #2a2a3a", flexShrink: 0 }}>
                    <img src={inv.archiveSnapshotUrl} alt="Snapshot" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                  </div>
                )}
                {inv.archived && !inv.archiveSnapshotUrl && (
                  <div style={{ width: 48, height: 64, borderRadius: 6, background: "#1a1a2e", border: "1px solid #2a2a3a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🗃️</div>
                )}

                {/* Template badge */}
                <div style={{ width: 56, height: 56, borderRadius: 12, background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.12)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, flexShrink: 0 }}>
                  <span style={{ fontSize: 22 }}>{templateEmoji(inv.templateId)}</span>
                  <span style={{ fontSize: 7, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}>T{inv.templateId?.replace("template", "") ?? "?"}</span>
                </div>

                {/* Info */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: inv.archived ? "#888" : "#fff", margin: 0, fontWeight: 400 }}>
                      {inv.brideName} &amp; {inv.groomName}
                    </h3>
                    <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: "rgba(201,168,76,0.08)", color: inv.archived ? "#666" : "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(201,168,76,0.15)" }}>
                      {templateName(inv.templateId)}
                    </span>
                    {inv.archived && (
                      <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: "rgba(100,100,120,0.15)", color: "#888", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid #2a2a3a" }}>🚫 Deactivated</span>
                    )}
                    {inv.lang && inv.lang !== "english" && (
                      <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: "rgba(100,168,201,0.08)", color: "#7ab8c9", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(100,168,201,0.2)" }}>
                        🌐 {inv.lang.charAt(0).toUpperCase() + inv.lang.slice(1)}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: "#555" }}>📅 {fmt(inv.date)}</span>
                    <span style={{ fontSize: 12, color: "#555" }}>📍 {inv.venue || "—"}</span>
                    <span style={{ fontSize: 12, color: "#444" }}>Created {timeAgo(inv.createdAt)}</span>
                    {inv.archived && inv.archivedAt && (
                      <span style={{ fontSize: 12, color: "#3a3a4a" }}>Deactivated {timeAgo(inv.archivedAt)}</span>
                    )}
                    <span style={{ fontSize: 12, color: "#333", fontFamily: "monospace" }}>/{inv.slug}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  {!inv.archived && (
                    <>
                      <a href={`/${inv.slug}`} target="_blank" rel="noreferrer"
                        style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80", textDecoration: "none", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>👁 View</a>
                      <Link href={`/admin/invitations/${inv.id}/edit`}
                        style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", textDecoration: "none", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>✏️ Edit</Link>
                      <a href={`/api/export?id=${inv.id}`} download={`invitation-${inv.slug}.zip`}
                        style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(100,120,255,0.08)", border: "1px solid rgba(100,120,255,0.25)", color: "#a0b4ff", textDecoration: "none", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>📦 Export</a>
                      <button onClick={() => { setConfirmArchive(inv); setArchiveStage("idle"); setArchiveError(""); setArchiveResult(null); }}
                        style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa", cursor: "pointer", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>🚫 Deactivate</button>
                    </>
                  )}
                  {inv.archived && inv.archiveSnapshotUrl && (
                    <a href={inv.archiveSnapshotUrl} target="_blank" rel="noreferrer"
                      style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(100,100,120,0.1)", border: "1px solid #2a2a3a", color: "#888", textDecoration: "none", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>🖼 View Snapshot</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Archive modal ── */}
      {confirmArchive && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
          <div style={{ background: "#111118", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 20, padding: 40, maxWidth: 480, width: "100%", textAlign: "center" }}>

            {/* Idle / confirm */}
            {archiveStage === "idle" && (
              <>
                <div style={{ fontSize: 44, marginBottom: 16 }}>🚫</div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#fff", marginBottom: 8, fontWeight: 400 }}>Deactivate Invitation?</h2>
                <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
                  This will deactivate the invitation: take a full-page snapshot, save it permanently, then remove all uploaded photos from Cloudinary. The link will stop accepting edits but the snapshot stays accessible.
                </p>
                <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 28, color: "#a78bfa", marginBottom: 20 }}>
                  {confirmArchive.brideName} &amp; {confirmArchive.groomName}
                </p>
                <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 10, padding: "12px 16px", marginBottom: 24, textAlign: "left" }}>
                  <p style={{ fontSize: 12, color: "#a78bfa", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>What happens:</p>
                  {[
                    "📸 Full-page screenshot taken of the live invitation",
                    "☁️ Snapshot stored permanently in Cloudinary",
                    "🗑 All original photos deleted from Cloudinary",
                    "🔒 Invitation marked as deactivated (no longer editable)",
                  ].map((item, i) => (
                    <p key={i} style={{ fontSize: 12, color: "#777", lineHeight: 1.8 }}>{item}</p>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={closeArchiveModal} style={{ flex: 1, padding: 14, borderRadius: 10, background: "transparent", border: "1px solid #333", color: "#888", cursor: "pointer", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Cancel</button>
                  <button onClick={() => handleArchive(confirmArchive)} style={{ flex: 1, padding: 14, borderRadius: 10, background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.35)", color: "#a78bfa", cursor: "pointer", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Yes, Deactivate
                  </button>
                </div>
              </>
            )}

            {/* Processing */}
            {isProcessing && (
              <>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: "3px solid rgba(139,92,246,0.3)", borderTopColor: "#a78bfa", animation: "spin 1s linear infinite", margin: "0 auto 24px" }} />
                <p style={{ color: "#a78bfa", fontSize: 14, letterSpacing: "0.1em", marginBottom: 8 }}>
                  {stageLabel[archiveStage]}
                </p>
                <p style={{ color: "#555", fontSize: 12, lineHeight: 1.6 }}>
                  This takes 15–30 seconds. Please don&apos;t close this window.
                </p>
                <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 6 }}>
                  {(["screenshot", "uploading", "deleting", "saving"] as ArchiveStage[]).map((s, i) => (
                    <div key={s} style={{ width: 8, height: 8, borderRadius: "50%", background: (["screenshot", "uploading", "deleting", "saving"] as ArchiveStage[]).indexOf(archiveStage) >= i ? "#a78bfa" : "#2a2a3a", transitionProperty: "background", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />
                  ))}
                </div>
              </>
            )}

            {/* Done */}
            {archiveStage === "done" && archiveResult && (
              <>
                <div style={{ fontSize: 44, marginBottom: 16 }}>✅</div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#4ade80", marginBottom: 8, fontWeight: 400 }}>Deactivated Successfully</h2>
                <p style={{ color: "#888", fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>
                  The snapshot has been saved and all original photos have been removed from Cloudinary.
                </p>
                {/* Snapshot preview */}
                <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #2a2a3a", marginBottom: 20, maxHeight: 280, position: "relative" }}>
                  <img src={archiveResult.snapshotUrl} alt="Deactivated snapshot" style={{ width: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(17,17,24,0.9), transparent)", padding: "16px 12px 10px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <p style={{ color: "#a78bfa", fontSize: 11, letterSpacing: "0.1em" }}>Full-page snapshot</p>
                    <a href={archiveResult.snapshotUrl} target="_blank" rel="noreferrer" style={{ color: "#c9a84c", fontSize: 11, textDecoration: "none", letterSpacing: "0.1em" }}>Open full ↗</a>
                  </div>
                </div>
                <button onClick={closeArchiveModal} style={{ width: "100%", padding: 14, borderRadius: 10, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80", cursor: "pointer", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Done</button>
              </>
            )}

            {/* Error */}
            {archiveStage === "error" && (
              <>
                <div style={{ fontSize: 44, marginBottom: 16 }}>❌</div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#f87171", marginBottom: 8, fontWeight: 400 }}>Archive Failed</h2>
                <p style={{ color: "#888", fontSize: 13, marginBottom: 8, lineHeight: 1.7 }}>
                  {archiveError || "Something went wrong during the archive process."}
                </p>
                <p style={{ color: "#555", fontSize: 12, marginBottom: 24, lineHeight: 1.6 }}>
                  The invitation has not been modified. You can try again.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={closeArchiveModal} style={{ flex: 1, padding: 14, borderRadius: 10, background: "transparent", border: "1px solid #333", color: "#888", cursor: "pointer", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Close</button>
                  <button onClick={() => { setArchiveStage("idle"); setArchiveError(""); }} style={{ flex: 1, padding: 14, borderRadius: 10, background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa", cursor: "pointer", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Try Again</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
