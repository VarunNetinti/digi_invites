"use client";
import { TemplateProps } from "@/lib/types";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState } from "react";

// Template8: Celestial Night Sky — deep indigo, silver stars, constellation lines
export default function Template8({ invitation, isPreview }: TemplateProps) {
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
      <div style={{ width: p ? "390px" : "100%", fontFamily: "'Cormorant Garamond',serif", background: "#050b1f" }}>

        {/* HERO — starfield */}
        <div style={{ position: "relative", background: "linear-gradient(180deg,#020712 0%,#0a1628 50%,#050b1f 100%)", padding: p ? "60px 24px" : "100px 48px", textAlign: "center", overflow: "hidden", minHeight: p ? 500 : undefined }}>
          {/* SVG constellation */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
            {/* Stars */}
            {[[10,8],[25,20],[40,6],[60,15],[75,25],[90,8],[15,40],[50,35],[80,42],[30,55],[65,50],[5,60],[45,65],[85,60],[20,75],[55,80],[90,70]].map(([cx,cy],i)=>(
              <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={i%3===0?1.5:1} fill="white" opacity={0.4+Math.random()*0.4}/>
            ))}
            {/* Constellation lines */}
            <line x1="10%" y1="8%" x2="25%" y2="20%" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            <line x1="25%" y1="20%" x2="40%" y2="6%" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            <line x1="60%" y1="15%" x2="75%" y2="25%" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            <line x1="30%" y1="55%" x2="50%" y2="35%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
            <line x1="50%" y1="35%" x2="65%" y2="50%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
          </svg>
          {/* Moon glow */}
          <div style={{ position: "absolute", top: "15%", right: "12%", width: p ? 60 : 100, height: p ? 60 : 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(220,200,255,0.15) 0%, transparent 70%)" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.7em"), textTransform: tt("uppercase") as any, color: "#9ba8d0", fontFamily: "'Montserrat',sans-serif", marginBottom: p ? 20 : 36 }}>Written in the stars</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: p ? 16 : 28 }}>
              <span style={{ color: "#c8b9f0", fontSize: p ? 12 : 18 }}>✦</span>
              <div style={{ height: 1, width: p ? 40 : 80, background: "linear-gradient(90deg,transparent,#c8b9f0)" }} />
              <span style={{ color: "#c8b9f0", fontSize: p ? 16 : 24 }}>☽</span>
              <div style={{ height: 1, width: p ? 40 : 80, background: "linear-gradient(90deg,#c8b9f0,transparent)" }} />
              <span style={{ color: "#c8b9f0", fontSize: p ? 12 : 18 }}>✦</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 36 : 74, color: "#e8e0ff", fontStyle: "italic", lineHeight: 1.1, margin: "0 0 8px", textShadow: "0 0 40px rgba(200,185,240,0.4)" }}>{brideName || "Bride"}</h1>
            <p style={{ color: "#c8b9f0", fontSize: p ? 18 : 32, fontFamily: "'Cormorant Garamond',serif", margin: p ? "6px 0" : "10px 0" }}>&amp;</p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 36 : 74, color: "#e8e0ff", fontStyle: "italic", lineHeight: 1.1, margin: "0 0 28px", textShadow: "0 0 40px rgba(200,185,240,0.4)" }}>{groomName || "Groom"}</h1>
            <div style={{ display: "inline-block", border: "1px solid rgba(200,185,240,0.3)", borderRadius: 4, padding: p ? "12px 24px" : "20px 44px" }}>
              <p style={{ color: "#c8b9f0", fontSize: p ? 12 : 18, fontStyle: "italic", marginBottom: 4 }}>{fmt(date) || "Wedding Date"}</p>
              <p style={{ color: "#6b78a0", fontSize: p ? 10 : 14, letterSpacing: ls("0.1em") }}>{time || "00:00"} · {venue || "Venue"}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div style={{ background: "#080d20", padding: p ? "20px 20px" : "40px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, border: "1px solid #111a35" }}>
          {[
            { label: "Ceremony", value: venue || "Venue", sub: venueAddress },
            { label: "Date & Time", value: fmt(date) || "Date", sub: time },
            receptionVenue ? { label: t.reception, value: receptionVenue, sub: receptionTime } : null,
            dressCode ? { label: "Dress Code", value: dressCode, sub: "" } : null,
          ].filter(Boolean).map((item, i) => (
            <div key={i} style={{ padding: p ? "14px 16px" : "24px 28px", borderRight: i % 2 === 0 ? "1px solid #111a35" : "none", borderBottom: i < 2 ? "1px solid #111a35" : "none" }}>
              <p style={{ fontSize: 9, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, color: "#5a6890", fontFamily: "'Montserrat',sans-serif", marginBottom: 6 }}>{item!.label}</p>
              <p style={{ color: "#c8b9f0", fontSize: p ? 11 : 15, fontStyle: "italic" }}>{item!.value}</p>
              {item!.sub && <p style={{ color: "#4a5570", fontSize: p ? 10 : 13, marginTop: 3 }}>{item!.sub}</p>}
            </div>
          ))}
        </div>

        {/* Carousel */}
        {imageUrls.length > 0 && (
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.6s", transitionTimingFunction: "ease", transform: `translateX(-${slide * 100}%)` }}>
              {imageUrls.map((url, i) => (
                <div key={i} style={{ minWidth: "100%", aspectRatio: p ? "4/3" : "16/9", flexShrink: 0, position: "relative" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85) saturate(0.9)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,11,31,0.2), rgba(5,11,31,0.5))" }} />
                  <div style={{ position: "absolute", top: 12, right: 14, fontSize: 9, color: "rgba(200,185,240,0.6)", fontFamily: "'Montserrat',sans-serif", letterSpacing: ls("0.2em") }}>{i + 1} / {imageUrls.length}</div>
                </div>
              ))}
            </div>
            {imageUrls.length > 1 && !p && (
              <>
                <button onClick={() => setSlide(s => Math.max(0, s - 1))} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", background: "rgba(8,13,32,0.8)", border: "1px solid rgba(200,185,240,0.2)", color: "#c8b9f0", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>‹</button>
                <button onClick={() => setSlide(s => Math.min(imageUrls.length - 1, s + 1))} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "rgba(8,13,32,0.8)", border: "1px solid rgba(200,185,240,0.2)", color: "#c8b9f0", borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>›</button>
              </>
            )}
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "12px 0", background: "#050b1f" }}>
                {imageUrls.map((_, i) => <button key={i} onClick={() => !p && setSlide(i)} style={{ width: i === slide ? 6 : 6, height: 6, borderRadius: "50%", background: i === slide ? "#c8b9f0" : "#2a3050", border: "none", cursor: "pointer", transform: i === slide ? "scale(1.4)" : "scale(1)", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
              </div>
            )}
          </div>
        )}

                {/* Hero Photos */}
        {heroImageUrls.length > 0 && (
          <div style={{ padding: p ? "20px 16px" : "32px 48px" }}>
            <PhotoGallery images={heroImageUrls} style={hGS} fillet={hGF} accentColor={accentColor || "#5a6890"} isPreview={isPreview} />
          </div>
        )}

        {/* Families */}
        {(brideFamily?.fatherName || groomFamily?.fatherName) && (
          <div style={{ background: "#080d20", padding: p ? "24px 20px" : "48px", borderTop: "1px solid #111a35" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: "#5a6890", textAlign: "center", marginBottom: p ? 16 : 28, fontFamily: "'Montserrat',sans-serif" }}>✦ Our Families ✦</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[{ label: t.bridesFamily, fam: brideFamily, imgs: brideFamilyImageUrls, gs: bGS, gf: bGF }, { label: t.groomsFamily, fam: groomFamily, imgs: groomFamilyImageUrls, gs: gGS, gf: gGF }].map(({ label, fam, imgs, gs, gf }) => (
                <div key={label} style={{ border: "1px solid #111a35", padding: p ? "12px" : "20px", textAlign: "center" }}>
                  <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#c8b9f0", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 8 }}>{label}</p>
                  {fam?.fatherName && <p style={{ color: "#e8e0ff", fontSize: p ? 11 : 15, fontStyle: "italic", marginBottom: 3 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#9ba8d0", fontSize: p ? 10 : 13, marginBottom: 6 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: "#5a6890", fontSize: p ? 9 : 12 }}>{m.name} · {m.relation}</p>)}
                {imgs.length > 0 && <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden" }}><PhotoGallery images={imgs} style={gs} fillet={gf} accentColor={accentColor || "#5a6890"} isPreview={isPreview} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story */}
        {story && (
          <div style={{ padding: p ? "24px 20px" : "56px 64px", textAlign: "center", background: "#050b1f" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: "#5a6890", fontFamily: "'Montserrat',sans-serif", marginBottom: 16 }}>✦ {t.ourStory} ✦</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#9ba8d0", fontStyle: "italic", fontSize: p ? 12 : 19, lineHeight: 1.9 }}>{story}</p>
            {storyImageUrls.length > 0 && (
              <div style={{ marginTop: 24, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={accentColor || "#5a6890"} isPreview={isPreview} />
              </div>
            )}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline) && (
          <div style={{ background: "#080d20", padding: p ? "20px" : "36px 48px", textAlign: "center", borderTop: "1px solid #111a35" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.6em"), color: "#c8b9f0", textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 12 }}>☽ RSVP ☽</p>
            {rsvpDeadline && <p style={{ color: "#e8e0ff", fontSize: p ? 11 : 16, fontStyle: "italic", marginBottom: 4 }}>Kindly respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: "#5a6890", fontSize: p ? 10 : 14 }}>{rsvpContact}</p>}
          </div>
        )}

        {/* Footer */}
        <div style={{ background: "linear-gradient(180deg,#050b1f,#020712)", padding: p ? "28px 20px" : "56px", textAlign: "center", borderTop: "1px solid #111a35" }}>
          <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 34 : 60, color: "#e8e0ff", textShadow: "0 0 30px rgba(200,185,240,0.5)" }}>{brideName || "Bride"} &amp; {groomName || "Groom"}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
            {["✦","☽","✦"].map((s, i) => <span key={i} style={{ color: "#5a6890", fontSize: p ? 12 : 16 }}>{s}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
