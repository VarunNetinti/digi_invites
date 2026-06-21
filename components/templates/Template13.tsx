"use client";
import { TemplateProps } from "@/lib/types";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState } from "react";

// Template14: Boho Terracotta — terracotta, burnt sienna, pampas grass, earth tones
export default function Template13({ invitation, isPreview }: TemplateProps) {
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
      <div style={{ width: p ? "390px" : "100%", fontFamily: "'Lato',sans-serif", background: "#fdf8f3" }}>

        {/* HERO */}
        <div style={{ background: "linear-gradient(160deg,#b5451b 0%,#c4622d 40%,#d4835a 80%,#e8a07a 100%)", padding: p ? "60px 24px 48px" : "100px 48px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* Pampas grass */}
          <div style={{ position: "absolute", top: 0, left: 0, fontSize: p ? 56 : 100, opacity: 0.2, transform: "rotate(-10deg) translateY(-20%)" }}>🌾</div>
          <div style={{ position: "absolute", top: 0, right: 0, fontSize: p ? 56 : 100, opacity: 0.2, transform: "rotate(10deg) translateY(-20%) scaleX(-1)" }}>🌾</div>
          <div style={{ position: "absolute", bottom: 0, left: "10%", fontSize: p ? 36 : 70, opacity: 0.15 }}>🌿</div>
          <div style={{ position: "absolute", bottom: 0, right: "10%", fontSize: p ? 36 : 70, opacity: 0.15, transform: "scaleX(-1)" }}>🌿</div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: p ? 16 : 28 }}>
              <div style={{ height: 1, width: p ? 24 : 48, background: "rgba(255,255,255,0.5)" }} />
              <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "rgba(255,255,255,0.85)", fontFamily: "'Montserrat',sans-serif" }}>with love</p>
              <div style={{ height: 1, width: p ? 24 : 48, background: "rgba(255,255,255,0.5)" }} />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 42 : 84, color: "#fff5ee", fontStyle: "italic", lineHeight: 1.05, margin: "0 0 4px", textShadow: "0 2px 16px rgba(0,0,0,0.15)" }}>{brideName || "Bride"}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: p ? "10px 0" : "16px 0" }}>
              <div style={{ height: 1, width: p ? 32 : 64, background: "rgba(255,255,255,0.4)" }} />
              <span style={{ fontSize: p ? 20 : 32 }}>🌼</span>
              <div style={{ height: 1, width: p ? 32 : 64, background: "rgba(255,255,255,0.4)" }} />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 42 : 84, color: "#fff5ee", fontStyle: "italic", lineHeight: 1.05, margin: "0 0 24px", textShadow: "0 2px 16px rgba(0,0,0,0.15)" }}>{groomName || "Groom"}</h1>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: p ? "8px 16px" : "14px 28px" }}>
                <p style={{ color: "#fff5ee", fontSize: p ? 11 : 17, fontStyle: "italic" }}>{fmt(date) || "Wedding Date"}</p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: p ? "8px 16px" : "14px 28px" }}>
                <p style={{ color: "#fff5ee", fontSize: p ? 11 : 17, fontStyle: "italic" }}>{time || "00:00"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Venue + details */}
        <div style={{ padding: p ? "24px 20px" : "48px 56px", background: "#fdf8f3" }}>
          <div style={{ textAlign: "center", marginBottom: p ? 16 : 28 }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "#b5451b", fontFamily: "'Montserrat',sans-serif", marginBottom: 8 }}>Ceremony</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#2a1408", fontSize: p ? 18 : 30, fontStyle: "italic", marginBottom: 4 }}>{venue || "Venue Name"}</h2>
            {venueAddress && <p style={{ color: "#8b5e4a", fontSize: p ? 11 : 15, marginBottom: 10 }}>{venueAddress}</p>}
          </div>
          {(receptionVenue || dressCode) && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {receptionVenue && <div style={{ background: "#f5ece0", border: "1px solid #e0c4a8", borderRadius: 8, padding: p ? "10px" : "16px 20px", textAlign: "center" }}>
                <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#b5451b", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 6 }}>{t.reception}</p>
                <p style={{ color: "#2a1408", fontSize: p ? 12 : 15, fontStyle: "italic" }}>{receptionVenue}</p>
                {receptionTime && <p style={{ color: "#8b5e4a", fontSize: p ? 10 : 13, marginTop: 3 }}>{receptionTime}</p>}
              </div>}
              {dressCode && <div style={{ background: "#f5ece0", border: "1px solid #e0c4a8", borderRadius: 8, padding: p ? "10px" : "16px 20px", textAlign: "center" }}>
                <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#b5451b", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 6 }}>Attire</p>
                <p style={{ color: "#2a1408", fontSize: p ? 12 : 15, fontStyle: "italic" }}>{dressCode}</p>
              </div>}
            </div>
          )}
        </div>

        {/* Carousel */}
        {imageUrls.length > 0 && (
          <div style={{ position: "relative", overflow: "hidden", borderTop: "3px solid #d4835a" }}>
            <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.5s", transitionTimingFunction: "ease", transform: `translateX(-${slide * 100}%)` }}>
              {imageUrls.map((url, i) => (
                <div key={i} style={{ minWidth: "100%", aspectRatio: p ? "4/3" : "16/9", flexShrink: 0, position: "relative" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.1) warm(1)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(181,69,27,0.15))" }} />
                </div>
              ))}
            </div>
            {imageUrls.length > 1 && !p && (
              <>
                <button onClick={() => setSlide(s => Math.max(0, s - 1))} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(181,69,27,0.85)", border: "none", color: "#fff5ee", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>‹</button>
                <button onClick={() => setSlide(s => Math.min(imageUrls.length - 1, s + 1))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(181,69,27,0.85)", border: "none", color: "#fff5ee", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>›</button>
              </>
            )}
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "10px 0", background: "#fdf8f3" }}>
                {imageUrls.map((_, i) => <button key={i} onClick={() => !p && setSlide(i)} style={{ width: i === slide ? 18 : 8, height: 8, borderRadius: 4, background: i === slide ? "#b5451b" : "#e0c4a8", border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
              </div>
            )}
          </div>
        )}

                {/* Hero Photos */}
        {heroImageUrls.length > 0 && (
          <div style={{ padding: p ? "20px 16px" : "32px 48px" }}>
            <PhotoGallery images={heroImageUrls} style={hGS} fillet={hGF} accentColor={accentColor || "#c97a3a"} isPreview={isPreview} />
          </div>
        )}

        {/* Families */}
        {(brideFamily?.fatherName || groomFamily?.fatherName) && (
          <div style={{ background: "#f5ece0", padding: p ? "24px 20px" : "48px 56px", borderTop: "2px solid #e0c4a8" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: p ? 16 : 24 }}>
              <div style={{ height: 1, flex: 1, background: "#e0c4a8" }} /><span>🌼</span><div style={{ height: 1, flex: 1, background: "#e0c4a8" }} />
            </div>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "#b5451b", textAlign: "center", marginBottom: p ? 14 : 24, fontFamily: "'Montserrat',sans-serif" }}>Our Families</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[{ label: t.bridesFamily, fam: brideFamily, imgs: brideFamilyImageUrls, gs: bGS, gf: bGF }, { label: t.groomsFamily, fam: groomFamily, imgs: groomFamilyImageUrls, gs: gGS, gf: gGF }].map(({ label, fam, imgs, gs, gf }) => (
                <div key={label} style={{ background: "#fdf8f3", border: "1px solid #e0c4a8", borderRadius: 8, padding: p ? "10px" : "18px", textAlign: "center" }}>
                  <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#b5451b", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 8 }}>{label}</p>
                  {fam?.fatherName && <p style={{ color: "#2a1408", fontSize: p ? 11 : 15, fontStyle: "italic", marginBottom: 3 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#8b5e4a", fontSize: p ? 10 : 13, marginBottom: 6 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: "#c4835a", fontSize: p ? 9 : 12 }}>{m.name} · {m.relation}</p>)}
                {imgs.length > 0 && <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden" }}><PhotoGallery images={imgs} style={gs} fillet={gf} accentColor={accentColor || "#c97a3a"} isPreview={isPreview} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story */}
        {story && (
          <div style={{ padding: p ? "24px 20px" : "52px 64px", textAlign: "center" }}>
            <span style={{ fontSize: p ? 24 : 40 }}>🌼</span>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#4a2418", fontStyle: "italic", fontSize: p ? 13 : 19, lineHeight: 1.9, marginTop: 12 }}>{story}</p>
            {storyImageUrls.length > 0 && (
              <div style={{ marginTop: 24, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={accentColor || "#c97a3a"} isPreview={isPreview} />
              </div>
            )}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline) && (
          <div style={{ background: "#b5451b", padding: p ? "20px" : "36px 56px", textAlign: "center" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), color: "#fff5ee", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 10 }}>🌾 RSVP</p>
            {rsvpDeadline && <p style={{ color: "#fff", fontSize: p ? 11 : 16, fontStyle: "italic", marginBottom: 4 }}>Kindly respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: "rgba(255,245,238,0.7)", fontSize: p ? 10 : 14 }}>{rsvpContact}</p>}
          </div>
        )}

        {/* Footer */}
        <div style={{ background: "linear-gradient(160deg,#b5451b,#c4622d,#d4835a)", padding: p ? "28px 20px" : "56px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 36 : 66, color: "#fff5ee" }}>{brideName || "Bride"} &amp; {groomName || "Groom"}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>🌾🌼🌾</div>
        </div>
      </div>
    </div>
  );
}
