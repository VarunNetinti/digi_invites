"use client";
import { TemplateProps } from "@/lib/types";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState } from "react";

// Template12: Coastal Beach — ocean blue, sandy beige, driftwood tones
export default function Template12({ invitation, isPreview }: TemplateProps) {
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
      <div style={{ width: p ? "390px" : "100%", fontFamily: "'Lato',sans-serif", background: "#f8f4ec" }}>

        {/* HERO — sky-to-sea gradient */}
        <div style={{ background: "linear-gradient(180deg,#a8d4e6 0%,#5ba3c9 40%,#2e7da8 100%)", padding: p ? "56px 24px 44px" : "90px 48px 70px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* Sun */}
          <div style={{ position: "absolute", top: p ? 16 : 28, right: p ? 20 : 40, width: p ? 36 : 64, height: p ? 36 : 64, borderRadius: "50%", background: "rgba(255,240,180,0.6)", boxShadow: "0 0 20px rgba(255,240,180,0.4)" }} />
          {/* Wave shapes */}
          <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }} viewBox="0 0 1200 80" preserveAspectRatio="none">
            <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" fill="rgba(255,255,255,0.15)"/>
            <path d="M0,55 C150,30 350,70 600,55 C850,40 1050,65 1200,55 L1200,80 L0,80 Z" fill="rgba(248,244,236,0.4)"/>
          </svg>

          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "rgba(255,255,255,0.85)", fontFamily: "'Montserrat',sans-serif", marginBottom: p ? 16 : 28 }}>🌊 By the Sea</p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 38 : 76, color: "#fff", fontStyle: "italic", lineHeight: 1.1, margin: "0 0 6px", textShadow: "0 2px 16px rgba(0,0,0,0.2)" }}>{brideName || "Bride"}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: p ? "8px 0" : "14px 0" }}>
              <div style={{ height: 1, width: p ? 36 : 72, background: "rgba(255,255,255,0.5)" }} />
              <span style={{ fontSize: p ? 18 : 28 }}>⚓</span>
              <div style={{ height: 1, width: p ? 36 : 72, background: "rgba(255,255,255,0.5)" }} />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 38 : 76, color: "#fff", fontStyle: "italic", lineHeight: 1.1, margin: "0 0 24px", textShadow: "0 2px 16px rgba(0,0,0,0.2)" }}>{groomName || "Groom"}</h1>
            <div style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", borderRadius: 12, padding: p ? "10px 20px" : "16px 36px", display: "inline-block" }}>
              <p style={{ color: "#fff", fontSize: p ? 12 : 18, fontStyle: "italic", marginBottom: 3 }}>{fmt(date) || "Wedding Date"}</p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: p ? 10 : 14 }}>{time || "00:00"}</p>
            </div>
          </div>
        </div>

        {/* Sandy details section */}
        <div style={{ background: "#f0e8d0", padding: p ? "20px 20px" : "40px 56px", borderBottom: "2px solid #d4c4a0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, textAlign: "center" }}>
            <div style={{ background: "#faf4e6", border: "1px solid #d4c4a0", borderRadius: 10, padding: p ? "12px" : "20px" }}>
              <span style={{ fontSize: p ? 20 : 32 }}>⛪</span>
              <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#8b7355", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", margin: "6px 0 4px" }}>Venue</p>
              <p style={{ color: "#4a3728", fontSize: p ? 12 : 16, fontWeight: 600 }}>{venue || "Venue"}</p>
              {venueAddress && <p style={{ color: "#8b7355", fontSize: p ? 10 : 12, marginTop: 3, fontStyle: "italic" }}>{venueAddress}</p>}
            </div>
            <div style={{ background: "#faf4e6", border: "1px solid #d4c4a0", borderRadius: 10, padding: p ? "12px" : "20px" }}>
              <span style={{ fontSize: p ? 20 : 32 }}>🗓️</span>
              <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#8b7355", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", margin: "6px 0 4px" }}>Date & Time</p>
              <p style={{ color: "#4a3728", fontSize: p ? 11 : 15, fontWeight: 600 }}>{fmt(date) || "Date"}</p>
              <p style={{ color: "#8b7355", fontSize: p ? 10 : 12, marginTop: 3 }}>{time || "00:00"}</p>
            </div>
          </div>
          {(receptionVenue || dressCode) && (
            <div style={{ display: "grid", gridTemplateColumns: receptionVenue && dressCode ? "1fr 1fr" : "1fr", gap: 14, marginTop: 14 }}>
              {receptionVenue && <div style={{ background: "#faf4e6", border: "1px solid #d4c4a0", borderRadius: 10, padding: p ? "10px 12px" : "16px 20px", textAlign: "center" }}>
                <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#8b7355", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 4 }}>{t.reception}</p>
                <p style={{ color: "#4a3728", fontSize: p ? 12 : 15 }}>{receptionVenue}{receptionTime && ` · ${receptionTime}`}</p>
              </div>}
              {dressCode && <div style={{ background: "#faf4e6", border: "1px solid #d4c4a0", borderRadius: 10, padding: p ? "10px 12px" : "16px 20px", textAlign: "center" }}>
                <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#8b7355", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 4 }}>{t.dressCode}</p>
                <p style={{ color: "#4a3728", fontSize: p ? 12 : 15 }}>{dressCode}</p>
              </div>}
            </div>
          )}
        </div>

        {/* Carousel */}
        {imageUrls.length > 0 && (
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.5s", transitionTimingFunction: "ease", transform: `translateX(-${slide * 100}%)` }}>
              {imageUrls.map((url, i) => (
                <div key={i} style={{ minWidth: "100%", aspectRatio: p ? "4/3" : "16/9", flexShrink: 0, position: "relative" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(46,125,168,0.2))" }} />
                </div>
              ))}
            </div>
            {imageUrls.length > 1 && !p && (
              <>
                <button onClick={() => setSlide(s => Math.max(0, s - 1))} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(46,125,168,0.85)", border: "none", color: "#fff", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>‹</button>
                <button onClick={() => setSlide(s => Math.min(imageUrls.length - 1, s + 1))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(46,125,168,0.85)", border: "none", color: "#fff", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>›</button>
              </>
            )}
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "10px 0", background: "#f0e8d0" }}>
                {imageUrls.map((_, i) => <button key={i} onClick={() => !p && setSlide(i)} style={{ width: i === slide ? 18 : 8, height: 8, borderRadius: 4, background: i === slide ? "#2e7da8" : "#c4b48a", border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
              </div>
            )}
          </div>
        )}

                {/* Hero Photos */}
        {heroImageUrls.length > 0 && (
          <div style={{ padding: p ? "20px 16px" : "32px 48px" }}>
            <PhotoGallery images={heroImageUrls} style={hGS} fillet={hGF} accentColor={accentColor || "#5ba3c9"} isPreview={isPreview} />
          </div>
        )}

        {/* Families */}
        {(brideFamily?.fatherName || groomFamily?.fatherName) && (
          <div style={{ background: "#faf4e6", padding: p ? "24px 20px" : "48px 56px", borderTop: "2px solid #d4c4a0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: p ? 16 : 24 }}>
              <div style={{ height: 1, flex: 1, background: "#d4c4a0" }} /><span>⚓</span><div style={{ height: 1, flex: 1, background: "#d4c4a0" }} />
            </div>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "#8b7355", textAlign: "center", marginBottom: p ? 14 : 24, fontFamily: "'Montserrat',sans-serif" }}>Our Families</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[{ label: t.bridesFamily, fam: brideFamily, imgs: brideFamilyImageUrls, gs: bGS, gf: bGF }, { label: t.groomsFamily, fam: groomFamily, imgs: groomFamilyImageUrls, gs: gGS, gf: gGF }].map(({ label, fam, imgs, gs, gf }) => (
                <div key={label} style={{ background: "#f0e8d0", border: "1px solid #d4c4a0", borderRadius: 10, padding: p ? "12px" : "18px", textAlign: "center" }}>
                  <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#5ba3c9", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 8 }}>{label}</p>
                  {fam?.fatherName && <p style={{ color: "#4a3728", fontSize: p ? 11 : 15, fontWeight: 600, marginBottom: 3 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#8b7355", fontSize: p ? 10 : 13, marginBottom: 6 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: "#a09070", fontSize: p ? 9 : 12 }}>{m.name} · {m.relation}</p>)}
                {imgs.length > 0 && <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden" }}><PhotoGallery images={imgs} style={gs} fillet={gf} accentColor={accentColor || "#5ba3c9"} isPreview={isPreview} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story */}
        {story && (
          <div style={{ padding: p ? "24px 20px" : "52px 64px", textAlign: "center" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "#5ba3c9", fontFamily: "'Montserrat',sans-serif", marginBottom: 14 }}>🌊 {t.ourStory}</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#4a3728", fontStyle: "italic", fontSize: p ? 13 : 19, lineHeight: 1.9 }}>{story}</p>
            {storyImageUrls.length > 0 && (
              <div style={{ marginTop: 24, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={accentColor || "#5ba3c9"} isPreview={isPreview} />
              </div>
            )}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline) && (
          <div style={{ background: "#2e7da8", padding: p ? "20px" : "36px 56px", textAlign: "center" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), color: "rgba(255,255,255,0.8)", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 10 }}>🌊 RSVP</p>
            {rsvpDeadline && <p style={{ color: "#fff", fontSize: p ? 11 : 16, fontStyle: "italic", marginBottom: 4 }}>Please respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: "rgba(255,255,255,0.65)", fontSize: p ? 10 : 14 }}>{rsvpContact}</p>}
          </div>
        )}

        {/* Footer */}
        <div style={{ background: "linear-gradient(180deg,#a8d4e6,#5ba3c9)", padding: p ? "28px 20px" : "56px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 36 : 64, color: "#fff", textShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>{brideName || "Bride"} &amp; {groomName || "Groom"}</p>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginTop: 8 }}>🌊 ⚓ 🌊</p>
        </div>
      </div>
    </div>
  );
}
