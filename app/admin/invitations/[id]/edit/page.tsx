"use client";

import QuickToolbar from "@/components/admin/QuickToolbar";
import React, { useState, useRef, ChangeEvent, FormEvent, useCallback, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Invitation, FamilyDetails, FamilyMember, WeddingEvent } from "@/lib/types";
import GalleryPanel from "@/components/admin/GalleryPanel";
import { TEMPLATE_REGISTRY as TEMPLATES } from "@/lib/templateRegistry";

const MobilePreview = dynamic(() => import("@/components/MobilePreview"), { ssr: false });

/* ────────────────── Shared helpers (same as dashboard) ────────────────── */

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
  brideFamily: { ...EMPTY_FAMILY } as FamilyDetails,
  groomFamily: { ...EMPTY_FAMILY } as FamilyDetails,
  events: [] as WeddingEvent[],
};

type FormState = typeof EMPTY_FORM;
type Errors = Partial<Record<keyof FormState | "images", string>>;
type ImgBucket = { previews: { preview: string; url?: string }[]; urls: string[] };
const emptyBucket = (): ImgBucket => ({ previews: [], urls: [] });

function urlsToBucket(urls: string[]): ImgBucket {
  return { urls, previews: urls.map(url => ({ preview: url, url })) };
}

function buildPreviewInvitation(id: string, slug: string, createdAt: string, form: FormState, imgs: {
  imageUrls: string[]; heroImageUrls: string[]; storyImageUrls: string[];
  brideFamilyImageUrls: string[]; groomFamilyImageUrls: string[];
}): Invitation {
  return { id, slug, createdAt, ...imgs, ...form };
}

/* ────────────────── Sub-components ────────────────── */

function InputField({ label, name, value, onChange, type = "text", placeholder = "", error, required = false, hint }: {
  label: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string; placeholder?: string; error?: string; required?: boolean; hint?: string;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>
        {label}{required && " *"}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "#0d0d14", border: `1px solid ${error ? "#ef4444" : "#2a2a3a"}`, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", colorScheme: "dark" }} />
      {hint && !error && <p style={{ color: "#555", fontSize: 10, marginTop: 4 }}>{hint}</p>}
      {error && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{error}</p>}
    </div>
  );
}

function SectionCard({ title, children, collapsible = false }: { title: string; children: React.ReactNode; collapsible?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 16, overflow: "hidden" }}>
      <div onClick={collapsible ? () => setOpen(p => !p) : undefined}
        style={{ padding: "20px 24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: collapsible ? "pointer" : "default" }}>
        <h2 style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", margin: 0 }}>{title}</h2>
        {collapsible && <span style={{ color: "#555", fontSize: 14 }}>{open ? "▲" : "▼"}</span>}
      </div>
      {open && <div style={{ padding: "0 24px 24px" }}>{children}</div>}
    </div>
  );
}

function FamilySection({ label, value, onChange }: { label: string; value: FamilyDetails; onChange: (v: FamilyDetails) => void }) {
  const inputStyle = { width: "100%", padding: "9px 12px", borderRadius: 8, background: "#0d0d14", border: "1px solid #2a2a3a", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#666", display: "block", marginBottom: 4 };
  const addMember = () => onChange({ ...value, members: [...(value.members || []), { name: "", relation: "" }] });
  const removeMember = (i: number) => onChange({ ...value, members: value.members.filter((_, idx) => idx !== i) });
  const updateMember = (i: number, field: keyof FamilyMember, val: string) =>
    onChange({ ...value, members: value.members.map((m, idx) => idx === i ? { ...m, [field]: val } : m) });
  return (
    <div style={{ background: "#0a0a12", border: "1px solid #1a1a28", borderRadius: 12, padding: 18 }}>
      <p style={{ fontSize: 11, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>{label}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div><label style={labelStyle}>Father&apos;s Name</label><input style={inputStyle} value={value.fatherName} onChange={e => onChange({ ...value, fatherName: e.target.value })} /></div>
        <div><label style={labelStyle}>Mother&apos;s Name</label><input style={inputStyle} value={value.motherName} onChange={e => onChange({ ...value, motherName: e.target.value })} /></div>
      </div>
      {(value.members || []).map((m, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginBottom: 8, alignItems: "end" }}>
          <div>{i === 0 && <label style={labelStyle}>Member Name</label>}<input style={inputStyle} value={m.name} placeholder="Name" onChange={e => updateMember(i, "name", e.target.value)} /></div>
          <div>{i === 0 && <label style={labelStyle}>Relation</label>}<input style={inputStyle} value={m.relation} placeholder="Relation" onChange={e => updateMember(i, "relation", e.target.value)} /></div>
          <button type="button" onClick={() => removeMember(i)} style={{ padding: "9px 12px", borderRadius: 8, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", cursor: "pointer", fontSize: 13, marginTop: i === 0 ? 18 : 0 }}>✕</button>
        </div>
      ))}
      <button type="button" onClick={addMember} style={{ marginTop: 8, padding: "8px 16px", borderRadius: 8, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", cursor: "pointer", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>+ Add Member</button>
    </div>
  );
}

function EventsSection({ events, onChange }: { events: WeddingEvent[]; onChange: (v: WeddingEvent[]) => void }) {
  const inputStyle = { width: "100%", padding: "8px 12px", borderRadius: 8, background: "#0d0d14", border: "1px solid #2a2a3a", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" as const, colorScheme: "dark" as const };
  const labelStyle = { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#666", display: "block", marginBottom: 4 };
  const addEvent = () => onChange([...events, { ...EMPTY_EVENT }]);
  const removeEvent = (i: number) => onChange(events.filter((_, idx) => idx !== i));
  const updateEvent = (i: number, field: keyof WeddingEvent, val: string) =>
    onChange(events.map((ev, idx) => idx === i ? { ...ev, [field]: val } : ev));
  return (
    <div>
      <p style={{ color: "#888", fontSize: 12, marginBottom: 16, lineHeight: 1.6 }}>Mehendi, Sangeet, Haldi, Baraat, etc.</p>
      {events.map((ev, i) => (
        <div key={i} style={{ background: "#0a0a12", border: "1px solid #1a1a28", borderRadius: 12, padding: 18, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ fontSize: 11, color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase" }}>Event {i + 1}</p>
            <button type="button" onClick={() => removeEvent(i)} style={{ padding: "5px 10px", borderRadius: 6, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", cursor: "pointer", fontSize: 11 }}>Remove</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div><label style={labelStyle}>Event Name *</label><input style={inputStyle} value={ev.name} placeholder="Mehendi Ceremony" onChange={e => updateEvent(i, "name", e.target.value)} /></div>
            <div><label style={labelStyle}>Venue *</label><input style={inputStyle} value={ev.venue} placeholder="Venue" onChange={e => updateEvent(i, "venue", e.target.value)} /></div>
            <div><label style={labelStyle}>Date</label><input style={inputStyle} type="date" value={ev.date} onChange={e => updateEvent(i, "date", e.target.value)} /></div>
            <div><label style={labelStyle}>Time</label><input style={inputStyle} type="time" value={ev.time} onChange={e => updateEvent(i, "time", e.target.value)} /></div>
          </div>
          <div style={{ marginBottom: 10 }}><label style={labelStyle}>Venue Address</label><input style={inputStyle} value={ev.venueAddress || ""} placeholder="Full address" onChange={e => updateEvent(i, "venueAddress", e.target.value)} /></div>
          <div><label style={labelStyle}>Description</label><input style={inputStyle} value={ev.description || ""} placeholder="Optional details" onChange={e => updateEvent(i, "description", e.target.value)} /></div>
        </div>
      ))}
      <button type="button" onClick={addEvent} style={{ marginTop: 4, padding: "10px 20px", borderRadius: 10, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", cursor: "pointer", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", width: "100%" }}>+ Add Event</button>
    </div>
  );
}

/* ────────────────── Main Edit Page ────────────────── */

export default function EditInvitationPage() {
  const router = useRouter();
  const params = useParams();
  const invId = params.id as string;

  const [pageLoading, setPageLoading] = useState(true);
  const [hoveredTemplateId, setHoveredTemplateId] = useState<string | null>(null);
  const [invSlug, setInvSlug] = useState("");
  const [invCreatedAt, setInvCreatedAt] = useState("");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [heroImgs,        setHeroImgs]        = useState<ImgBucket>(emptyBucket());
  const [storyImgs,       setStoryImgs]       = useState<ImgBucket>(emptyBucket());
  const [brideFamilyImgs, setBrideFamilyImgs] = useState<ImgBucket>(emptyBucket());
  const [groomFamilyImgs, setGroomFamilyImgs] = useState<ImgBucket>(emptyBucket());
  const [legacyUrls, setLegacyUrls] = useState<string[]>([]);
  const [uploadingBucket, setUploadingBucket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const heroRef      = useRef<HTMLInputElement>(null);
  const storyRef     = useRef<HTMLInputElement>(null);
  const brideFamRef  = useRef<HTMLInputElement>(null);
  const groomFamRef  = useRef<HTMLInputElement>(null);

  const inputStyle16 = { fontSize: 14, width: "100%", padding: "10px 14px", borderRadius: 10, background: "#0d0d14", border: "1px solid #2a2a3a", color: "#fff", outline: "none", boxSizing: "border-box" as const, colorScheme: "dark" as const };

  // Auth check
  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "authenticated") router.replace("/admin/login");
  }, [router]);

  // Load existing invitation
  useEffect(() => {
    if (!invId) return;
    (async () => {
      try {
        const res = await fetch("/api/invitations");
        const data = await res.json();
        const inv: Invitation | undefined = data.invitations?.find((i: Invitation) => i.id === invId);
        if (!inv) { router.replace("/admin/invitations"); return; }

        setInvSlug(inv.slug);
        setInvCreatedAt(inv.createdAt);
        setLegacyUrls(inv.imageUrls ?? []);
        setHeroImgs(urlsToBucket(inv.heroImageUrls ?? []));
        setStoryImgs(urlsToBucket(inv.storyImageUrls ?? []));
        setBrideFamilyImgs(urlsToBucket(inv.brideFamilyImageUrls ?? []));
        setGroomFamilyImgs(urlsToBucket(inv.groomFamilyImageUrls ?? []));
        setForm({
          brideName: inv.brideName ?? "",
          groomName: inv.groomName ?? "",
          brideAbout: inv.brideAbout ?? "",
          groomAbout: inv.groomAbout ?? "",
          date: inv.date ?? "",
          time: inv.time ?? "",
          venue: inv.venue ?? "",
          venueAddress: inv.venueAddress ?? "",
          receptionVenue: inv.receptionVenue ?? "",
          receptionTime: inv.receptionTime ?? "",
          dressCode: inv.dressCode ?? "",
          rsvpContact: inv.rsvpContact ?? "",
          rsvpDeadline: inv.rsvpDeadline ?? "",
          rsvpWhatsapp: inv.rsvpWhatsapp ?? "",
          story: inv.story ?? "",
          coupleHashtag: inv.coupleHashtag ?? "",
          venueMapUrl: inv.venueMapUrl ?? "",
          backgroundMusicUrl: inv.backgroundMusicUrl ?? "",
          specialNote: inv.specialNote ?? "",
          templateId: inv.templateId ?? "",
          fontFamily: inv.fontFamily ?? "Great Vibes",
          openingEffect: inv.openingEffect ?? "hearts",
          openingFormat: inv.openingFormat ?? "letter",
          lang: inv.lang ?? "english",
          galleryStyle: inv.galleryStyle ?? "slideshow",
          galleryFillet: inv.galleryFillet ?? "soft",
          heroGalleryStyle: inv.heroGalleryStyle ?? "slideshow",
          heroGalleryFillet: inv.heroGalleryFillet ?? "soft",
          storyGalleryStyle: inv.storyGalleryStyle ?? "slideshow",
          storyGalleryFillet: inv.storyGalleryFillet ?? "soft",
          brideFamilyGalleryStyle: inv.brideFamilyGalleryStyle ?? "slideshow",
          brideFamilyGalleryFillet: inv.brideFamilyGalleryFillet ?? "soft",
          groomFamilyGalleryStyle: inv.groomFamilyGalleryStyle ?? "slideshow",
          groomFamilyGalleryFillet: inv.groomFamilyGalleryFillet ?? "soft",
          accentColor: inv.accentColor ?? "",
          brideFamily: inv.brideFamily ?? { ...EMPTY_FAMILY },
          groomFamily: inv.groomFamily ?? { ...EMPTY_FAMILY },
          events: inv.events ?? [],
        });
      } catch { router.replace("/admin/invitations"); }
      finally { setPageLoading(false); }
    })();
  }, [invId, router]);

  const previewInvitation = buildPreviewInvitation(
    invId, invSlug, invCreatedAt,
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

  const uploadFiles = async (selected: File[], setter: React.Dispatch<React.SetStateAction<ImgBucket>>, bucketKey: string) => {
    if (!selected.length) return;
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
    } finally { setUploadingBucket(null); }
  };

  const removeImg = (setter: React.Dispatch<React.SetStateAction<ImgBucket>>, idx: number) => {
    setter(prev => ({ previews: prev.previews.filter((_, i) => i !== idx), urls: prev.urls.filter((_, i) => i !== idx) }));
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
    setSubmitError(""); setSaveSuccess(false);
    if (!validate()) return;
    if (uploadingBucket) { setSubmitError("Please wait for uploads to finish."); return; }
    setIsSubmitting(true);
    try {
      const payload = {
        id: invId,
        ...form,
        imageUrls: legacyUrls,
        heroImageUrls: heroImgs.urls,
        storyImageUrls: storyImgs.urls,
        brideFamilyImageUrls: brideFamilyImgs.urls,
        groomFamilyImageUrls: groomFamilyImgs.urls,
      };
      const res = await fetch("/api/update", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setSaveSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setIsSubmitting(false); }
  };

  if (pageLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #c9a84c", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "#555", fontFamily: "'Montserrat',sans-serif", fontSize: 13 }}>Loading invitation…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'Montserrat',sans-serif" }}>

      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,15,0.96)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{ fontSize: 20 }}>💍</span>
          <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: 22, color: "#c9a84c" }}>Digi Invites</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/admin/invitations" style={{ padding: "7px 14px", borderRadius: 8, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>← All Invitations</Link>
          {invSlug && (
            <a href={`/${invSlug}`} target="_blank" rel="noreferrer" style={{ padding: "7px 14px", borderRadius: 8, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>👁 View Live</a>
          )}
        </div>
      </div>

      {/* Save success banner */}
      {saveSuccess && (
        <div style={{ background: "rgba(74,222,128,0.1)", borderBottom: "1px solid rgba(74,222,128,0.25)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>✅</span>
            <p style={{ color: "#4ade80", fontSize: 13 }}>Invitation updated successfully!</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {invSlug && <a href={`/${invSlug}`} target="_blank" rel="noreferrer" style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", textDecoration: "none", fontSize: 11, letterSpacing: "0.1em" }}>View Updated Invitation →</a>}
            {invId && <a href={`/api/export?id=${invId}`} download={`invitation-${invSlug}.zip`} style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(100,120,255,0.12)", border: "1px solid rgba(100,120,255,0.3)", color: "#a0b4ff", textDecoration: "none", fontSize: 11, letterSpacing: "0.1em" }}>📦 Export Package</a>}
            <button onClick={() => setSaveSuccess(false)} style={{ padding: "6px 14px", borderRadius: 8, background: "transparent", border: "1px solid #333", color: "#555", cursor: "pointer", fontSize: 11 }}>Dismiss</button>
          </div>
        </div>
      )}

      {/* Page title */}
      <div style={{ padding: "28px 40px 0", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
          <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 40, color: "#c9a84c", margin: 0 }}>Edit Invitation</h1>
          <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,rgba(201,168,76,0.3),transparent)" }} />
        </div>
        <p style={{ color: "#555", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>
          Editing: <span style={{ color: "#888" }}>{form.brideName || "—"} &amp; {form.groomName || "—"}</span>
          {invSlug && <span style={{ marginLeft: 16, fontFamily: "monospace", color: "#444" }}>/{invSlug}</span>}
        </p>
      </div>

      {/* Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 0, maxWidth: 1400, margin: "0 auto", minHeight: "calc(100vh - 120px)" }}>

        {/* LEFT: Form */}
        <div style={{ padding: "24px 40px 60px", overflowY: "auto", borderRight: "1px solid #111" }}>

          {/* Quick toolbar — template, color, font, effect */}
          <div style={{ marginBottom: 20, padding: "14px 18px", background: "#111118", border: "1px solid #1e1e2e", borderRadius: 14 }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#444", marginBottom: 10 }}>Quick Setup</p>
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
            <p style={{ color: "#444", fontSize: 10, marginTop: 10 }}>All section labels will appear in the selected language in the published invitation.</p>
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
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>About the Bride</label>
                  <textarea name="brideAbout" value={form.brideAbout} onChange={handleChange} rows={3} style={{ ...inputStyle16, resize: "vertical", lineHeight: 1.6 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>About the Groom</label>
                  <textarea name="groomAbout" value={form.groomAbout} onChange={handleChange} rows={3} style={{ ...inputStyle16, resize: "vertical", lineHeight: 1.6 }} />
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <InputField label="Couple Hashtag" name="coupleHashtag" value={form.coupleHashtag} onChange={handleChange} placeholder="#PriyaWedRahul2025" />
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
                <InputField label="Google Maps Link" name="venueMapUrl" value={form.venueMapUrl} onChange={handleChange} placeholder="https://maps.google.com/..." />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>Dress Code</label>
                <input name="dressCode" value={form.dressCode} onChange={handleChange} style={{ ...inputStyle16 }} placeholder="e.g. Formal / Indian Traditional" />
              </div>
            </SectionCard>

            {/* 3. RECEPTION */}
            <SectionCard title="🥂 Reception">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <InputField label="Reception Venue" name="receptionVenue" value={form.receptionVenue} onChange={handleChange} />
                <InputField label="Reception Time" name="receptionTime" value={form.receptionTime} onChange={handleChange} type="time" />
              </div>
            </SectionCard>

            {/* 4. EVENTS */}
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
              <textarea name="story" value={form.story} onChange={handleChange} rows={5}
                style={{ ...inputStyle16, resize: "vertical", lineHeight: 1.7 }}
                placeholder="Share how you met, your journey together…" />
            </SectionCard>

            {/* 7. RSVP */}
            <SectionCard title="💌 RSVP & Contact">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <InputField label="RSVP Contact" name="rsvpContact" value={form.rsvpContact} onChange={handleChange} placeholder="+91 98765 43210" />
                <InputField label="RSVP Deadline" name="rsvpDeadline" value={form.rsvpDeadline} onChange={handleChange} type="date" />
              </div>
              <InputField label="WhatsApp Number for RSVP" name="rsvpWhatsapp" value={form.rsvpWhatsapp} onChange={handleChange} placeholder="919876543210" hint="With country code, no +" />
            </SectionCard>

            {/* 8. PHOTOS */}
            <SectionCard title="📷 Photos">
              <p style={{ color: "#666", fontSize: 12, marginBottom: 20, lineHeight: 1.7 }}>
                You can add new images or remove existing ones. Existing images are shown with their current previews.
              </p>
              {([
                { label: "🎆 Hero / Opening Images", hint: "Below ceremony header.", ref: heroRef, bucket: heroImgs, setter: setHeroImgs, key: "hero" },
                { label: "📖 Love Story Images", hint: "Inside love story section.", ref: storyRef, bucket: storyImgs, setter: setStoryImgs, key: "story" },
                { label: "👩‍👧 Bride's Family Photos", hint: "Inside bride's family block.", ref: brideFamRef, bucket: brideFamilyImgs, setter: setBrideFamilyImgs, key: "bridefam" },
                { label: "👨‍👦 Groom's Family Photos", hint: "Inside groom's family block.", ref: groomFamRef, bucket: groomFamilyImgs, setter: setGroomFamilyImgs, key: "groomfam" },
              ] as const).map(zone => (
                <div key={zone.key} style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <label style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600 }}>{zone.label}</label>
                    {zone.bucket.previews.length > 0 && <span style={{ fontSize: 10, color: "#555" }}>{zone.bucket.previews.filter(p => p.url).length} image{zone.bucket.previews.length !== 1 ? "s" : ""}</span>}
                  </div>
                  <p style={{ fontSize: 11, color: "#555", marginBottom: 10, fontStyle: "italic" }}>{zone.hint}</p>
                  <div
                    onClick={() => zone.ref.current?.click()}
                    style={{ border: `2px dashed ${uploadingBucket === zone.key ? "#c9a84c" : "#2a2a3a"}`, borderRadius: 10, padding: "16px", textAlign: "center", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#c9a84c")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = uploadingBucket === zone.key ? "#c9a84c" : "#2a2a3a")}
                  >
                    <input ref={zone.ref} type="file" multiple accept="image/*"
                      onChange={e => { uploadFiles(Array.from(e.target.files ?? []), zone.setter as React.Dispatch<React.SetStateAction<ImgBucket>>, zone.key); (e.target as HTMLInputElement).value = ""; }}
                      style={{ display: "none" }} />
                    {uploadingBucket === zone.key
                      ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #c9a84c", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} /><p style={{ color: "#888", fontSize: 12 }}>Uploading…</p></div>
                      : <p style={{ color: "#666", fontSize: 12 }}>+ Click to add more photos</p>
                    }
                  </div>
                  {zone.bucket.previews.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 10 }}>
                      {zone.bucket.previews.map((f, i) => (
                        <div key={i} style={{ position: "relative", aspectRatio: "1/1", borderRadius: 6, overflow: "hidden", border: "1px solid #2a2a3a" }}>
                          <img src={f.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          {!f.url && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #c9a84c", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} /></div>}
                          {f.url && <button type="button" onClick={() => removeImg(zone.setter as React.Dispatch<React.SetStateAction<ImgBucket>>, i)} style={{ position: "absolute", top: 3, right: 3, width: 20, height: 20, borderRadius: "50%", background: "rgba(239,68,68,0.9)", border: "none", color: "#fff", cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>}
                          <div style={{ position: "absolute", bottom: 3, left: 3, background: "rgba(0,0,0,0.6)", borderRadius: 4, padding: "1px 5px", fontSize: 9, color: "rgba(255,255,255,0.7)" }}>{i + 1}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {errors.images && <p style={{ color: "#ef4444", fontSize: 11 }}>{errors.images}</p>}
            </SectionCard>

            {/* 9. EXTRAS */}
            <SectionCard title="✨ Extra Details" collapsible>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <InputField label="Special Note" name="specialNote" value={form.specialNote} onChange={handleChange} placeholder="Your presence is our greatest gift." />
                <InputField label="Background Music URL" name="backgroundMusicUrl" value={form.backgroundMusicUrl || ""} onChange={handleChange} placeholder="https://www.youtube.com/watch?v=..." hint="YouTube or SoundCloud link" />
              </div>
            </SectionCard>

            {/* 10. GALLERY STYLE */}
            <SectionCard title="🖼 Gallery Style" collapsible>
              <GalleryPanel
                selected={(form.galleryStyle as any) || "slideshow"}
                onSelect={(style) => setForm(prev => ({ ...prev, galleryStyle: style }))}
                selectedFillet={(form.galleryFillet as any) || "soft"}
                onSelectFillet={(fillet) => setForm(prev => ({ ...prev, galleryFillet: fillet }))}
                accentColor={form.accentColor || "#c9a84c"}
              />
            </SectionCard>

            {/* Template error */}
            {errors.templateId && (
              <div style={{ padding: "10px 16px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
                <p style={{ color: "#f87171", fontSize: 12 }}>⚠️ Please select a template using the Template button at the top</p>
              </div>
            )}

            {submitError && (
              <div style={{ padding: 14, borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", textAlign: "center" }}>
                <p style={{ color: "#f87171", fontSize: 13 }}>{submitError}</p>
              </div>
            )}

            <button type="submit" disabled={isSubmitting || !!uploadingBucket}
              style={{ width: "100%", padding: 18, borderRadius: 16, background: isSubmitting || uploadingBucket ? "#222" : "linear-gradient(135deg,#c9a84c,#e8d5a3,#c9a84c)", color: isSubmitting || uploadingBucket ? "#555" : "#0a0a0f", border: "none", cursor: isSubmitting || uploadingBucket ? "not-allowed" : "pointer", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}>
              {isSubmitting
                ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #555", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", display: "inline-block" }} />Saving Changes…
                  </span>
                : "✦  Save Changes  ✦"
              }
            </button>
          </form>
        </div>

        {/* RIGHT: Live preview */}
        <div style={{ position: "sticky", top: 60, height: "calc(100vh - 60px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px", background: "#080810", borderLeft: "1px solid #111", overflowY: "auto" }}>
          <MobilePreview invitation={previewInvitation} />
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
