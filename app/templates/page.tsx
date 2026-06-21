"use client";
import Link from "next/link";
import { useState } from "react";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import MobilePreview from "@/components/MobilePreview";
import { TRANSLATIONS, SupportedLang, DEMO_NAMES, DEMO_VENUE } from "@/lib/translations";
import type { Invitation } from "@/lib/types";

const LANGUAGES: { id: SupportedLang; label: string; native: string; flag: string }[] = [
  { id: "english",   label: "English",   native: "English",    flag: "🇬🇧" },
  { id: "hindi",     label: "Hindi",     native: "हिंदी",       flag: "🇮🇳" },
  { id: "telugu",    label: "Telugu",    native: "తెలుగు",     flag: "🌟" },
  { id: "marathi",   label: "Marathi",   native: "मराठी",      flag: "🧡" },
  { id: "kannada",   label: "Kannada",   native: "ಕನ್ನಡ",       flag: "💛" },
  { id: "malayalam", label: "Malayalam", native: "മലയാളം",    flag: "🌴" },
  { id: "tamil",     label: "Tamil",     native: "தமிழ்",       flag: "🌺" },
  { id: "urdu",      label: "Urdu",      native: "اردو",       flag: "☪️" },
];

const DEMO_INVITATION: Invitation = {
  id: "demo",
  brideName: "Priya", groomName: "Rahul",
  brideAbout: "A passionate architect who loves chai, sunsets and spontaneous road trips.",
  groomAbout: "A software engineer by day, amateur chef by night.",
  brideFamily: { fatherName: "Mr. Sharma", motherName: "Mrs. Sharma", members: [{ name: "Anjali Sharma", relation: "Sister" }] },
  groomFamily: { fatherName: "Mr. Mehta",  motherName: "Mrs. Mehta",  members: [{ name: "Rohan Mehta",   relation: "Brother" }] },
  date: "2026-02-14", time: "19:00",
  venue: "The Taj Palace", venueAddress: "Apollo Bunder, Colaba, Mumbai 400001",
  receptionVenue: "Crystal Ballroom, Taj Palace", receptionTime: "20:30",
  dressCode: "Black Tie / Indian Ethnic",
  rsvpContact: "+91 98765 43210", rsvpDeadline: "2026-02-01", rsvpWhatsapp: "+919876543210",
  story: "We met at a friend's wedding in Goa and never stopped talking since. Three years, countless chai dates, and one breathtaking proposal later — here we are.",
  templateId: "template1",
  imageUrls: [], heroImageUrls: [], storyImageUrls: [], brideFamilyImageUrls: [], groomFamilyImageUrls: [],
  slug: "priya-rahul", createdAt: new Date().toISOString(),
  events: [
    { name: "Mehendi Ceremony", date: "2026-02-12", time: "16:00", venue: "Sharma Residence", venueAddress: "Bandra West, Mumbai" },
    { name: "Sangeet Night",    date: "2026-02-13", time: "19:30", venue: "The Grand Hyatt",  venueAddress: "Santa Cruz East, Mumbai" },
  ],
  coupleHashtag: "#PriyaWedRahul", venueMapUrl: "https://maps.google.com",
  backgroundMusicUrl: "", specialNote: "Your presence is the greatest gift.",
  fontFamily: "Great Vibes", accentColor: "#c9a84c",
  openingEffect: "hearts", openingFormat: "letter",
};

export default function TemplatesPage() {
  const [activeId,   setActiveId]   = useState("template1");
  const [activeLang, setActiveLang] = useState<SupportedLang>("english");

  const names = DEMO_NAMES[activeLang];
  const vn    = DEMO_VENUE[activeLang];
  const previewInvitation: Invitation = {
    ...DEMO_INVITATION,
    brideName:    names.bride,
    groomName:    names.groom,
    story:        names.story,
    coupleHashtag: names.hashtag,
    venue:        vn.venue,
    venueAddress: vn.venueAddress,
    receptionVenue: vn.venue,
    dressCode:    vn.dressCode,
    specialNote:  vn.specialNote,
    brideFamily:  { fatherName: vn.brideFather, motherName: vn.brideMother, members: [] },
    groomFamily:  { fatherName: vn.groomFather, motherName: vn.groomMother, members: [] },
    events: [
      { name: vn.event1Name, date: "2026-02-12", time: "16:00", venue: vn.venue, venueAddress: vn.venueAddress },
      { name: vn.event2Name, date: "2026-02-13", time: "19:30", venue: vn.venue, venueAddress: vn.venueAddress },
    ],
    templateId: activeId,
    lang: activeLang,
  };
  const tmpl = TEMPLATE_REGISTRY.find(t => t.id === activeId)!;
  const num  = TEMPLATE_REGISTRY.indexOf(tmpl) + 1;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#060410 0%,#0d0820 60%,#060410 100%)", fontFamily: "'Montserrat',sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 64, background: "rgba(6,4,16,0.95)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="rgba(201,168,76,0.12)"/><path d="M14 6L16.5 11.5H22L17.5 15L19.5 21L14 17.5L8.5 21L10.5 15L6 11.5H11.5L14 6Z" fill="#c9a84c"/></svg>
          <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: 24, color: "#c9a84c" }}>Digi Invites</span>
        </Link>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {[["/#how","How It Works"],["/#templates","Templates"],["/#pricing","Pricing"],["/about","About"],["/contact","Contact"]].map(([href, label]) => (
            <a key={href} href={href} style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</a>
          ))}
        </div>
      </nav>

      {/* PAGE HEADER */}
      <div style={{ paddingTop: 88 }}>
        <div style={{ padding: "20px 32px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 4 }}>{TEMPLATE_REGISTRY.length} Premium Designs · 8 Languages</p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(22px,3vw,34px)", color: "#fff", margin: 0, fontWeight: 400 }}>Browse All <em>Templates</em></h1>
          </div>
          <Link href="/contact" style={{ padding: "10px 24px", borderRadius: 6, background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", color: "#060410", textDecoration: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Enquire Now →
          </Link>
        </div>

        {/* ── LANGUAGE SELECTOR BAR ── */}
        <div style={{ padding: "14px 32px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, overflowX: "auto", paddingBottom: 14 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#555", flexShrink: 0, marginRight: 4 }}>Language:</span>
            {LANGUAGES.map(lng => {
              const isActive = activeLang === lng.id;
              return (
                <button
                  key={lng.id}
                  onClick={() => setActiveLang(lng.id)}
                  style={{
                    flexShrink: 0,
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "7px 14px", borderRadius: 6,
                    background: isActive ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.03)",
                    border: isActive ? "1px solid rgba(201,168,76,0.5)" : "1px solid rgba(255,255,255,0.07)",
                    color: isActive ? "#c9a84c" : "rgba(255,255,255,0.5)",
                    cursor: "pointer", transitionProperty: "all", transitionDuration: "0.15s", transitionTimingFunction: "ease",
                    fontFamily: "'Montserrat',sans-serif",
                  }}
                >
                  <span style={{ fontSize: 15 }}>{lng.flag}</span>
                  <span style={{ fontSize: 11, fontWeight: isActive ? 600 : 400 }}>{lng.label}</span>
                  <span style={{ fontSize: 11, opacity: 0.55 }}>{lng.native}</span>
                </button>
              );
            })}
          </div>

          {/* Live preview of selected language labels */}
          {activeLang !== "english" && (
            <div style={{ display: "flex", gap: 16, paddingBottom: 12, flexWrap: "wrap" }}>
              {["togetherWithFamilies", "weddingCeremony", "ourStory", "kindlyRsvp"].map(key => (
                <span key={key} style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>
                  "{(TRANSLATIONS[activeLang] as Record<string, string>)[key]}"
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MAIN SPLIT LAYOUT */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", flex: 1, overflow: "hidden", height: "calc(100vh - 168px)" }}>

        {/* ── LEFT: Template List ── */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.06)", overflowY: "auto", background: "rgba(0,0,0,0.25)" }}>
          {TEMPLATE_REGISTRY.map((t) => {
            const isActive = activeId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                style={{
                  width: "100%", textAlign: "left", padding: "14px 18px",
                  background: isActive ? "rgba(201,168,76,0.08)" : "transparent",
                  border: "none",
                  borderLeft: isActive ? "3px solid #c9a84c" : "3px solid transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  cursor: "pointer", transitionProperty: "all", transitionDuration: "0.15s", transitionTimingFunction: "ease",
                  display: "flex", alignItems: "center", gap: 12,
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                  {t.colors.map((c, i) => (
                    <div key={i} style={{ width: 10, height: 32, borderRadius: 3, background: c, opacity: isActive ? 1 : 0.7 }} />
                  ))}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 14 }}>{t.emoji}</span>
                    <p style={{ color: isActive ? "#c9a84c" : "#ccc", fontSize: 12, fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", margin: 0 }}>{t.name}</p>
                  </div>
                </div>
                {isActive && <span style={{ color: "#c9a84c", fontSize: 14, flexShrink: 0 }}>›</span>}
              </button>
            );
          })}
        </div>

        {/* ── RIGHT: Mobile Preview + Info ── */}
        <div style={{ overflowY: "auto", display: "flex", gap: 48, padding: "36px 48px", alignItems: "flex-start", justifyContent: "center" }}>

          {/* Phone preview */}
          <div style={{ flexShrink: 0 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "#555", marginBottom: 12 }}>
              Live Preview · {TRANSLATIONS[activeLang].label}
            </p>
            <MobilePreview invitation={previewInvitation} />
          </div>

          {/* Template info */}
          <div style={{ maxWidth: 380, paddingTop: 8 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 3, marginBottom: 20 }}>
              <span style={{ fontSize: 18 }}>{tmpl.emoji}</span>
              <span style={{ color: "#c9a84c", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase" }}>Template {num} of {TEMPLATE_REGISTRY.length}</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: "#fff", fontWeight: 400, marginBottom: 28 }}>{tmpl.name}</h2>

            {/* Language note */}
            <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 10, padding: "14px 16px", marginBottom: 28 }}>
              <p style={{ fontSize: 11, color: "#c9a84c", marginBottom: 6, fontWeight: 600 }}>
                {TRANSLATIONS[activeLang].flag} Showing in {TRANSLATIONS[activeLang].label} ({TRANSLATIONS[activeLang].nativeLabel})
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                All section labels, headings and UI text in the card will appear in {TRANSLATIONS[activeLang].label}. Names, dates and venues stay as entered.
              </p>
            </div>

            {/* Included */}
            <p style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "#555", marginBottom: 14 }}>Every Card Includes</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
              {[
                "Couple names, date, time & venue",
                "Family details — both sides",
                "Photo gallery up to 10 photos",
                "Love story & personal message",
                "Multiple events (Mehendi, Sangeet…)",
                "RSVP contact & WhatsApp link",
                "Opening animation effect",
                "Available in 8 Indian languages",
              ].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "#c9a84c", fontSize: 9 }}>✓</span>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{f}</span>
                </div>
              ))}
            </div>

            <Link href="/contact" style={{ padding: "13px 32px", borderRadius: 6, background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", color: "#060410", textDecoration: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", display: "inline-block" }}>
              Enquire About This Design
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "20px 40px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>© 2025 Digi Invites. All rights reserved.</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4 }}>Developed in collaboration with <span style={{ color: "#c9a84c" }}>AK Tech Dev Solutions</span> &amp; <span style={{ color: "#c9a84c" }}>Morphiq Media</span></p>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.4); }
      `}</style>
    </div>
  );
}
