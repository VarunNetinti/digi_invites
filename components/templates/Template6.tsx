"use client";
import { TemplateProps } from "@/lib/types";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState } from "react";

// Template6: Japanese Zen — ink wash, cherry blossom, minimalist white & crimson
export default function Template6({ invitation, isPreview }: TemplateProps) {
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
      <div style={{ width: p ? "390px" : "100%", fontFamily: "'Cormorant Garamond',serif", background: "#fdfaf6" }}>

        {/* HERO — white with ink-brush red accent */}
        <div style={{ position: "relative", background: "#fdfaf6", padding: p ? "60px 28px 40px" : "100px 48px 60px", textAlign: "center", borderBottom: "1px solid #e8ddd0", overflow: "hidden" }}>
          {/* Ink wash circle bg */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: p ? 300 : 600, height: p ? 300 : 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(220,50,47,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
          {/* Cherry blossoms */}
          <div style={{ position: "absolute", top: 12, left: 12, fontSize: p ? 28 : 52, opacity: 0.15 }}>🌸</div>
          <div style={{ position: "absolute", top: 30, right: 20, fontSize: p ? 20 : 38, opacity: 0.12 }}>🌸</div>
          <div style={{ position: "absolute", bottom: 16, left: 28, fontSize: p ? 16 : 32, opacity: 0.1 }}>🌸</div>
          <div style={{ position: "absolute", bottom: 20, right: 16, fontSize: p ? 22 : 44, opacity: 0.13 }}>🌸</div>

          <p style={{ fontSize: 9, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: "#b5937a", fontFamily: "'Lato',sans-serif", marginBottom: p ? 20 : 32 }}>Together in harmony</p>

          {/* Vertical red line — Japanese style */}
          <div style={{ width: 2, height: p ? 40 : 70, background: "linear-gradient(to bottom, #dc322f, transparent)", margin: "0 auto 20px" }} />

          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 34 : 68, color: "#1a1a1a", fontStyle: "italic", margin: "0 0 6px", lineHeight: 1.1 }}>{brideName || "Bride"}</h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: p ? "10px 0" : "16px 0" }}>
            <div style={{ height: 1, width: p ? 40 : 80, background: "#dc322f", opacity: 0.4 }} />
            <span style={{ fontSize: p ? 14 : 22, color: "#dc322f" }}>鶴</span>
            <div style={{ height: 1, width: p ? 40 : 80, background: "#dc322f", opacity: 0.4 }} />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: p ? 34 : 68, color: "#1a1a1a", fontStyle: "italic", margin: "0 0 24px", lineHeight: 1.1 }}>{groomName || "Groom"}</h1>

          <div style={{ width: 2, height: p ? 30 : 50, background: "linear-gradient(to bottom, transparent, #dc322f)", margin: "0 auto 20px" }} />

          <p style={{ color: "#4a3728", fontSize: p ? 12 : 17, fontStyle: "italic", marginBottom: 4 }}>{fmt(date) || "Wedding Date"}</p>
          <p style={{ color: "#b5937a", fontSize: p ? 11 : 15 }}>{time || "00:00"} · {venue || "Venue"}</p>
        </div>

        {/* Details strip */}
        <div style={{ display: "grid", gridTemplateColumns: venueAddress ? "1fr 1fr" : "1fr", background: "#1a1a1a" }}>
          <div style={{ padding: p ? "16px" : "28px 32px", borderRight: venueAddress ? "1px solid #2a2a2a" : "none" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.4em"), color: "#dc322f", textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginBottom: 6 }}>Ceremony</p>
            <p style={{ color: "#f0ede8", fontSize: p ? 12 : 16, fontStyle: "italic" }}>{venue || "Venue"}</p>
            {venueAddress && <p style={{ color: "#888", fontSize: p ? 10 : 13, marginTop: 3 }}>{venueAddress}</p>}
          </div>
          {venueAddress && (
            <div style={{ padding: p ? "16px" : "28px 32px" }}>
              <p style={{ fontSize: 9, letterSpacing: ls("0.4em"), color: "#dc322f", textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginBottom: 6 }}>Date & Time</p>
              <p style={{ color: "#f0ede8", fontSize: p ? 12 : 16, fontStyle: "italic" }}>{fmt(date) || "Date"}</p>
              <p style={{ color: "#888", fontSize: p ? 10 : 13, marginTop: 3 }}>{time || "00:00"}</p>
            </div>
          )}
        </div>

        {/* Carousel — panoramic with red overlay */}
        {imageUrls.length > 0 && (
          <div style={{ position: "relative", overflow: "hidden", background: "#111" }}>
            <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.6s", transitionTimingFunction: "ease", transform: `translateX(-${slide * 100}%)` }}>
              {imageUrls.map((url, i) => (
                <div key={i} style={{ minWidth: "100%", aspectRatio: p ? "4/3" : "16/9", flexShrink: 0, position: "relative" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(220,50,47,0.1), transparent)" }} />
                </div>
              ))}
            </div>
            {imageUrls.length > 1 && !p && (
              <>
                <button onClick={() => setSlide(s => Math.max(0, s - 1))} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(220,50,47,0.85)", border: "none", color: "#fff", borderRadius: "50%", width: 38, height: 38, fontSize: 18, cursor: "pointer" }}>‹</button>
                <button onClick={() => setSlide(s => Math.min(imageUrls.length - 1, s + 1))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(220,50,47,0.85)", border: "none", color: "#fff", borderRadius: "50%", width: 38, height: 38, fontSize: 18, cursor: "pointer" }}>›</button>
              </>
            )}
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "10px 0", background: "#111" }}>
                {imageUrls.map((_, i) => <button key={i} onClick={() => !p && setSlide(i)} style={{ width: i === slide ? 18 : 6, height: 6, borderRadius: 3, background: i === slide ? "#dc322f" : "#444", border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
              </div>
            )}
          </div>
        )}

        {/* {t.reception} & Dress code */}
        {(receptionVenue || dressCode) && (
          <div style={{ background: "#fdfaf6", padding: p ? "20px 20px" : "36px 48px", display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", borderBottom: "1px solid #e8ddd0" }}>
            {receptionVenue && <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 9, letterSpacing: ls("0.4em"), color: "#dc322f", textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginBottom: 6 }}>{t.reception}</p>
              <p style={{ color: "#1a1a1a", fontSize: p ? 12 : 16, fontStyle: "italic" }}>{receptionVenue}</p>
              {receptionTime && <p style={{ color: "#b5937a", fontSize: p ? 10 : 13, marginTop: 3 }}>{receptionTime}</p>}
            </div>}
            {dressCode && <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 9, letterSpacing: ls("0.4em"), color: "#dc322f", textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginBottom: 6 }}>{t.dressCode}</p>
              <p style={{ color: "#1a1a1a", fontSize: p ? 12 : 16, fontStyle: "italic" }}>{dressCode}</p>
            </div>}
          </div>
        )}

                {/* Hero Photos */}
        {heroImageUrls.length > 0 && (
          <div style={{ padding: p ? "20px 16px" : "32px 48px" }}>
            <PhotoGallery images={heroImageUrls} style={hGS} fillet={hGF} accentColor={accentColor || "#dc322f"} isPreview={isPreview} />
          </div>
        )}

        {/* Families */}
        {(brideFamily?.fatherName || groomFamily?.fatherName) && (
          <div style={{ background: "#f5f0ea", padding: p ? "24px 20px" : "48px 48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: p ? 16 : 28 }}>
              <div style={{ height: 1, flex: 1, background: "#e0d4c0" }} />
              <span style={{ color: "#dc322f", fontSize: p ? 14 : 20 }}>🌸</span>
              <div style={{ height: 1, flex: 1, background: "#e0d4c0" }} />
            </div>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, color: "#b5937a", textAlign: "center", marginBottom: p ? 14 : 24, fontFamily: "'Lato',sans-serif" }}>With Family Blessings</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[{ label: t.bridesFamily, fam: brideFamily, imgs: brideFamilyImageUrls, gs: bGS, gf: bGF }, { label: t.groomsFamily, fam: groomFamily, imgs: groomFamilyImageUrls, gs: gGS, gf: gGF }].map(({ label, fam, imgs, gs, gf }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "#dc322f", textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginBottom: 8 }}>{label}</p>
                  {fam?.fatherName && <p style={{ color: "#1a1a1a", fontSize: p ? 11 : 15, fontStyle: "italic", marginBottom: 3 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#6b5040", fontSize: p ? 10 : 13, marginBottom: 6 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: "#b5937a", fontSize: p ? 9 : 12 }}>{m.name} · {m.relation}</p>)}
                {imgs.length > 0 && <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden" }}><PhotoGallery images={imgs} style={gs} fillet={gf} accentColor={accentColor || "#dc322f"} isPreview={isPreview} /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story */}
        {story && (
          <div style={{ padding: p ? "24px 20px" : "56px 64px", textAlign: "center", background: "#fdfaf6" }}>
            <div style={{ width: 2, height: p ? 24 : 40, background: "#dc322f", margin: "0 auto 16px", opacity: 0.5 }} />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#4a3728", fontStyle: "italic", fontSize: p ? 12 : 18, lineHeight: 1.9 }}>{story}</p>
            {storyImageUrls.length > 0 && (
              <div style={{ marginTop: 24, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={accentColor || "#dc322f"} isPreview={isPreview} />
              </div>
            )}
            <div style={{ width: 2, height: p ? 24 : 40, background: "#dc322f", margin: "16px auto 0", opacity: 0.5 }} />
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline) && (
          <div style={{ background: "#1a1a1a", padding: p ? "20px" : "36px 48px", textAlign: "center" }}>
            <p style={{ fontSize: 9, letterSpacing: ls("0.5em"), color: "#dc322f", textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginBottom: 12 }}>RSVP</p>
            {rsvpDeadline && <p style={{ color: "#f0ede8", fontSize: p ? 11 : 15, fontStyle: "italic", marginBottom: 4 }}>Please reply by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: "#888", fontSize: p ? 10 : 13 }}>{rsvpContact}</p>}
          </div>
        )}

        {/* Footer */}
        <div style={{ background: "#fdfaf6", padding: p ? "24px 20px" : "48px", textAlign: "center", borderTop: "3px solid #dc322f" }}>
          <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: p ? 32 : 56, color: "#1a1a1a" }}>{brideName || "Bride"} &amp; {groomName || "Groom"}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 14, opacity: 0.4 }}>🌸</span>
            <div style={{ height: 1, width: 48, background: "#dc322f", opacity: 0.3 }} />
            <span style={{ fontSize: 10, color: "#dc322f", letterSpacing: ls("0.4em"), fontFamily: "'Lato',sans-serif" }}>永遠に</span>
            <div style={{ height: 1, width: 48, background: "#dc322f", opacity: 0.3 }} />
            <span style={{ fontSize: 14, opacity: 0.4 }}>🌸</span>
          </div>
        </div>
      </div>
    </div>
  );
}
