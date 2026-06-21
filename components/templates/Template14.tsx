"use client";
import { TemplateProps } from "@/lib/types";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState } from "react";

// Template15: Emerald & Copper — rich jewel green, warm copper accents, luxe modern
export default function Template14({ invitation, isPreview }: TemplateProps) {
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
  const copper = "#b87333";
  const emerald = "#1a4a2e";
  const lightCopper = "#d4956a";

  return (
    <div className={p ? "pointer-events-none" : ""}>
      <div style={{ width: p ? "390px" : "100%", fontFamily: "'Cormorant Garamond',serif", background: "#0f2a1a" }}>

        {/* HERO */}
        <div style={{ position: "relative", background: `linear-gradient(160deg,${emerald} 0%,#2d6644 50%,#1a4a2e 100%)`, padding: p ? "60px 24px 50px" : "100px 56px 80px", textAlign: "center", overflow: "hidden" }}>
          {/* Copper geometric overlay */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}>
            <defs><pattern id="hex" x="0" y="0" width={p ? 50 : 90} height={p ? 56 : 104} patternUnits="userSpaceOnUse">
              <polygon points="25,4 46,16 46,40 25,52 4,40 4,16" fill="none" stroke={copper} strokeWidth="1"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#hex)"/>
          </svg>
          {/* Copper leaf corners */}
          <div style={{ position: "absolute", top: 12, left: 12, color: copper, fontSize: p ? 24 : 44, opacity: 0.5 }}>❦</div>
          <div style={{ position: "absolute", top: 12, right: 12, color: copper, fontSize: p ? 24 : 44, opacity: 0.5, transform: "scaleX(-1)" }}>❦</div>
          <div style={{ position: "absolute", bottom: 12, left: 12, color: copper, fontSize: p ? 24 : 44, opacity: 0.5, transform: "rotate(180deg) scaleX(-1)" }}>❦</div>
          <div style={{ position: "absolute", bottom: 12, right: 12, color: copper, fontSize: p ? 24 : 44, opacity: 0.5, transform: "rotate(180deg)" }}>❦</div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: p ? 16 : 28 }}>
              <div style={{ height: 1, width: p ? 32 : 60, background: `linear-gradient(90deg,transparent,${copper})` }} />
              <div style={{ width: p ? 6 : 10, height: p ? 6 : 10, borderRadius: "50%", background: copper }} />
              <div style={{ height: 1, width: p ? 32 : 60, background: `linear-gradient(90deg,${copper},transparent)` }} />
            </div>

            <p style={{ fontSize: 9, letterSpacing: ls("0.7em"), textTransform: tt("uppercase") as any, color: lightCopper, fontFamily: "'Montserrat',sans-serif", marginBottom: p ? 18 : 30 }}>Marriage Invitation</p>

            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 38 : 76, color: "#e8f5ee", fontStyle: "italic", lineHeight: 1.1, margin: "0 0 6px", textShadow: "0 0 40px rgba(184,115,51,0.2)" }}>{brideName || "Bride"}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: p ? "10px 0" : "18px 0" }}>
              <div style={{ height: 1, flex: 1, maxWidth: 80, background: `linear-gradient(90deg,transparent,${copper})` }} />
              <div style={{ width: p ? 10 : 16, height: p ? 10 : 16, borderRadius: "50%", border: `2px solid ${copper}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: p ? 4 : 6, height: p ? 4 : 6, borderRadius: "50%", background: copper }} />
              </div>
              <div style={{ height: 1, flex: 1, maxWidth: 80, background: `linear-gradient(90deg,${copper},transparent)` }} />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 38 : 76, color: "#e8f5ee", fontStyle: "italic", lineHeight: 1.1, margin: "0 0 28px", textShadow: "0 0 40px rgba(184,115,51,0.2)" }}>{groomName || "Groom"}</h1>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: p ? 16 : 24 }}>
              <div style={{ height: 1, width: p ? 32 : 60, background: `linear-gradient(90deg,transparent,${copper})` }} />
              <div style={{ width: p ? 6 : 10, height: p ? 6 : 10, borderRadius: "50%", background: copper }} />
              <div style={{ height: 1, width: p ? 32 : 60, background: `linear-gradient(90deg,${copper},transparent)` }} />
            </div>

            <p style={{ color: "#c8e8d4", fontSize: p ? 12 : 19, fontStyle: "italic", marginBottom: 4 }}>{fmt(date) || "Wedding Date"}</p>
            <p style={{ color: lightCopper, fontSize: p ? 10 : 15, letterSpacing: ls("0.1em") }}>{time || "00:00"} · {venue || "Venue"}</p>
          </div>
        </div>

        {/* Details grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#0a1e10" }}>
          {[
            { l: "Ceremony", v: venue || "Venue", s: venueAddress },
            { l: "Date & Time", v: fmt(date) || "Date", s: time },
            receptionVenue ? { l: t.reception, v: receptionVenue, s: receptionTime } : null,
            dressCode ? { l: "Dress Code", v: dressCode, s: "" } : null,
          ].filter(Boolean).map((item, i) => (
            <div key={i} style={{ padding: p ? "14px 16px" : "24px 28px", borderRight: i % 2 === 0 ? `1px solid rgba(184,115,51,0.2)` : "none", borderBottom: `1px solid rgba(184,115,51,0.2)` }}>
              <p style={{ fontSize: 9, letterSpacing: ls("0.4em"), color: copper, textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 6 }}>{item!.l}</p>
              <p style={{ color: "#c8e8d4", fontSize: p ? 11 : 15, fontStyle: "italic" }}>{item!.v}</p>
              {item!.s && <p style={{ color: "#4a8a5a", fontSize: p ? 10 : 13, marginTop: 3 }}>{item!.s}</p>}
            </div>
          ))}
        </div>

        {/* Carousel */}
        {imageUrls.length > 0 && (
          <div style={{ position: "relative", overflow: "hidden", borderTop: `2px solid ${copper}`, borderBottom: `2px solid ${copper}` }}>
            <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.6s", transitionTimingFunction: "ease", transform: `translateX(-${slide * 100}%)` }}>
              {imageUrls.map((url, i) => (
                <div key={i} style={{ minWidth: "100%", aspectRatio: p ? "4/3" : "16/9", flexShrink: 0, position: "relative" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(15,42,26,0.1), rgba(15,42,26,0.4))` }} />
                </div>
              ))}
            </div>
            {imageUrls.length > 1 && !p && (
              <>
                <button onClick={() => setSlide(s => Math.max(0, s - 1))} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(15,42,26,0.85)", border: `1px solid ${copper}`, color: lightCopper, borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>‹</button>
                <button onClick={() => setSlide(s => Math.min(imageUrls.length - 1, s + 1))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(15,42,26,0.85)", border: `1px solid ${copper}`, color: lightCopper, borderRadius: "50%", width: 40, height: 40, fontSize: 18, cursor: "pointer" }}>›</button>
              </>
            )}
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "12px 0", background: "#0a1e10" }}>
                {imageUrls.map((_, i) => <button key={i} onClick={() => !p && setSlide(i)} style={{ width: i === slide ? 18 : 6, height: 6, borderRadius: 3, background: i === slide ? copper : "rgba(184,115,51,0.25)", border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
              </div>
            )}
          </div>
        )}

                {/* Hero Photos */}
        {heroImageUrls.length > 0 && (
          <div style={{ padding: p ? "20px 16px" : "32px 48px" }}>
            <PhotoGallery images={heroImageUrls} style={hGS} fillet={hGF} accentColor={accentColor || "#b87333"} isPreview={isPreview} />
          </div>
        )}

        {/* Families */}
        {(brideFamily?.fatherName || groomFamily?.fatherName) && (
          <div style={{ background: "#0f2a1a", padding: p ? "24px 20px" : "48px 56px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: p ? 16 : 28 }}>
              <div style={{ height: 1, flex: 1, background: `rgba(184,115,51,0.3)` }} />
              <p style={{ fontSize: 9, letterSpacing: ls("0.4em"), color: copper, textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif" }}>Our Families</p>
              <div style={{ height: 1, flex: 1, background: `rgba(184,115,51,0.3)` }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[{ label: t.bridesFamily, fam: brideFamily, imgs: brideFamilyImageUrls, gs: bGS, gf: bGF }, { label: t.groomsFamily, fam: groomFamily, imgs: groomFamilyImageUrls, gs: gGS, gf: gGF }].map(({ label, fam, imgs, gs, gf }) => (
                <div key={label} style={{ border: `1px solid rgba(184,115,51,0.2)`, padding: p ? "12px" : "20px", textAlign: "center" }}>
                  <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: copper, textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 8 }}>{label}</p>
                  {fam?.fatherName && <p style={{ color: "#e8f5ee", fontSize: p ? 11 : 15, fontStyle: "italic", marginBottom: 3 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#7ab88a", fontSize: p ? 10 : 13, marginBottom: 6 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: "#4a8a5a", fontSize: p ? 9 : 12 }}>{m.name} · {m.relation}</p>)}
                {imgs.length > 0 && <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden" }}><PhotoGallery images={imgs} style={gs} fillet={gf} accentColor={accentColor || "#b87333"} isPreview={isPreview} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story */}
        {story && (
          <div style={{ padding: p ? "24px 20px" : "56px 64px", textAlign: "center", background: "#0a1e10" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ height: 1, flex: 1, background: `rgba(184,115,51,0.3)` }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: copper }} />
              <div style={{ height: 1, flex: 1, background: `rgba(184,115,51,0.3)` }} />
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#7ab88a", fontStyle: "italic", fontSize: p ? 13 : 20, lineHeight: 1.9 }}>{story}</p>
            {storyImageUrls.length > 0 && (
              <div style={{ marginTop: 24, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={accentColor || "#b87333"} isPreview={isPreview} />
              </div>
            )}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline) && (
          <div style={{ background: emerald, padding: p ? "20px" : "36px 56px", textAlign: "center", borderTop: `1px solid rgba(184,115,51,0.3)` }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.6em"), color: copper, textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 12 }}>RSVP</p>
            {rsvpDeadline && <p style={{ color: "#e8f5ee", fontSize: p ? 11 : 16, fontStyle: "italic", marginBottom: 4 }}>Kindly respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: lightCopper, fontSize: p ? 10 : 14 }}>{rsvpContact}</p>}
          </div>
        )}

        {/* Footer */}
        <div style={{ background: "linear-gradient(160deg,#0f2a1a,#1a4a2e)", padding: p ? "28px 20px" : "56px", textAlign: "center", borderTop: `3px solid ${copper}` }}>
          <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 34 : 64, color: "#e8f5ee", textShadow: `0 0 24px rgba(184,115,51,0.3)` }}>{brideName || "Bride"} &amp; {groomName || "Groom"}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
            <div style={{ height: 1, width: p ? 28 : 56, background: copper, opacity: 0.4 }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: copper }} />
            <div style={{ height: 1, width: p ? 28 : 56, background: copper, opacity: 0.4 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
