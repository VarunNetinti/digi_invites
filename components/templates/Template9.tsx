"use client";
import { TemplateProps } from "@/lib/types";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState } from "react";

// Template9: Indian Festive — marigold orange, magenta, intricate border patterns
export default function Template9({ invitation, isPreview }: TemplateProps) {
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
      <div style={{ width: p ? "390px" : "100%", fontFamily: "'Cormorant Garamond',serif", background: "#fffbf0" }}>

        {/* HERO */}
        <div style={{ background: "linear-gradient(160deg,#c0392b 0%,#e74c3c 30%,#d35400 70%,#e67e22 100%)", padding: p ? "50px 20px 40px" : "80px 40px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* Mandala-like SVG background */}
          <svg style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08 }} width={p ? 280 : 600} height={p ? 280 : 600} viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#fff" strokeWidth="1"/>
            <circle cx="200" cy="200" r="140" fill="none" stroke="#fff" strokeWidth="0.5"/>
            <circle cx="200" cy="200" r="100" fill="none" stroke="#fff" strokeWidth="1"/>
            <circle cx="200" cy="200" r="60" fill="none" stroke="#fff" strokeWidth="0.5"/>
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i)=>(
              <line key={i} x1="200" y1="20" x2="200" y2="380" stroke="#fff" strokeWidth="0.5" transform={`rotate(${deg} 200 200)`}/>
            ))}
            {[0,45,90,135].map((deg,i)=>(
              <ellipse key={i} cx="200" cy="200" rx="60" ry="180" fill="none" stroke="#fff" strokeWidth="0.5" transform={`rotate(${deg} 200 200)`}/>
            ))}
          </svg>

          {/* Corner marigolds */}
          <div style={{ position: "absolute", top: 8, left: 8, fontSize: p ? 24 : 44, opacity: 0.6 }}>🌼</div>
          <div style={{ position: "absolute", top: 8, right: 8, fontSize: p ? 24 : 44, opacity: 0.6 }}>🌼</div>
          <div style={{ position: "absolute", bottom: 8, left: 8, fontSize: p ? 24 : 44, opacity: 0.6 }}>🌼</div>
          <div style={{ position: "absolute", bottom: 8, right: 8, fontSize: p ? 24 : 44, opacity: 0.6 }}>🌼</div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "rgba(255,255,200,0.85)", fontFamily: "'Montserrat',sans-serif", marginBottom: p ? 12 : 20 }}>🕉 Shubh Vivah 🕉</p>
            <div style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,200,0.3)", borderRadius: 8, padding: p ? "4px 16px" : "6px 28px", display: "inline-block", marginBottom: p ? 14 : 22 }}>
              <p style={{ color: "rgba(255,255,200,0.9)", fontSize: p ? 9 : 13, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif" }}>With family blessings</p>
            </div>
            <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 50 : 96, color: "#fff9e6", lineHeight: 1, margin: "0 0 4px", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>{brideName || "Bride"}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: p ? "8px 0" : "14px 0" }}>
              <div style={{ height: 1, width: p ? 32 : 64, background: "rgba(255,249,230,0.5)" }} />
              <span style={{ fontSize: p ? 18 : 32 }}>🪷</span>
              <div style={{ height: 1, width: p ? 32 : 64, background: "rgba(255,249,230,0.5)" }} />
            </div>
            <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 50 : 96, color: "#fff9e6", lineHeight: 1, margin: "0 0 20px", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>{groomName || "Groom"}</h1>

            {/* Date pill */}
            <div style={{ background: "rgba(255,249,230,0.15)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,249,230,0.3)", borderRadius: 40, padding: p ? "10px 20px" : "16px 36px", display: "inline-block" }}>
              <p style={{ color: "#fff9e6", fontSize: p ? 12 : 18, fontStyle: "italic", marginBottom: 2 }}>{fmt(date) || "Wedding Date"}</p>
              <p style={{ color: "rgba(255,249,230,0.7)", fontSize: p ? 10 : 13 }}>{time || "00:00"}</p>
            </div>
          </div>
        </div>

        {/* Gold border strip */}
        <div style={{ height: p ? 8 : 14, background: "linear-gradient(90deg,#e67e22,#f39c12,#f1c40f,#f39c12,#e67e22)" }} />

        {/* Venue card */}
        <div style={{ padding: p ? "20px 18px" : "40px 48px", textAlign: "center", background: "#fffbf0" }}>
          <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "#c0392b", fontFamily: "'Montserrat',sans-serif", marginBottom: 8 }}>Venue</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#4a1a0a", fontSize: p ? 18 : 30, marginBottom: 4 }}>{venue || "Venue Name"}</h2>
          {venueAddress && <p style={{ color: "#7a4a30", fontSize: p ? 11 : 15, fontStyle: "italic", marginBottom: 10 }}>{venueAddress}</p>}
          {receptionVenue && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #f5e6c0" }}>
              <p style={{ fontSize: 9, letterSpacing: ls("0.4em"), color: "#d35400", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 4 }}>{t.reception}</p>
              <p style={{ color: "#4a1a0a", fontSize: p ? 14 : 20, fontStyle: "italic" }}>{receptionVenue}</p>
              {receptionTime && <p style={{ color: "#7a4a30", fontSize: p ? 11 : 14, marginTop: 2 }}>{receptionTime}</p>}
            </div>
          )}
          {dressCode && <p style={{ marginTop: 10, color: "#c0392b", fontSize: p ? 11 : 14 }}>{t.dressCode}: <strong>{dressCode}</strong></p>}
        </div>

        {/* Gold border strip */}
        <div style={{ height: p ? 6 : 10, background: "linear-gradient(90deg,#e67e22,#f39c12,#f1c40f,#f39c12,#e67e22)" }} />

        {/* Carousel */}
        {imageUrls.length > 0 && (
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.5s", transitionTimingFunction: "ease", transform: `translateX(-${slide * 100}%)` }}>
              {imageUrls.map((url, i) => (
                <div key={i} style={{ minWidth: "100%", aspectRatio: p ? "4/3" : "16/9", flexShrink: 0, position: "relative" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(192,57,43,0.2))" }} />
                </div>
              ))}
            </div>
            {imageUrls.length > 1 && !p && (
              <>
                <button onClick={() => setSlide(s => Math.max(0, s - 1))} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(192,57,43,0.85)", border: "none", color: "#fff9e6", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>‹</button>
                <button onClick={() => setSlide(s => Math.min(imageUrls.length - 1, s + 1))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(192,57,43,0.85)", border: "none", color: "#fff9e6", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>›</button>
              </>
            )}
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "10px 0", background: "#fffbf0" }}>
                {imageUrls.map((_, i) => <button key={i} onClick={() => !p && setSlide(i)} style={{ width: i === slide ? 18 : 8, height: 8, borderRadius: 4, background: i === slide ? "#c0392b" : "#f5d5b0", border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
              </div>
            )}
          </div>
        )}

                {/* Hero Photos */}
        {heroImageUrls.length > 0 && (
          <div style={{ padding: p ? "20px 16px" : "32px 48px" }}>
            <PhotoGallery images={heroImageUrls} style={hGS} fillet={hGF} accentColor={accentColor || "#c9962f"} isPreview={isPreview} />
          </div>
        )}

        {/* Families */}
        {(brideFamily?.fatherName || groomFamily?.fatherName) && (
          <div style={{ background: "#fff8e8", padding: p ? "24px 18px" : "48px", borderTop: "3px solid #f39c12" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "#c0392b", textAlign: "center", marginBottom: p ? 16 : 28, fontFamily: "'Montserrat',sans-serif" }}>🪷 Our Families 🪷</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[{ label: t.bridesFamily, fam: brideFamily, imgs: brideFamilyImageUrls, gs: bGS, gf: bGF }, { label: t.groomsFamily, fam: groomFamily, imgs: groomFamilyImageUrls, gs: gGS, gf: gGF }].map(({ label, fam, imgs, gs, gf }) => (
                <div key={label} style={{ background: "#fffbf0", border: "2px solid #f5d5a0", borderRadius: 8, padding: p ? "12px" : "20px", textAlign: "center" }}>
                  <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#c0392b", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 8 }}>{label}</p>
                  {fam?.fatherName && <p style={{ color: "#4a1a0a", fontSize: p ? 11 : 15, fontWeight: 600, marginBottom: 3 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#7a4a30", fontSize: p ? 10 : 13, marginBottom: 6 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: "#c0392b", fontSize: p ? 9 : 12 }}>{m.name} · {m.relation}</p>)}
                {imgs.length > 0 && <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden" }}><PhotoGallery images={imgs} style={gs} fillet={gf} accentColor={accentColor || "#c9962f"} isPreview={isPreview} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story */}
        {story && (
          <div style={{ padding: p ? "24px 18px" : "52px 64px", textAlign: "center", background: "#fffbf0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ height: 1, flex: 1, background: "#f5d5a0" }} /><span>🪷</span><div style={{ height: 1, flex: 1, background: "#f5d5a0" }} />
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#4a1a0a", fontStyle: "italic", fontSize: p ? 12 : 19, lineHeight: 1.9 }}>{story}</p>
            {storyImageUrls.length > 0 && (
              <div style={{ marginTop: 24, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={accentColor || "#c9962f"} isPreview={isPreview} />
              </div>
            )}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline) && (
          <div style={{ background: "#c0392b", padding: p ? "20px" : "36px 48px", textAlign: "center" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), color: "#fff9e6", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 10 }}>🙏 RSVP</p>
            {rsvpDeadline && <p style={{ color: "#fff", fontSize: p ? 11 : 16, marginBottom: 4 }}>Please respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: "rgba(255,249,230,0.7)", fontSize: p ? 10 : 14 }}>{rsvpContact}</p>}
          </div>
        )}

        {/* Gold border strip */}
        <div style={{ height: p ? 8 : 14, background: "linear-gradient(90deg,#e67e22,#f39c12,#f1c40f,#f39c12,#e67e22)" }} />

        {/* Footer */}
        <div style={{ background: "linear-gradient(160deg,#c0392b,#e74c3c,#d35400)", padding: p ? "28px 20px" : "56px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 34 : 64, color: "#fff9e6" }}>{brideName || "Bride"} &amp; {groomName || "Groom"}</p>
          <p style={{ color: "rgba(255,249,230,0.6)", fontSize: 10, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginTop: 8 }}>🕉 Shubh Mangal Savadhan 🕉</p>
        </div>
      </div>
    </div>
  );
}
