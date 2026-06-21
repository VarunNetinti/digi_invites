"use client";
import { TemplateProps } from "@/lib/types";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState } from "react";

// Template10: Gatsby / Great Gatsby — champagne, black, geometric bold
export default function Template10({ invitation, isPreview }: TemplateProps) {
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
  const gold = "#d4af37";
  const champagne = "#f7e7a0";
  const black = "#0a0a0a";

  return (
    <div className={p ? "pointer-events-none" : ""}>
      <div style={{ width: p ? "390px" : "100%", fontFamily: "'Cormorant Garamond',serif", background: black }}>

        {/* HERO */}
        <div style={{ position: "relative", background: black, padding: p ? "56px 24px 44px" : "90px 60px 70px", textAlign: "center", overflow: "hidden", borderBottom: `4px solid ${gold}` }}>
          {/* Sunburst lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
            {Array.from({ length: 24 }, (_, i) => {
              const angle = (i * 15 * Math.PI) / 180;
              return <line key={i} x1="50%" y1="50%" x2={`${50 + 60 * Math.cos(angle)}%`} y2={`${50 + 60 * Math.sin(angle)}%`} stroke={gold} strokeWidth="1" />;
            })}
            <circle cx="50%" cy="50%" r="10%" fill="none" stroke={gold} strokeWidth="1" />
            <circle cx="50%" cy="50%" r="25%" fill="none" stroke={gold} strokeWidth="0.5" />
            <circle cx="50%" cy="50%" r="40%" fill="none" stroke={gold} strokeWidth="0.5" />
          </svg>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: p ? 16 : 28 }}>
              <div style={{ height: 1, width: p ? 32 : 60, background: gold }} />
              <div style={{ width: p ? 8 : 12, height: p ? 8 : 12, background: gold, transform: "rotate(45deg)" }} />
              <div style={{ height: 1, width: p ? 32 : 60, background: gold }} />
            </div>

            <p style={{ fontSize: 9, letterSpacing: ls("0.8em"), textTransform: tt("uppercase") as any, color: gold, fontFamily: "'Montserrat',sans-serif", marginBottom: p ? 18 : 30 }}>Marriage Celebration</p>

            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 38 : 76, color: champagne, fontStyle: "italic", lineHeight: 1, margin: "0 0 6px", textShadow: `0 0 40px rgba(212,175,55,0.3)` }}>{brideName || "Bride"}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: p ? "8px 0" : "14px 0" }}>
              <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg,transparent,${gold})` }} />
              <div style={{ width: p ? 8 : 14, height: p ? 8 : 14, background: gold, transform: "rotate(45deg)" }} />
              <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg,${gold},transparent)` }} />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 38 : 76, color: champagne, fontStyle: "italic", lineHeight: 1, margin: "0 0 24px", textShadow: `0 0 40px rgba(212,175,55,0.3)` }}>{groomName || "Groom"}</h1>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: p ? 16 : 28 }}>
              <div style={{ height: 1, width: p ? 32 : 60, background: gold }} />
              <div style={{ width: p ? 8 : 12, height: p ? 8 : 12, background: gold, transform: "rotate(45deg)" }} />
              <div style={{ height: 1, width: p ? 32 : 60, background: gold }} />
            </div>

            <p style={{ color: champagne, fontSize: p ? 13 : 20, fontStyle: "italic", marginBottom: 4 }}>{fmt(date) || "Wedding Date"}</p>
            <p style={{ color: gold, fontSize: p ? 11 : 16, letterSpacing: ls("0.2em") }}>{time || "00:00"} · {venue || "Venue"}</p>
          </div>
        </div>

        {/* Details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `1px solid rgba(212,175,55,0.2)` }}>
          {[
            { l: "Ceremony", v: venue || "Venue", s: venueAddress },
            { l: "Date", v: fmt(date) || "Date", s: time },
            receptionVenue ? { l: t.reception, v: receptionVenue, s: receptionTime } : null,
            dressCode ? { l: "Dress Code", v: dressCode, s: "" } : null,
          ].filter(Boolean).map((item, i) => (
            <div key={i} style={{ padding: p ? "14px 16px" : "24px 28px", borderRight: i % 2 === 0 ? `1px solid rgba(212,175,55,0.2)` : "none", borderBottom: `1px solid rgba(212,175,55,0.2)` }}>
              <p style={{ fontSize: 9, letterSpacing: ls("0.4em"), color: gold, textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 6 }}>{item!.l}</p>
              <p style={{ color: champagne, fontSize: p ? 11 : 15, fontStyle: "italic" }}>{item!.v}</p>
              {item!.s && <p style={{ color: "#6a6040", fontSize: p ? 10 : 13, marginTop: 3 }}>{item!.s}</p>}
            </div>
          ))}
        </div>

        {/* Carousel */}
        {imageUrls.length > 0 && (
          <div style={{ position: "relative", overflow: "hidden", borderTop: `2px solid ${gold}`, borderBottom: `2px solid ${gold}` }}>
            <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.6s", transitionTimingFunction: "ease", transform: `translateX(-${slide * 100}%)` }}>
              {imageUrls.map((url, i) => (
                <div key={i} style={{ minWidth: "100%", aspectRatio: p ? "4/3" : "16/9", flexShrink: 0, position: "relative" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(20%) contrast(1.05)" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent, rgba(10,10,10,0.4))` }} />
                </div>
              ))}
            </div>
            {imageUrls.length > 1 && !p && (
              <>
                <button onClick={() => setSlide(s => Math.max(0, s - 1))} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(10,10,10,0.8)", border: `1px solid ${gold}`, color: gold, borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>‹</button>
                <button onClick={() => setSlide(s => Math.min(imageUrls.length - 1, s + 1))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(10,10,10,0.8)", border: `1px solid ${gold}`, color: gold, borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>›</button>
              </>
            )}
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "10px 0", background: black }}>
                {imageUrls.map((_, i) => <div key={i} onClick={() => !p && setSlide(i)} style={{ width: i === slide ? 12 : 8, height: 8, background: i === slide ? gold : "#3a3020", transform: "rotate(45deg)", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
              </div>
            )}
          </div>
        )}

                {/* Hero Photos */}
        {heroImageUrls.length > 0 && (
          <div style={{ padding: p ? "20px 16px" : "32px 48px" }}>
            <PhotoGallery images={heroImageUrls} style={hGS} fillet={hGF} accentColor={accentColor || "#d4af37"} isPreview={isPreview} />
          </div>
        )}

        {/* Families */}
        {(brideFamily?.fatherName || groomFamily?.fatherName) && (
          <div style={{ background: "#0f0f0f", padding: p ? "24px 20px" : "48px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: p ? 16 : 28 }}>
              <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg,transparent,${gold})` }} />
              <div style={{ width: 8, height: 8, background: gold, transform: "rotate(45deg)" }} />
              <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), color: gold, textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", margin: "0 8px" }}>Our Families</p>
              <div style={{ width: 8, height: 8, background: gold, transform: "rotate(45deg)" }} />
              <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg,${gold},transparent)` }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[{ label: t.bridesFamily, fam: brideFamily, imgs: brideFamilyImageUrls, gs: bGS, gf: bGF }, { label: t.groomsFamily, fam: groomFamily, imgs: groomFamilyImageUrls, gs: gGS, gf: gGF }].map(({ label, fam, imgs, gs, gf }) => (
                <div key={label} style={{ border: `1px solid rgba(212,175,55,0.25)`, padding: p ? "12px" : "22px", textAlign: "center" }}>
                  <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: gold, textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 8 }}>{label}</p>
                  {fam?.fatherName && <p style={{ color: champagne, fontSize: p ? 11 : 15, fontStyle: "italic", marginBottom: 3 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#9a8a60", fontSize: p ? 10 : 13, marginBottom: 6 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: "#5a5030", fontSize: p ? 9 : 12 }}>{m.name} · {m.relation}</p>)}
                {imgs.length > 0 && <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden" }}><PhotoGallery images={imgs} style={gs} fillet={gf} accentColor={accentColor || "#d4af37"} isPreview={isPreview} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story */}
        {story && (
          <div style={{ padding: p ? "24px 20px" : "56px 64px", textAlign: "center", background: black }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ height: 1, width: p ? 32 : 60, background: gold, opacity: 0.5 }} />
              <div style={{ width: 6, height: 6, background: gold, transform: "rotate(45deg)", opacity: 0.7 }} />
              <div style={{ height: 1, width: p ? 32 : 60, background: gold, opacity: 0.5 }} />
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#9a8a60", fontStyle: "italic", fontSize: p ? 12 : 19, lineHeight: 1.9 }}>{story}</p>
            {storyImageUrls.length > 0 && (
              <div style={{ marginTop: 24, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={accentColor || "#d4af37"} isPreview={isPreview} />
              </div>
            )}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline) && (
          <div style={{ background: "#0f0f0f", padding: p ? "20px" : "36px 48px", textAlign: "center", borderTop: `1px solid rgba(212,175,55,0.2)` }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.6em"), color: gold, textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 12 }}>◆ RSVP ◆</p>
            {rsvpDeadline && <p style={{ color: champagne, fontSize: p ? 11 : 16, fontStyle: "italic", marginBottom: 4 }}>Please respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: "#6a6040", fontSize: p ? 10 : 14 }}>{rsvpContact}</p>}
          </div>
        )}

        {/* Footer */}
        <div style={{ background: black, padding: p ? "28px 20px" : "56px", textAlign: "center", borderTop: `4px solid ${gold}` }}>
          <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 34 : 64, color: champagne, textShadow: `0 0 30px rgba(212,175,55,0.4)` }}>{brideName || "Bride"} &amp; {groomName || "Groom"}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
            <div style={{ height: 1, width: p ? 28 : 56, background: gold, opacity: 0.4 }} />
            <div style={{ width: 6, height: 6, background: gold, transform: "rotate(45deg)" }} />
            <div style={{ height: 1, width: p ? 28 : 56, background: gold, opacity: 0.4 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
