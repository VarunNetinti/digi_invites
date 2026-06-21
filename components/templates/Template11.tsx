"use client";
import { TemplateProps } from "@/lib/types";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState } from "react";

// Template11: Lavender Fields — soft purple, silver, romantic French countryside
export default function Template11({ invitation, isPreview }: TemplateProps) {
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
      <div style={{ width: p ? "390px" : "100%", fontFamily: "'Cormorant Garamond',serif", background: "#faf8ff" }}>

        {/* HERO */}
        <div style={{ background: "linear-gradient(160deg,#4a3568 0%,#6b4f92 40%,#8b6faf 100%)", padding: p ? "60px 24px 50px" : "100px 48px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
            {["10% 15%","25% 60%","40% 25%","55% 75%","70% 10%","85% 50%","95% 30%"].map((pos, i) => (
              <div key={i} style={{ position: "absolute", left: pos.split(" ")[0], top: pos.split(" ")[1], fontSize: p ? 20 : 36 }}>💜</div>
            ))}
          </div>
          <div style={{ position: "absolute", top: 12, left: 12, fontSize: p ? 28 : 52, opacity: 0.2 }}>🌾</div>
          <div style={{ position: "absolute", top: 12, right: 12, fontSize: p ? 28 : 52, opacity: 0.2, transform: "scaleX(-1)" }}>🌾</div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.25)", display: "inline-block", padding: p ? "4px 16px" : "6px 28px", borderRadius: 40, marginBottom: p ? 16 : 28 }}>
              <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "rgba(255,255,255,0.8)", fontFamily: "'Montserrat',sans-serif" }}>Together Forever</p>
            </div>
            <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 52 : 100, color: "#ede0ff", lineHeight: 1, margin: "0 0 6px", textShadow: "0 2px 24px rgba(0,0,0,0.2)" }}>{brideName || "Bride"}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: p ? "8px 0" : "14px 0" }}>
              <div style={{ height: 1, width: p ? 36 : 72, background: "rgba(255,255,255,0.4)" }} />
              <span style={{ fontSize: p ? 18 : 28, color: "#d4b8f0" }}>❀</span>
              <div style={{ height: 1, width: p ? 36 : 72, background: "rgba(255,255,255,0.4)" }} />
            </div>
            <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 52 : 100, color: "#ede0ff", lineHeight: 1, margin: "0 0 24px", textShadow: "0 2px 24px rgba(0,0,0,0.2)" }}>{groomName || "Groom"}</h1>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 16, padding: p ? "12px 20px" : "20px 40px", display: "inline-block", backdropFilter: "blur(4px)" }}>
              <p style={{ color: "#fff", fontSize: p ? 12 : 18, fontStyle: "italic", marginBottom: 4 }}>{fmt(date) || "Wedding Date"}</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: p ? 10 : 14 }}>{time || "00:00"} · {venue || "Venue"}</p>
            </div>
          </div>
        </div>

        {/* Venue section */}
        <div style={{ padding: p ? "24px 20px" : "48px 64px", textAlign: "center", background: "#faf8ff" }}>
          <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "#7b5ea7", fontFamily: "'Montserrat',sans-serif", marginBottom: 10 }}>Ceremony</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#2d1a4a", fontSize: p ? 18 : 30, marginBottom: 4 }}>{venue || "Venue Name"}</h2>
          {venueAddress && <p style={{ color: "#8b7aa0", fontSize: p ? 11 : 15, fontStyle: "italic", marginBottom: 10 }}>{venueAddress}</p>}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
            {receptionVenue && <div style={{ background: "#f0eaf8", border: "1px solid #d4b8f0", borderRadius: 8, padding: p ? "8px 12px" : "12px 20px", textAlign: "center" }}>
              <p style={{ fontSize: 9, color: "#7b5ea7", letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 4 }}>{t.reception}</p>
              <p style={{ color: "#2d1a4a", fontSize: p ? 12 : 16 }}>{receptionVenue}{receptionTime && ` · ${receptionTime}`}</p>
            </div>}
            {dressCode && <div style={{ background: "#f0eaf8", border: "1px solid #d4b8f0", borderRadius: 8, padding: p ? "8px 12px" : "12px 20px", textAlign: "center" }}>
              <p style={{ fontSize: 9, color: "#7b5ea7", letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 4 }}>{t.dressCode}</p>
              <p style={{ color: "#2d1a4a", fontSize: p ? 12 : 16 }}>{dressCode}</p>
            </div>}
          </div>
        </div>

        {/* Carousel */}
        {imageUrls.length > 0 && (
          <div style={{ position: "relative", overflow: "hidden", borderTop: "2px solid #d4b8f0", borderBottom: "2px solid #d4b8f0" }}>
            <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.5s", transitionTimingFunction: "ease", transform: `translateX(-${slide * 100}%)` }}>
              {imageUrls.map((url, i) => (
                <div key={i} style={{ minWidth: "100%", aspectRatio: p ? "4/3" : "16/9", flexShrink: 0, position: "relative" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(74,53,104,0.25))" }} />
                </div>
              ))}
            </div>
            {imageUrls.length > 1 && !p && (
              <>
                <button onClick={() => setSlide(s => Math.max(0, s - 1))} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(74,53,104,0.8)", border: "none", color: "#ede0ff", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>‹</button>
                <button onClick={() => setSlide(s => Math.min(imageUrls.length - 1, s + 1))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(74,53,104,0.8)", border: "none", color: "#ede0ff", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>›</button>
              </>
            )}
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "10px 0", background: "#faf8ff" }}>
                {imageUrls.map((_, i) => <button key={i} onClick={() => !p && setSlide(i)} style={{ width: i === slide ? 18 : 8, height: 8, borderRadius: 4, background: i === slide ? "#7b5ea7" : "#d4b8f0", border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
              </div>
            )}
          </div>
        )}

                {/* Hero Photos */}
        {heroImageUrls.length > 0 && (
          <div style={{ padding: p ? "20px 16px" : "32px 48px" }}>
            <PhotoGallery images={heroImageUrls} style={hGS} fillet={hGF} accentColor={accentColor || "#4a3568"} isPreview={isPreview} />
          </div>
        )}

        {/* Families */}
        {(brideFamily?.fatherName || groomFamily?.fatherName) && (
          <div style={{ background: "#f0eaf8", padding: p ? "24px 20px" : "48px 64px" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "#7b5ea7", textAlign: "center", marginBottom: p ? 16 : 28, fontFamily: "'Montserrat',sans-serif" }}>❀ Families ❀</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[{ label: t.bridesFamily, fam: brideFamily, imgs: brideFamilyImageUrls, gs: bGS, gf: bGF }, { label: t.groomsFamily, fam: groomFamily, imgs: groomFamilyImageUrls, gs: gGS, gf: gGF }].map(({ label, fam, imgs, gs, gf }) => (
                <div key={label} style={{ background: "white", border: "1px solid #d4b8f0", borderRadius: 12, padding: p ? "12px" : "20px", textAlign: "center" }}>
                  <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#7b5ea7", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 8 }}>{label}</p>
                  {fam?.fatherName && <p style={{ color: "#2d1a4a", fontSize: p ? 11 : 15, fontStyle: "italic", marginBottom: 3 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#6b5080", fontSize: p ? 10 : 13, marginBottom: 6 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: "#9b8aaf", fontSize: p ? 9 : 12 }}>{m.name} · {m.relation}</p>)}
                {imgs.length > 0 && <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden" }}><PhotoGallery images={imgs} style={gs} fillet={gf} accentColor={accentColor || "#4a3568"} isPreview={isPreview} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story */}
        {story && (
          <div style={{ padding: p ? "24px 20px" : "56px 64px", textAlign: "center" }}>
            <span style={{ fontSize: p ? 24 : 40 }}>💜</span>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#4a3568", fontStyle: "italic", fontSize: p ? 13 : 19, lineHeight: 1.9, marginTop: 12 }}>{story}</p>
            {storyImageUrls.length > 0 && (
              <div style={{ marginTop: 24, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={accentColor || "#4a3568"} isPreview={isPreview} />
              </div>
            )}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline) && (
          <div style={{ background: "#6b4f92", padding: p ? "20px" : "36px 64px", textAlign: "center" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), color: "#ede0ff", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 10 }}>❀ RSVP</p>
            {rsvpDeadline && <p style={{ color: "#fff", fontSize: p ? 11 : 16, fontStyle: "italic", marginBottom: 4 }}>Please respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: "rgba(237,224,255,0.65)", fontSize: p ? 10 : 14 }}>{rsvpContact}</p>}
          </div>
        )}

        {/* Footer */}
        <div style={{ background: "linear-gradient(160deg,#4a3568,#6b4f92,#8b6faf)", padding: p ? "28px 20px" : "56px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 34 : 64, color: "#ede0ff" }}>{brideName || "Bride"} &amp; {groomName || "Groom"}</p>
          <p style={{ color: "rgba(237,224,255,0.5)", fontSize: 9, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginTop: 8 }}>{fmt(date) || "Wedding Day"}</p>
        </div>
      </div>
    </div>
  );
}
