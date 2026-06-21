"use client";
import { TemplateProps } from "@/lib/types";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState } from "react";

// Template7: Tropical Paradise — lush greens, warm coral, watercolor feel
export default function Template7({ invitation, isPreview }: TemplateProps) {
  const { brideName, groomName, date, time, venue, venueAddress, receptionVenue, receptionTime, dressCode, rsvpContact, rsvpDeadline, story, imageUrls, brideFamily, groomFamily , lang, galleryStyle = "slideshow", galleryFillet = "soft", heroGalleryStyle, heroGalleryFillet, storyGalleryStyle, storyGalleryFillet, brideFamilyGalleryStyle, brideFamilyGalleryFillet, groomFamilyGalleryStyle, groomFamilyGalleryFillet, heroImageUrls = [], storyImageUrls = [], brideFamilyImageUrls = [], groomFamilyImageUrls = [], accentColor } = invitation;
  const t = TRANSLATIONS[(lang as SupportedLang) || DEFAULT_LANG] || TRANSLATIONS[DEFAULT_LANG];
  const hGS = (heroGalleryStyle || galleryStyle || "slideshow") as GalleryStyle;
  const hGF = (heroGalleryFillet || galleryFillet || "soft") as Fillet;
  const sGS = (storyGalleryStyle || galleryStyle || "slideshow") as GalleryStyle;
  const sGF = (storyGalleryFillet || galleryFillet || "soft") as Fillet;
  const bGS = (brideFamilyGalleryStyle || galleryStyle || "slideshow") as GalleryStyle;
  const bGF = (brideFamilyGalleryFillet || galleryFillet || "soft") as Fillet;
  const gGS = (groomFamilyGalleryStyle || galleryStyle || "slideshow") as GalleryStyle;
  const gGF = (groomFamilyGalleryFillet || galleryFillet || "soft") as Fillet;
  // For non-Latin scripts, letterSpacing and textTransform:uppercase break rendering
  const ls = (spacing: string) => t === TRANSLATIONS["english"] ? spacing : "0";
  const tt = (transform: string) => t === TRANSLATIONS["english"] ? transform : "none";
  const [slide, setSlide] = useState(0);
  const fmt = (d: string) => { try { return new Date(d).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }); } catch { return d; } };
  const p = isPreview;

  return (
    <div className={p ? "pointer-events-none" : ""}>
      <div style={{ width: p ? "390px" : "100%", fontFamily: "'Lato',sans-serif", background: "#fffef9" }}>

        {/* HERO — tropical gradient */}
        <div style={{ background: "linear-gradient(160deg, #1a4731 0%, #2d6a4f 40%, #1b4332 100%)", padding: p ? "60px 24px 50px" : "100px 48px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* Leaf decorations */}
          <div style={{ position: "absolute", top: -10, left: -10, fontSize: p ? 60 : 120, opacity: 0.15, transform: "rotate(-30deg)" }}>🌴</div>
          <div style={{ position: "absolute", top: -10, right: -10, fontSize: p ? 60 : 120, opacity: 0.15, transform: "rotate(30deg) scaleX(-1)" }}>🌴</div>
          <div style={{ position: "absolute", bottom: -15, left: 10, fontSize: p ? 40 : 80, opacity: 0.1 }}>🌿</div>
          <div style={{ position: "absolute", bottom: -15, right: 10, fontSize: p ? 40 : 80, opacity: 0.1, transform: "scaleX(-1)" }}>🌿</div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-block", padding: p ? "4px 20px" : "6px 32px", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 40, marginBottom: p ? 16 : 24 }}>
              <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "rgba(255,255,255,0.7)", fontFamily: "'Montserrat',sans-serif" }}>You are invited</p>
            </div>
            <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 52 : 100, color: "#f9c74f", lineHeight: 1, margin: "0 0 8px", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>{brideName || "Bride"}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: p ? "8px 0" : "12px 0" }}>
              <div style={{ height: 1, width: p ? 32 : 64, background: "rgba(249,199,79,0.5)" }} />
              <span style={{ fontSize: p ? 18 : 28, color: "#f9c74f" }}>🌺</span>
              <div style={{ height: 1, width: p ? 32 : 64, background: "rgba(249,199,79,0.5)" }} />
            </div>
            <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 52 : 100, color: "#f9c74f", lineHeight: 1, margin: "0 0 24px", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>{groomName || "Groom"}</h1>
            <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", borderRadius: 12, padding: p ? "12px 20px" : "20px 36px", display: "inline-block" }}>
              <p style={{ color: "#fff", fontSize: p ? 12 : 18, fontStyle: "italic", marginBottom: 4 }}>{fmt(date) || "Wedding Date"}</p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: p ? 10 : 14 }}>{time || "00:00"} · {venue || "Venue"}</p>
            </div>
          </div>
        </div>

        {/* Wave divider SVG */}
        <div style={{ background: "#1b4332", marginBottom: -2 }}>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ width: "100%", height: p ? 24 : 48, display: "block" }}>
            <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill="#fffef9" />
          </svg>
        </div>

        {/* Details cards */}
        <div style={{ padding: p ? "20px 16px" : "40px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { icon: "📅", label: "Date", value: fmt(date) || "Date" },
            { icon: "⏰", label: "Time", value: time || "00:00" },
            { icon: "📍", label: "Venue", value: venue || "Venue" },
            { icon: "🎉", label: t.reception, value: receptionVenue || "—" },
          ].map(item => (
            <div key={item.label} style={{ background: "#f0faf4", borderRadius: 12, padding: p ? "12px" : "20px", border: "1px solid #c7e8d4", textAlign: "center" }}>
              <span style={{ fontSize: p ? 18 : 28 }}>{item.icon}</span>
              <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, color: "#2d6a4f", fontFamily: "'Montserrat',sans-serif", margin: "6px 0 4px" }}>{item.label}</p>
              <p style={{ color: "#1b4332", fontSize: p ? 11 : 14, fontWeight: 600 }}>{item.value}</p>
            </div>
          ))}
        </div>

        {venueAddress && <p style={{ textAlign: "center", color: "#6b8e7a", fontSize: p ? 11 : 14, fontStyle: "italic", padding: "0 20px 16px" }}>📌 {venueAddress}</p>}
        {dressCode && <p style={{ textAlign: "center", color: "#2d6a4f", fontSize: p ? 11 : 14, padding: "0 20px 20px" }}>👗 {t.dressCode}: <strong>{dressCode}</strong></p>}

        {/* Carousel — full bleed tropical */}
        {imageUrls.length > 0 && (
          <div style={{ position: "relative", overflow: "hidden", margin: "0 0 0 0" }}>
            <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.5s", transitionTimingFunction: "ease", transform: `translateX(-${slide * 100}%)` }}>
              {imageUrls.map((url, i) => (
                <div key={i} style={{ minWidth: "100%", aspectRatio: p ? "4/3" : "16/9", flexShrink: 0, position: "relative" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(27,67,50,0.4), transparent)" }} />
                </div>
              ))}
            </div>
            {imageUrls.length > 1 && !p && (
              <>
                <button onClick={() => setSlide(s => Math.max(0, s - 1))} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(27,67,50,0.8)", border: "none", color: "#f9c74f", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>‹</button>
                <button onClick={() => setSlide(s => Math.min(imageUrls.length - 1, s + 1))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(27,67,50,0.8)", border: "none", color: "#f9c74f", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>›</button>
              </>
            )}
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "10px 0", background: "rgba(27,67,50,0.9)" }}>
                {imageUrls.map((_, i) => <button key={i} onClick={() => !p && setSlide(i)} style={{ width: i === slide ? 18 : 6, height: 6, borderRadius: 3, background: i === slide ? "#f9c74f" : "rgba(249,199,79,0.3)", border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
              </div>
            )}
          </div>
        )}

                {/* Hero Photos */}
        {heroImageUrls.length > 0 && (
          <div style={{ padding: p ? "20px 16px" : "32px 48px" }}>
            <PhotoGallery images={heroImageUrls} style={hGS} fillet={hGF} accentColor={accentColor || "#2d4a3a"} isPreview={isPreview} />
          </div>
        )}

        {/* Families */}
        {(brideFamily?.fatherName || groomFamily?.fatherName) && (
          <div style={{ background: "#f0faf4", padding: p ? "24px 20px" : "48px", borderTop: "3px solid #c7e8d4" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "#2d6a4f", textAlign: "center", marginBottom: p ? 16 : 28, fontFamily: "'Montserrat',sans-serif" }}>{t.withBlessingsOfFamilies} 🌿</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[{ label: t.bridesFamily, fam: brideFamily, imgs: brideFamilyImageUrls, gs: bGS, gf: bGF }, { label: t.groomsFamily, fam: groomFamily, imgs: groomFamilyImageUrls, gs: gGS, gf: gGF }].map(({ label, fam, imgs, gs, gf }) => (
                <div key={label} style={{ background: "white", borderRadius: 12, padding: p ? "12px" : "20px", textAlign: "center", border: "1px solid #c7e8d4" }}>
                  <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#2d6a4f", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 8 }}>{label}</p>
                  {fam?.fatherName && <p style={{ color: "#1b4332", fontSize: p ? 11 : 15, fontWeight: 600, marginBottom: 3 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#4a7c6a", fontSize: p ? 10 : 13, marginBottom: 6 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: "#6b8e7a", fontSize: p ? 9 : 12 }}>{m.name} · {m.relation}</p>)}
                {imgs.length > 0 && <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden" }}><PhotoGallery images={imgs} style={gs} fillet={gf} accentColor={accentColor || "#2d4a3a"} isPreview={isPreview} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story */}
        {story && (
          <div style={{ padding: p ? "24px 20px" : "56px 64px", textAlign: "center" }}>
            <span style={{ fontSize: p ? 24 : 40 }}>💚</span>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#2d4a3a", fontStyle: "italic", fontSize: p ? 13 : 19, lineHeight: 1.9, margin: "12px 0 0" }}>{story}</p>
            {storyImageUrls.length > 0 && (
              <div style={{ marginTop: 24, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={accentColor || "#2d4a3a"} isPreview={isPreview} />
              </div>
            )}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline) && (
          <div style={{ background: "#1b4332", padding: p ? "20px" : "36px 48px", textAlign: "center" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), color: "#f9c74f", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 10 }}>RSVP 🌺</p>
            {rsvpDeadline && <p style={{ color: "#fff", fontSize: p ? 11 : 16, marginBottom: 4 }}>Please respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: "rgba(255,255,255,0.6)", fontSize: p ? 10 : 14 }}>{rsvpContact}</p>}
          </div>
        )}

        {/* Footer */}
        <div style={{ background: "linear-gradient(135deg,#1a4731,#2d6a4f)", padding: p ? "28px 20px" : "56px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 36 : 64, color: "#f9c74f" }}>{brideName || "Bride"} &amp; {groomName || "Groom"}</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginTop: 8 }}>{fmt(date) || "Wedding Day"}</p>
        </div>
      </div>
    </div>
  );
}
