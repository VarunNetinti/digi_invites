"use client";

import { useState, useRef, ChangeEvent, FormEvent, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Invitation, FamilyDetails, FamilyMember, WeddingEvent } from "@/lib/types";
import { TEMPLATE_REGISTRY as TEMPLATES } from "@/lib/templateRegistry";
import QuickToolbar from "@/components/admin/QuickToolbar";
import GalleryPanel from "@/components/admin/GalleryPanel";

const MobilePreview = dynamic(() => import("@/components/MobilePreview"), { ssr: false });

const EMPTY_FAMILY: FamilyDetails = { fatherName: "", motherName: "", members: [] };

const EMPTY_EVENT: WeddingEvent = { name: "", date: "", time: "", venue: "", venueAddress: "", description: "" };

const EMPTY_FORM = {
  brideName: "", groomName: "",
  brideAbout: "", groomAbout: "",
  date: "", time: "", venue: "", venueAddress: "",
  receptionVenue: "", receptionTime: "",
  dressCode: "",
  rsvpContact: "", rsvpDeadline: "", rsvpWhatsapp: "",
  story: "",
  coupleHashtag: "",
  venueMapUrl: "",
  backgroundMusicUrl: "",
  openingEffect: "hearts",
  openingFormat: "letter",
  lang: "english",
  galleryStyle: "slideshow",
  galleryFillet: "soft",
  heroGalleryStyle: "slideshow",
  heroGalleryFillet: "soft",
  storyGalleryStyle: "slideshow",
  storyGalleryFillet: "soft",
  brideFamilyGalleryStyle: "slideshow",
  brideFamilyGalleryFillet: "soft",
  groomFamilyGalleryStyle: "slideshow",
  groomFamilyGalleryFillet: "soft",
  specialNote: "",
  templateId: "",
  fontFamily: "Great Vibes",
  accentColor: "",
  brideFamily: { ...EMPTY_FAMILY, members: [] } as FamilyDetails,
  groomFamily: { ...EMPTY_FAMILY, members: [] } as FamilyDetails,
  events: [] as WeddingEvent[],
};

type FormState = typeof EMPTY_FORM;
type Errors = Partial<Record<keyof FormState | "images", string>>;

/* ─────────────── Helpers ─────────────── */

function buildPreviewInvitation(form: FormState, imgs: {
  imageUrls: string[];
  heroImageUrls: string[];
  storyImageUrls: string[];
  brideFamilyImageUrls: string[];
  groomFamilyImageUrls: string[];
}): Invitation {
  return { id: "preview", slug: "preview", createdAt: new Date().toISOString(), ...imgs, ...form };
}

/* ─────────────── Sub-components ─────────────── */

function InputField({ label, name, value, onChange, type = "text", placeholder = "", error, required = false, hint }: {
  label: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string; placeholder?: string; error?: string; required?: boolean; hint?: string;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: 6 }}>
        {label}{required && " *"}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "#faf9f7", border: `1px solid ${error ? "#ef4444" : "#ddd8d0"}`, color: "#222", fontSize: 14, outline: "none", boxSizing: "border-box" }}
      />
      {hint && !error && <p style={{ color: "#bbb", fontSize: 10, marginTop: 4 }}>{hint}</p>}
      {error && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{error}</p>}
    </div>
  );
}

function SectionCard({ title, children, collapsible = false }: { title: string; children: React.ReactNode; collapsible?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background: "#ffffff", border: "1px solid #e8e4df", borderRadius: 16, overflow: "hidden" }}>
      <div
        onClick={collapsible ? () => setOpen(p => !p) : undefined}
        style={{ padding: "20px 24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: collapsible ? "pointer" : "default" }}
      >
        <h2 style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", margin: 0 }}>{title}</h2>
        {collapsible && <span style={{ color: "#bbb", fontSize: 14 }}>{open ? "▲" : "▼"}</span>}
      </div>
      {open && <div style={{ padding: "0 24px 24px" }}>{children}</div>}
    </div>
  );
}

function FamilySection({ label, value, onChange }: {
  label: string; value: FamilyDetails; onChange: (v: FamilyDetails) => void;
}) {
  const addMember = () => onChange({ ...value, members: [...(value.members || []), { name: "", relation: "" }] });
  const removeMember = (i: number) => onChange({ ...value, members: value.members.filter((_, idx) => idx !== i) });
  const updateMember = (i: number, field: keyof FamilyMember, val: string) => {
    const updated = value.members.map((m, idx) => idx === i ? { ...m, [field]: val } : m);
    onChange({ ...value, members: updated });
  };
  const inputStyle = { width: "100%", padding: "9px 12px", borderRadius: 8, background: "#faf9f7", border: "1px solid #ddd8d0", color: "#222", fontSize: 13, outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#999", display: "block", marginBottom: 4 };
  return (
    <div style={{ background: "#f5f3ef", border: "1px solid #e0dbd3", borderRadius: 12, padding: 18 }}>
      <p style={{ fontSize: 11, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>{label}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div>
          <label style={labelStyle}>Father&apos;s Name</label>
          <input style={inputStyle} value={value.fatherName} placeholder="e.g. Ramesh Sharma" onChange={e => onChange({ ...value, fatherName: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Mother&apos;s Name</label>
          <input style={inputStyle} value={value.motherName} placeholder="e.g. Sunita Sharma" onChange={e => onChange({ ...value, motherName: e.target.value })} />
        </div>
      </div>
      {(value.members || []).map((m, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginBottom: 8, alignItems: "end" }}>
          <div>
            {i === 0 && <label style={labelStyle}>Member Name</label>}
            <input style={inputStyle} value={m.name} placeholder="e.g. Anjali Sharma" onChange={e => updateMember(i, "name", e.target.value)} />
          </div>
          <div>
            {i === 0 && <label style={labelStyle}>Relation</label>}
            <input style={inputStyle} value={m.relation} placeholder="e.g. Sister" onChange={e => updateMember(i, "relation", e.target.value)} />
          </div>
          <button type="button" onClick={() => removeMember(i)} style={{ padding: "9px 12px", borderRadius: 8, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", cursor: "pointer", fontSize: 13, marginTop: i === 0 ? 18 : 0 }}>✕</button>
        </div>
      ))}
      <button type="button" onClick={addMember} style={{ marginTop: 8, padding: "8px 16px", borderRadius: 8, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", cursor: "pointer", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
        + Add Family Member
      </button>
    </div>
  );
}

function EventsSection({ events, onChange }: { events: WeddingEvent[]; onChange: (v: WeddingEvent[]) => void }) {
  const inputStyle = { width: "100%", padding: "8px 12px", borderRadius: 8, background: "#faf9f7", border: "1px solid #ddd8d0", color: "#222", fontSize: 13, outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#999", display: "block", marginBottom: 4 };

  const addEvent = () => onChange([...events, { ...EMPTY_EVENT }]);
  const removeEvent = (i: number) => onChange(events.filter((_, idx) => idx !== i));
  const updateEvent = (i: number, field: keyof WeddingEvent, val: string) => {
    onChange(events.map((ev, idx) => idx === i ? { ...ev, [field]: val } : ev));
  };

  return (
    <div>
      <p style={{ color: "#bbb", fontSize: 12, marginBottom: 16, lineHeight: 1.6 }}>
        Add ceremonies like Mehendi, Sangeet, Haldi, Baraat, etc. These appear as a beautiful event timeline on the invitation.
      </p>
      {events.map((ev, i) => (
        <div key={i} style={{ background: "#f5f3ef", border: "1px solid #e0dbd3", borderRadius: 12, padding: 18, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ fontSize: 11, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase" }}>Event {i + 1}</p>
            <button type="button" onClick={() => removeEvent(i)} style={{ padding: "5px 10px", borderRadius: 6, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", cursor: "pointer", fontSize: 11 }}>Remove</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div>
              <label style={labelStyle}>Event Name *</label>
              <input style={inputStyle} value={ev.name} placeholder="e.g. Mehendi Ceremony" onChange={e => updateEvent(i, "name", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Venue *</label>
              <input style={inputStyle} value={ev.venue} placeholder="e.g. Bride's Residence" onChange={e => updateEvent(i, "venue", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input style={inputStyle} type="date" value={ev.date} onChange={e => updateEvent(i, "date", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Time</label>
              <input style={inputStyle} type="time" value={ev.time} onChange={e => updateEvent(i, "time", e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={labelStyle}>Venue Address</label>
            <input style={inputStyle} value={ev.venueAddress || ""} placeholder="Full address" onChange={e => updateEvent(i, "venueAddress", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <input style={inputStyle} value={ev.description || ""} placeholder="Optional details for guests" onChange={e => updateEvent(i, "description", e.target.value)} />
          </div>
        </div>
      ))}
      <button type="button" onClick={addEvent} style={{ marginTop: 4, padding: "10px 20px", borderRadius: 10, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", cursor: "pointer", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", width: "100%" }}>
        + Add Ceremony / Event
      </button>
    </div>
  );
}

/* ─────────────── Main Page ─────────────── */

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth !== "authenticated") router.replace("/admin/login");
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [hoveredTemplateId, setHoveredTemplateId] = useState<string | null>(null);

  // ── Purposeful image buckets ──
  type ImgBucket = { previews: { preview: string; url?: string }[]; urls: string[] };
  const emptyBucket = (): ImgBucket => ({ previews: [], urls: [] });
  const [heroImgs,        setHeroImgs]        = useState<ImgBucket>(emptyBucket());
  const [storyImgs,       setStoryImgs]       = useState<ImgBucket>(emptyBucket());
  const [brideFamilyImgs, setBrideFamilyImgs] = useState<ImgBucket>(emptyBucket());
  const [groomFamilyImgs, setGroomFamilyImgs] = useState<ImgBucket>(emptyBucket());
  // legacy bucket (kept so buildPreviewInvitation still works for imageUrls field)
  const [legacyUrls, setLegacyUrls] = useState<string[]>([]);

  const [uploadingBucket, setUploadingBucket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<{ slug: string; url: string; id: string } | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLInputElement>(null);
  const storyRef = useRef<HTMLInputElement>(null);
  const brideFamRef = useRef<HTMLInputElement>(null);
  const groomFamRef = useRef<HTMLInputElement>(null);

  // previewInvitation uses hoveredTemplateId when hovering in the template dropdown
  // so the right-side MobilePreview updates live without committing the selection
  const previewInvitation = buildPreviewInvitation(
    { ...form, templateId: hoveredTemplateId || form.templateId },
    {
      imageUrls: legacyUrls,
      heroImageUrls: heroImgs.urls,
      storyImageUrls: storyImgs.urls,
      brideFamilyImageUrls: brideFamilyImgs.urls,
      groomFamilyImageUrls: groomFamilyImgs.urls,
    }
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  }, []);

  // Generic upload handler for any bucket
  const uploadFiles = async (
    selected: File[],
    setter: React.Dispatch<React.SetStateAction<ImgBucket>>,
    bucketKey: string,
  ) => {
    if (!selected.length) return;
    const invalid = selected.filter(f => !f.type.startsWith("image/"));
    if (invalid.length) { setErrors(prev => ({ ...prev, images: "Only image files allowed." })); return; }
    setErrors(prev => ({ ...prev, images: "" }));
    const newPreviews = selected.map(f => ({ preview: URL.createObjectURL(f) }));
    setter(prev => ({ ...prev, previews: [...prev.previews, ...newPreviews] }));
    setUploadingBucket(bucketKey);
    try {
      const fd = new FormData();
      selected.forEach(f => fd.append("images", f));
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      const urls: string[] = data.urls;
      setter(prev => {
        const updated = [...prev.previews];
        const startIdx = updated.length - newPreviews.length;
        newPreviews.forEach((p, i) => { updated[startIdx + i] = { ...p, url: urls[i] }; });
        return { previews: updated, urls: [...prev.urls, ...urls] };
      });
    } catch (err) {
      setErrors(prev => ({ ...prev, images: err instanceof Error ? err.message : "Upload failed" }));
      setter(prev => ({ ...prev, previews: prev.previews.filter(p => !newPreviews.find(np => np.preview === p.preview)) }));
    } finally {
      setUploadingBucket(null);
    }
  };

  const removeImg = (setter: React.Dispatch<React.SetStateAction<ImgBucket>>, idx: number) => {
    setter(prev => ({
      previews: prev.previews.filter((_, i) => i !== idx),
      urls: prev.urls.filter((_, i) => i !== idx),
    }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.brideName.trim()) e.brideName = "Required";
    if (!form.groomName.trim()) e.groomName = "Required";
    if (!form.date.trim()) e.date = "Required";
    if (!form.time.trim()) e.time = "Required";
    if (!form.venue.trim()) e.venue = "Required";
    if (!form.templateId) e.templateId = "Please select a template";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    if (uploadingBucket) { setSubmitError("Please wait for uploads to finish."); return; }
    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        imageUrls: legacyUrls,
        heroImageUrls: heroImgs.urls,
        storyImageUrls: storyImgs.urls,
        brideFamilyImageUrls: brideFamilyImgs.urls,
        groomFamilyImageUrls: groomFamilyImgs.urls,
      };
      const res = await fetch("/api/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setResult({ slug: data.slug, url: data.url, id: data.invitation?.id ?? "" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success Screen ── */
  if (result) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const fullUrl = `${origin}${result.url}`;
    const safeName = result.slug;
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#060410,#0d0820)", padding: 24 }}>
        <div style={{ maxWidth: 520, width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 24, padding: 48, textAlign: "center", fontFamily: "'Montserrat',sans-serif" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 44, color: "#c9a84c", margin: "0 0 8px" }}>Invitation Created!</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 32, fontSize: 14 }}>Your wedding invitation is live and ready to share.</p>
          <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12, padding: 16, marginBottom: 28, textAlign: "left" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#666", marginBottom: 8 }}>Invitation URL</p>
            <p style={{ color: "#c9a84c", fontFamily: "monospace", fontSize: 13, wordBreak: "break-all" }}>{fullUrl}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            <Link href={result.url} target="_blank" style={{ display: "block", padding: "14px", borderRadius: 12, background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", color: "#060410", fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textAlign: "center", textDecoration: "none" }}>View Invitation →</Link>
            <button onClick={() => navigator.clipboard.writeText(fullUrl).then(() => alert("Copied!"))} style={{ padding: 14, borderRadius: 12, background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontSize: 13 }}>📋 Copy Link</button>
          </div>
          <div style={{ background: "rgba(100,120,255,0.04)", border: "1px solid rgba(100,120,255,0.2)", borderRadius: 16, padding: 20, marginBottom: 20, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>📦</span>
              <div>
                <p style={{ color: "#a0b4ff", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Download Standalone Package</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, lineHeight: 1.6 }}>Unzip → <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 6px", borderRadius: 4, fontSize: 11 }}>npm install</code> → <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 6px", borderRadius: 4, fontSize: 11 }}>npm run dev</code> → opens at localhost:3000</p>
              </div>
            </div>
            <a href={`/api/export?id=${result.id}`} download={`invitation-${safeName}.zip`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 20px", borderRadius: 10, background: "linear-gradient(135deg,#4c6ef5,#748ffc)", color: "#fff", textDecoration: "none", fontFamily: "'Montserrat',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>⬇ &nbsp; Download Package (.zip)</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/admin/invitations" style={{ display: "block", padding: 14, borderRadius: 12, background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", color: "#c9a84c", textDecoration: "none", fontFamily: "'Montserrat',sans-serif", fontSize: 13, textAlign: "center" }}>📋 View All Invitations</Link>
            <button onClick={() => { setResult(null); setForm(EMPTY_FORM); setHeroImgs(emptyBucket()); setStoryImgs(emptyBucket()); setBrideFamilyImgs(emptyBucket()); setGroomFamilyImgs(emptyBucket()); setLegacyUrls([]); }} style={{ padding: 14, borderRadius: 12, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontSize: 13 }}>Create Another</button>
          </div>
        </div>
      </div>
    );
  }

  const inputStyle16 = { fontSize: 14, width: "100%", padding: "10px 14px", borderRadius: 10, background: "#faf9f7", border: "1px solid #ddd8d0", color: "#222", outline: "none", boxSizing: "border-box" as const };

  return (
    <div style={{ minHeight: "100vh", background: "#07070d", fontFamily: "'Montserrat',sans-serif" }}>
      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.25)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{ fontSize: 20 }}>💍</span>
          <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: 22, color: "#c9a84c" }}>Digi Invites</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/invitations" style={{ padding: "7px 14px", borderRadius: 8, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>📋 All Invitations</Link>
          <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#999" }}>Admin Panel</span>
          <button onClick={handleLogout} style={{ padding: "7px 16px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", cursor: "pointer", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>Logout</button>
          <button onClick={() => setPreviewOpen(p => !p)} style={{ display: "none", padding: "7px 14px", borderRadius: 8, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", color: "#c9a84c", cursor: "pointer", fontSize: 11 }} className="preview-toggle">
            {previewOpen ? "Hide Preview" : "Preview"}
          </button>
        </div>
      </div>

      {/* Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 0, maxWidth: 1400, margin: "0 auto", minHeight: "calc(100vh - 60px)" }}>

        {/* LEFT: Form */}
        <div style={{ padding: "32px 40px 60px", overflowY: "auto", borderRight: "1px solid #111" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 48, color: "#c9a84c", margin: "0 0 6px" }}>Create Invitation</h1>
            <p style={{ color: "#555", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>Fill details · see live preview on the right</p>
          </div>

          {/* ── Quick-access toolbar at top of form ── */}
          <div style={{ marginBottom: 24, padding: "16px 20px", background: "#111118", border: "1px solid #1e1e2e", borderRadius: 14 }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#444", marginBottom: 10 }}>Quick Setup — Click to configure</p>
            <QuickToolbar
              selectedTemplateId={form.templateId}
              onSelectTemplate={(id) => { setForm(prev => ({ ...prev, templateId: id })); setErrors(prev => ({ ...prev, templateId: "" })); }}
              selectedColor={form.accentColor || "#c9a84c"}
              onSelectColor={(color) => setForm(prev => ({ ...prev, accentColor: color }))}
              selectedFont={form.fontFamily || "Great Vibes"}
              onSelectFont={(font) => setForm(prev => ({ ...prev, fontFamily: font }))}
              selectedEffect={form.openingEffect || "hearts"}
              onSelectEffect={(effect) => setForm(prev => ({ ...prev, openingEffect: effect }))}
              selectedFormat={form.openingFormat || "letter"}
              onSelectFormat={(fmt) => setForm(prev => ({ ...prev, openingFormat: fmt }))}
              selectedGalleryStyle={(form.galleryStyle as any) || "slideshow"}
              onSelectGalleryStyle={(s) => setForm(prev => ({ ...prev, galleryStyle: s }))}
              selectedGalleryFillet={(form.galleryFillet as any) || "soft"}
              onSelectGalleryFillet={(f) => setForm(prev => ({ ...prev, galleryFillet: f }))}
              onHoverTemplate={(id) => setHoveredTemplateId(id)}
              previewInvitation={previewInvitation}
              brideName={form.brideName}
              groomName={form.groomName}
            />
          </div>

          {/* ── Gallery Style Picker ── */}
          <div style={{ marginBottom: 24, padding: "16px 20px", background: "#111118", border: "1px solid #1e1e2e", borderRadius: 14 }}>
            <GalleryPanel
              selected={(form.galleryStyle as any) || "slideshow"}
              onSelect={(style) => setForm(prev => ({ ...prev, galleryStyle: style }))}
              selectedFillet={(form.galleryFillet as any) || "soft"}
              onSelectFillet={(fillet) => setForm(prev => ({ ...prev, galleryFillet: fillet }))}
              hero={{ style: (form.heroGalleryStyle as any)||"slideshow", fillet: (form.heroGalleryFillet as any)||"soft" }}
              onHero={(v) => setForm(prev => ({ ...prev, heroGalleryStyle: v.style, heroGalleryFillet: v.fillet }))}
              story={{ style: (form.storyGalleryStyle as any)||"slideshow", fillet: (form.storyGalleryFillet as any)||"soft" }}
              onStory={(v) => setForm(prev => ({ ...prev, storyGalleryStyle: v.style, storyGalleryFillet: v.fillet }))}
              brideFamily={{ style: (form.brideFamilyGalleryStyle as any)||"slideshow", fillet: (form.brideFamilyGalleryFillet as any)||"soft" }}
              onBrideFamily={(v) => setForm(prev => ({ ...prev, brideFamilyGalleryStyle: v.style, brideFamilyGalleryFillet: v.fillet }))}
              groomFamily={{ style: (form.groomFamilyGalleryStyle as any)||"slideshow", fillet: (form.groomFamilyGalleryFillet as any)||"soft" }}
              onGroomFamily={(v) => setForm(prev => ({ ...prev, groomFamilyGalleryStyle: v.style, groomFamilyGalleryFillet: v.fillet }))}
              accentColor={form.accentColor || "#c9a84c"}
              sampleImages={[...heroImgs.urls, ...storyImgs.urls].filter(Boolean)}
            />
          </div>

                    {/* ── Language Selector ── */}
          <div style={{ marginBottom: 24, padding: "16px 20px", background: "#111118", border: "1px solid #1e1e2e", borderRadius: 14 }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#444", marginBottom: 12 }}>🌐 Invitation Language</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {([
                { id: "english",   label: "English",   native: "English",    flag: "🇬🇧" },
                { id: "hindi",     label: "Hindi",     native: "हिंदी",       flag: "🇮🇳" },
                { id: "telugu",    label: "Telugu",    native: "తెలుగు",     flag: "🌟" },
                { id: "marathi",   label: "Marathi",   native: "मराठी",      flag: "🧡" },
                { id: "kannada",   label: "Kannada",   native: "ಕನ್ನಡ",       flag: "💛" },
                { id: "malayalam", label: "Malayalam", native: "മലയാളം",    flag: "🌴" },
                { id: "tamil",     label: "Tamil",     native: "தமிழ்",       flag: "🌺" },
                { id: "urdu",      label: "Urdu",      native: "اردو",       flag: "☪️" },
              ] as const).map(lng => {
                const isActive = (form.lang || "english") === lng.id;
                return (
                  <button key={lng.id} type="button" onClick={() => setForm(prev => ({ ...prev, lang: lng.id }))}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20, background: isActive ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.03)", border: isActive ? "1px solid rgba(201,168,76,0.6)" : "1px solid rgba(255,255,255,0.08)", color: isActive ? "#c9a84c" : "rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: isActive ? 700 : 400, transitionProperty: "all", transitionDuration: "0.15s", transitionTimingFunction: "ease" }}>
                    <span style={{ fontSize: 15 }}>{lng.flag}</span>
                    <span>{lng.label}</span>
                    <span style={{ opacity: 0.5, fontSize: 11 }}>{lng.native}</span>
                  </button>
                );
              })}
            </div>
            <p style={{ color: "#444", fontSize: 10, marginTop: 10 }}>All section labels in the invitation will appear in the selected language.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* 1. COUPLE */}
            <SectionCard title="💑 The Couple">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <InputField label="Bride's Name" name="brideName" value={form.brideName} onChange={handleChange} placeholder="e.g. Priya Sharma" error={errors.brideName} required />
                <InputField label="Groom's Name" name="groomName" value={form.groomName} onChange={handleChange} placeholder="e.g. Rahul Mehta" error={errors.groomName} required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: 6 }}>About the Bride</label>
                  <textarea name="brideAbout" value={form.brideAbout} onChange={handleChange} rows={3} placeholder="Short bio — e.g. Software Engineer, loves music and travel..." style={{ ...inputStyle16, resize: "vertical", lineHeight: 1.6 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: 6 }}>About the Groom</label>
                  <textarea name="groomAbout" value={form.groomAbout} onChange={handleChange} rows={3} placeholder="Short bio — e.g. Entrepreneur, loves cricket and cooking..." style={{ ...inputStyle16, resize: "vertical", lineHeight: 1.6 }} />
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <InputField label="Couple Hashtag" name="coupleHashtag" value={form.coupleHashtag} onChange={handleChange} placeholder="e.g. #PriyaWedRahul2025" hint="Displayed on the invitation for social sharing" />
              </div>
            </SectionCard>

            {/* 2. CEREMONY */}
            <SectionCard title="📅 Wedding Ceremony">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <InputField label="Wedding Date" name="date" value={form.date} onChange={handleChange} type="date" error={errors.date} required />
                <InputField label="Wedding Time" name="time" value={form.time} onChange={handleChange} type="time" error={errors.time} required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <InputField label="Venue Name" name="venue" value={form.venue} onChange={handleChange} placeholder="e.g. The Grand Palace" error={errors.venue} required />
                <InputField label="Venue Address" name="venueAddress" value={form.venueAddress} onChange={handleChange} placeholder="e.g. Bandra, Mumbai" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <InputField label="Google Maps Link" name="venueMapUrl" value={form.venueMapUrl} onChange={handleChange} placeholder="https://maps.google.com/..." hint='Adds a "Get Directions" button on the invitation' />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: 6 }}>Dress Code</label>
                <input name="dressCode" value={form.dressCode} onChange={handleChange} placeholder="e.g. Formal / Black Tie / Indian Traditional" style={{ ...inputStyle16 }} />
              </div>
            </SectionCard>

            {/* 3. RECEPTION */}
            <SectionCard title="🥂 Reception Details">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <InputField label="Reception Venue" name="receptionVenue" value={form.receptionVenue} onChange={handleChange} placeholder="e.g. Hotel Taj, Ballroom" />
                <InputField label="Reception Time" name="receptionTime" value={form.receptionTime} onChange={handleChange} type="time" />
              </div>
            </SectionCard>

            {/* 4. EVENTS / CEREMONIES */}
            <SectionCard title="🎊 Pre-Wedding Events" collapsible>
              <EventsSection events={form.events} onChange={v => setForm(prev => ({ ...prev, events: v }))} />
            </SectionCard>

            {/* 5. FAMILY */}
            <SectionCard title="👨‍👩‍👧 Family Details" collapsible>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <FamilySection label="Bride's Family" value={form.brideFamily} onChange={v => setForm(prev => ({ ...prev, brideFamily: v }))} />
                <FamilySection label="Groom's Family" value={form.groomFamily} onChange={v => setForm(prev => ({ ...prev, groomFamily: v }))} />
              </div>
            </SectionCard>

            {/* 6. STORY */}
            <SectionCard title="📖 Love Story">
              <textarea
                name="story" value={form.story} onChange={handleChange} rows={5}
                placeholder="Share how you met, your journey together, or a heartfelt message for your guests..."
                style={{ ...inputStyle16, resize: "vertical", lineHeight: 1.7 }}
              />
            </SectionCard>

            {/* 7. RSVP */}
            <SectionCard title="💌 RSVP & Contact">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <InputField label="RSVP Contact / Phone" name="rsvpContact" value={form.rsvpContact} onChange={handleChange} placeholder="e.g. +91 98765 43210" />
                <InputField label="RSVP Deadline" name="rsvpDeadline" value={form.rsvpDeadline} onChange={handleChange} type="date" />
              </div>
              <InputField
                label="WhatsApp Number for RSVP"
                name="rsvpWhatsapp"
                value={form.rsvpWhatsapp}
                onChange={handleChange}
                placeholder="e.g. 919876543210 (with country code, no +)"
                hint='Adds a "RSVP on WhatsApp" button on the invitation'
              />
            </SectionCard>

            {/* 8. PHOTOS — purposeful zones */}
            <SectionCard title="📷 Photos">
              <p style={{ color: "#666", fontSize: 12, marginBottom: 20, lineHeight: 1.7 }}>
                Upload photos for each section of the invitation. Multiple images become an auto-slideshow (5 sec interval).
              </p>

              {/* Zone helper component inline */}
              {([
                {
                  label: "🎆 Hero / Opening Images",
                  hint: "Shown right below the couple names & ceremony details. Sets the first impression.",
                  ref: heroRef,
                  bucket: heroImgs,
                  setter: setHeroImgs,
                  key: "hero",
                  placeholder: "e.g. couple portrait, engagement shoot",
                },
                {
                  label: "📖 Love Story Images",
                  hint: "Displayed inside the Love Story section alongside the written story.",
                  ref: storyRef,
                  bucket: storyImgs,
                  setter: setStoryImgs,
                  key: "story",
                  placeholder: "e.g. candid moments, travel photos",
                },
                {
                  label: "👩‍👧 Bride's Family Photos",
                  hint: "Shown in the Bride's Family block.",
                  ref: brideFamRef,
                  bucket: brideFamilyImgs,
                  setter: setBrideFamilyImgs,
                  key: "bridefam",
                  placeholder: "e.g. bride with parents, family portrait",
                },
                {
                  label: "👨‍👦 Groom's Family Photos",
                  hint: "Shown in the Groom's Family block.",
                  ref: groomFamRef,
                  bucket: groomFamilyImgs,
                  setter: setGroomFamilyImgs,
                  key: "groomfam",
                  placeholder: "e.g. groom with parents, family portrait",
                },
              ] as const).map(zone => (
                <div key={zone.key} style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <label style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>{zone.label}</label>
                    {zone.bucket.previews.length > 0 && (
                      <span style={{ fontSize: 10, color: "#555" }}>{zone.bucket.previews.filter(p => p.url).length}/{zone.bucket.previews.length} uploaded</span>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: "#555", marginBottom: 10, fontStyle: "italic" }}>{zone.hint}</p>

                  {/* Drop zone */}
                  <div
                    onClick={() => zone.ref.current?.click()}
                    style={{ border: `2px dashed ${uploadingBucket === zone.key ? "#c9a84c" : "#2a2a3a"}`, borderRadius: 10, padding: "18px 16px", textAlign: "center", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease", background: uploadingBucket === zone.key ? "rgba(201,168,76,0.04)" : "transparent" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#c9a84c")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = uploadingBucket === zone.key ? "#c9a84c" : "#2a2a3a")}
                  >
                    <input
                      ref={zone.ref}
                      type="file" multiple accept="image/*"
                      onChange={e => { uploadFiles(Array.from(e.target.files ?? []), zone.setter as React.Dispatch<React.SetStateAction<{ previews: { preview: string; url?: string }[]; urls: string[] }>>, zone.key); (e.target as HTMLInputElement).value = ""; }}
                      style={{ display: "none" }}
                    />
                    {uploadingBucket === zone.key
                      ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                          <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #c9a84c", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                          <p style={{ color: "#888", fontSize: 12 }}>Uploading…</p>
                        </div>
                      : <div>
                          <p style={{ fontSize: 20, marginBottom: 4 }}>+</p>
                          <p style={{ color: "#888", fontSize: 12, marginBottom: 2 }}>Click to upload · {zone.placeholder}</p>
                          <p style={{ color: "#444", fontSize: 10 }}>JPEG, PNG, WebP — multiple OK</p>
                        </div>
                    }
                  </div>

                  {/* Previews grid */}
                  {zone.bucket.previews.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 10 }}>
                      {zone.bucket.previews.map((f, i) => (
                        <div key={i} style={{ position: "relative", aspectRatio: "1/1", borderRadius: 6, overflow: "hidden", border: "1px solid #2a2a3a" }}>
                          <img src={f.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          {/* Uploading spinner overlay */}
                          {!f.url && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #c9a84c", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                          </div>}
                          {/* Remove button */}
                          {f.url && <button type="button" onClick={() => removeImg(zone.setter as React.Dispatch<React.SetStateAction<{ previews: { preview: string; url?: string }[]; urls: string[] }>>, i)} style={{ position: "absolute", top: 3, right: 3, width: 20, height: 20, borderRadius: "50%", background: "rgba(239,68,68,0.9)", border: "none", color: "#fff", cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>}
                          {/* Slide order badge */}
                          <div style={{ position: "absolute", bottom: 3, left: 3, background: "rgba(0,0,0,0.6)", borderRadius: 4, padding: "1px 5px", fontSize: 9, color: "rgba(255,255,255,0.7)" }}>{i + 1}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {errors.images && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{errors.images}</p>}
              <p style={{ color: "#444", fontSize: 10, marginTop: 8, fontStyle: "italic" }}>💡 Multiple images in any section will auto-advance every 5 seconds on the live invitation.</p>
            </SectionCard>

            {/* 9. EXTRAS */}
            <SectionCard title="✨ Extra Details" collapsible>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <InputField
                  label="Special Note / Message"
                  name="specialNote"
                  value={form.specialNote}
                  onChange={handleChange}
                  placeholder="e.g. Your presence is our greatest gift. No gifts please."
                  hint="Shown at the bottom of the invitation"
                />
                <InputField
                  label="Background Music URL (optional)"
                  name="backgroundMusicUrl"
                  value={form.backgroundMusicUrl || ""}
                  onChange={handleChange}
                  placeholder="e.g. https://www.youtube.com/watch?v=..."
                  hint="YouTube or SoundCloud link — plays softly in the background"
                />
              </div>
            </SectionCard>

            {/* ── Pre-submit summary ── */}
            <div style={{ padding: "14px 18px", background: "#111118", border: "1px solid #1e1e2e", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#444", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Review selections</p>
              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: form.templateId ? "#888" : "#f87171" }}>
                  {form.templateId ? `${TEMPLATES.find(t => t.id === form.templateId)?.emoji} ${TEMPLATES.find(t => t.id === form.templateId)?.name}` : "⚠️ No template selected"}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: form.accentColor || "#c9a84c" }} />
                  <span style={{ fontFamily: "monospace", fontSize: 10, color: form.accentColor || "#c9a84c" }}>{(form.accentColor || "#c9a84c").toUpperCase()}</span>
                </div>
                <span style={{ fontFamily: form.fontFamily ? `'${form.fontFamily}',cursive,serif` : "'Great Vibes',cursive", fontSize: 14, color: "#888" }}>{form.fontFamily || "Great Vibes"}</span>
              </div>
            </div>

            {errors.templateId && (
              <div style={{ padding: "10px 16px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
                <p style={{ color: "#f87171", fontSize: 12 }}>⚠️ Please select a template — use the Template button at the top of the form</p>
              </div>
            )}

            {submitError && (
              <div style={{ padding: 14, borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", textAlign: "center" }}>
                <p style={{ color: "#f87171", fontSize: 13 }}>{submitError}</p>
              </div>
            )}

            <button
              type="submit" disabled={isSubmitting || !!uploadingBucket}
              style={{ width: "100%", padding: 18, borderRadius: 16, background: isSubmitting || uploadingBucket ? "#222" : "linear-gradient(135deg,#c9a84c,#e8d5a3,#c9a84c)", color: isSubmitting || uploadingBucket ? "#555" : "#0a0a0f", border: "none", cursor: isSubmitting || uploadingBucket ? "not-allowed" : "pointer", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}
            >
              {isSubmitting
                ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #555", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                    Creating Invitation...
                  </span>
                : "✦  Create Wedding Invitation  ✦"
              }
            </button>
          </form>
        </div>

        {/* RIGHT: Sticky Live Preview */}
        <div style={{ position: "sticky", top: 60, height: "calc(100vh - 60px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px", background: "#080810", borderLeft: "1px solid #111", gap: 12, overflowY: "auto", scrollbarWidth: "none" }}>
          {hoveredTemplateId && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a84c", animation: "heart-pulse 1s ease-in-out infinite" }} />
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Previewing template</p>
            </div>
          )}
          <MobilePreview invitation={previewInvitation} />
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) { .preview-toggle { display: block !important; } }
      `}</style>

      {/* ══════════════════════════════════════════
          INVITATIONS LIST
      ══════════════════════════════════════════ */}
      <InvitationsList />
    </div>
  );
}

/* ─────────────── Invitations List Component ─────────────── */

interface InvitationRecord {
  id: string;
  brideName: string;
  groomName: string;
  slug: string;
  templateId: string;
  date: string;
  venue: string;
  createdAt: string;
  expired?: boolean;
  imageUrls: string[];
}

const TEMPLATE_NAMES: Record<string, string> = {
  template1: "Royal Elegance",
  template2: "Blush Romance",
  template3: "Modern Noir",
  template4: "Rustic Garden",
  template5: "Art Deco",
};

function InvitationsList() {
  const [invitations, setInvitations] = useState<InvitationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [expiring, setExpiring] = useState<string | null>(null);
  const [confirmExpire, setConfirmExpire] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "expired">("all");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/invitations");
      const data = await res.json();
      setInvitations((data.invitations || []).reverse()); // newest first
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleExpire = async (id: string) => {
    setExpiring(id);
    try {
      await fetch("/api/expire", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      setInvitations(prev => prev.map(inv => inv.id === id ? { ...inv, expired: true } : inv));
    } catch { /* silent */ }
    finally { setExpiring(null); setConfirmExpire(null); }
  };

  const handleCopy = (slug: string, id: string) => {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const filtered = invitations.filter(inv => {
    const matchesFilter = filter === "all" || (filter === "active" && !inv.expired) || (filter === "expired" && inv.expired);
    const q = search.toLowerCase();
    const matchesSearch = !q || inv.brideName.toLowerCase().includes(q) || inv.groomName.toLowerCase().includes(q) || inv.slug.includes(q);
    return matchesFilter && matchesSearch;
  });

  const formatDate = (iso: string) => {
    try { return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
    catch { return iso; }
  };

  const fmtWeddingDate = (d: string) => {
    if (!d) return "—";
    try { return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
    catch { return d; }
  };

  const activeCount = invitations.filter(i => !i.expired).length;
  const expiredCount = invitations.filter(i => i.expired).length;

  return (
    <div style={{ borderTop: "2px solid rgba(201,168,76,0.15)", background: "#07070d", padding: "48px 40px 80px" }}>
      {/* Section header */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 8 }}>All Invitations</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: "#fff", margin: 0, fontWeight: 400 }}>
              Created Cards
            </h2>
            <p style={{ color: "#555", fontSize: 13, marginTop: 6 }}>{activeCount} active · {expiredCount} expired · {invitations.length} total</p>
          </div>
          <button onClick={load} style={{ padding: "8px 20px", borderRadius: 8, background: "transparent", border: "1px solid #2a2a3a", color: "#888", cursor: "pointer", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif" }}>
            ↻ Refresh
          </button>
        </div>

        {/* Filters & search */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
          {(["all", "active", "expired"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 18px", borderRadius: 6, border: "1px solid", cursor: "pointer", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", transitionProperty: "all", transitionDuration: "0.15s", transitionTimingFunction: "ease", background: filter === f ? "rgba(201,168,76,0.1)" : "transparent", borderColor: filter === f ? "rgba(201,168,76,0.4)" : "#1e1e2e", color: filter === f ? "#c9a84c" : "#555" }}>
              {f} {f === "all" ? `(${invitations.length})` : f === "active" ? `(${activeCount})` : `(${expiredCount})`}
            </button>
          ))}
          <div style={{ marginLeft: "auto" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or slug…"
              style={{ padding: "8px 16px", borderRadius: 8, background: "#ffffff", border: "1px solid #e8e4df", color: "#ccc", fontSize: 13, outline: "none", width: 240, fontFamily: "'Montserrat',sans-serif" }}
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#555" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #333", borderTopColor: "#c9a84c", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
            <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>Loading invitations…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#444" }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>💌</p>
            <p style={{ fontSize: 14, color: "#555" }}>{invitations.length === 0 ? "No invitations created yet." : "No results match your search."}</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr auto", gap: 16, padding: "10px 20px", background: "#0e0e18", borderRadius: "8px 8px 0 0" }}>
              {["Couple", "Venue & Date", "Template", "Created", "Status", "Actions"].map(h => (
                <p key={h} style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: "#444", margin: 0 }}>{h}</p>
              ))}
            </div>

            {/* Rows */}
            {filtered.map((inv, idx) => (
              <div key={inv.id} style={{
                display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr auto",
                gap: 16, padding: "16px 20px", alignItems: "center",
                background: idx % 2 === 0 ? "#faf9f7" : "#f5f3ef",
                border: "1px solid #0e0e1a",
                borderRadius: idx === filtered.length - 1 ? "0 0 8px 8px" : 0,
                opacity: inv.expired ? 0.55 : 1,
              }}>
                {/* Couple */}
                <div>
                  <p style={{ color: "#fff", fontSize: 14, fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", marginBottom: 2 }}>
                    {inv.brideName} & {inv.groomName}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <a
                      href={`/${inv.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#c9a84c", fontSize: 11, textDecoration: "none", fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.05em" }}
                    >
                      /{inv.slug}
                    </a>
                    {inv.expired && (
                      <span style={{ fontSize: 9, color: "#ef4444", letterSpacing: "0.2em", textTransform: "uppercase" }}>· expired</span>
                    )}
                  </div>
                </div>

                {/* Venue & wedding date */}
                <div>
                  <p style={{ color: "#aaa", fontSize: 12, marginBottom: 2 }}>{inv.venue || "—"}</p>
                  <p style={{ color: "#555", fontSize: 11 }}>{fmtWeddingDate(inv.date)}</p>
                </div>

                {/* Template */}
                <div>
                  <p style={{ color: "#888", fontSize: 11 }}>{TEMPLATE_NAMES[inv.templateId] || inv.templateId}</p>
                </div>

                {/* Created at */}
                <div>
                  <p style={{ color: "#666", fontSize: 11 }}>{formatDate(inv.createdAt)}</p>
                </div>

                {/* Status badge */}
                <div>
                  <span style={{
                    display: "inline-block", padding: "3px 10px", borderRadius: 4, fontSize: 9,
                    letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif",
                    background: inv.expired ? "rgba(239,68,68,0.08)" : "rgba(74,222,128,0.08)",
                    border: `1px solid ${inv.expired ? "rgba(239,68,68,0.2)" : "rgba(74,222,128,0.2)"}`,
                    color: inv.expired ? "#f87171" : "#4ade80",
                  }}>
                    {inv.expired ? "Expired" : "Active"}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {/* View */}
                  <a
                    href={`/${inv.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    title="View invitation"
                    style={{ width: 30, height: 30, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.04)", border: "1px solid #1e1e2e", color: "#888", textDecoration: "none", fontSize: 13 }}
                  >
                    ↗
                  </a>

                  {/* Copy link */}
                  <button
                    onClick={() => handleCopy(inv.slug, inv.id)}
                    title="Copy link"
                    style={{ width: 30, height: 30, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: copiedId === inv.id ? "rgba(74,222,128,0.1)" : "#f0ede8", border: `1px solid ${copiedId === inv.id ? "rgba(74,222,128,0.3)" : "#e0dbd3"}`, color: copiedId === inv.id ? "#4ade80" : "#aaa", cursor: "pointer", fontSize: 12 }}
                  >
                    {copiedId === inv.id ? "✓" : "⧉"}
                  </button>

                  {/* Expire */}
                  {!inv.expired && (
                    confirmExpire === inv.id ? (
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          onClick={() => handleExpire(inv.id)}
                          disabled={expiring === inv.id}
                          style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", cursor: "pointer", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif" }}
                        >
                          {expiring === inv.id ? "…" : "Confirm"}
                        </button>
                        <button
                          onClick={() => setConfirmExpire(null)}
                          style={{ padding: "4px 8px", borderRadius: 6, background: "transparent", border: "1px solid #1e1e2e", color: "#555", cursor: "pointer", fontSize: 9 }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmExpire(inv.id)}
                        title="Expire invitation"
                        style={{ padding: "4px 12px", borderRadius: 6, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#c05050", cursor: "pointer", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", whiteSpace: "nowrap" }}
                      >
                        Expire
                      </button>
                    )
                  )}
                  {inv.expired && (
                    <span style={{ fontSize: 9, color: "#3a3a4a", letterSpacing: "0.15em", textTransform: "uppercase" }}>—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
