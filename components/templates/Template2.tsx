"use client";
import ImageSlideshow from "@/components/ImageSlideshow";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import GalleryDisplay from "@/components/GalleryDisplay";
import { TemplateProps } from "@/lib/types";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState, useEffect, useRef } from "react";
import BrandFooter from "@/components/BrandFooter";

export default function Template2({ invitation, isPreview }: TemplateProps) {
  const { brideName, groomName, brideAbout, groomAbout, date, time, venue, venueAddress, receptionVenue, receptionTime, dressCode, rsvpContact, rsvpDeadline, rsvpWhatsapp, story, imageUrls, heroImageUrls = [], storyImageUrls = [], brideFamilyImageUrls = [], groomFamilyImageUrls = [], brideFamily, groomFamily, events, coupleHashtag, venueMapUrl, specialNote, fontFamily: invFont, accentColor: invAccent , lang, galleryStyle = "slideshow", galleryFillet = "soft", heroGalleryStyle, heroGalleryFillet, storyGalleryStyle, storyGalleryFillet, brideFamilyGalleryStyle, brideFamilyGalleryFillet, groomFamilyGalleryStyle, groomFamilyGalleryFillet } = invitation;
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const fmt = (d: string) => {
    if (!d) return "";
    try { return new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }); }
    catch { return d; }
  };
  const fmtTime = (t: string) => {
    if (!t) return "";
    try { const [h, m] = t.split(":").map(Number); return `${h % 12 || 12}:${m.toString().padStart(2,"0")} ${h >= 12 ? "PM" : "AM"}`; }
    catch { return t; }
  };

  useEffect(() => {
    if (!date || isPreview) return;
    const target = new Date(date + "T" + (time || "00:00") + ":00");
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setCountdown({ days: Math.floor(diff/86400000), hours: Math.floor((diff%86400000)/3600000), minutes: Math.floor((diff%3600000)/60000), seconds: Math.floor((diff%60000)/1000) });
    };
    tick(); const t = setInterval(tick, 1000); return () => clearInterval(t);
  }, [date, time, isPreview]);

  const pink = "#c17b7b";
  const deepRose = invAccent || "#8b3a52";
  const scriptFont = invFont ? `'${invFont}',cursive,serif` : "'Great Vibes',cursive";
  const lightPink = "#fff0f0";
  const softPink = "#fce8e8";

  return (
    <div className={isPreview ? "pointer-events-none" : ""}>
      <div style={{ width: isPreview ? "390px" : "100%", fontFamily: "'Lato',sans-serif", background: "#fff8f6" }}>

        {/* HERO */}
        <div style={{ background: `linear-gradient(135deg,#f9e4e4,#fce8e8 50%,#f9d6d6)`, padding: isPreview ? "64px 24px 48px" : "110px 40px 80px", textAlign: "center", position: "relative", overflow: "hidden", minHeight: isPreview ? 460 : "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", top: -30, left: -30, fontSize: 120, opacity: 0.1 }}>🌸</div>
          <div style={{ position: "absolute", top: -30, right: -30, fontSize: 120, opacity: 0.1, transform: "scaleX(-1)" }}>🌸</div>
          <div style={{ position: "absolute", bottom: -20, left: -10, fontSize: 90, opacity: 0.08 }}>🌺</div>
          <div style={{ position: "absolute", bottom: -20, right: -10, fontSize: 90, opacity: 0.08, transform: "scaleX(-1)" }}>🌺</div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: isPreview ? 20 : 32 }}>
              <div style={{ height: 1, width: 50, background: pink, opacity: 0.4 }} />
              <span style={{ color: pink, fontSize: 11, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", fontWeight: 300 }}>You are invited</span>
              <div style={{ height: 1, width: 50, background: pink, opacity: 0.4 }} />
            </div>
            <h1 className="reveal" style={{ fontFamily: scriptFont, fontSize: isPreview ? 58 : 108, color: deepRose, lineHeight: 1, margin: 0, textShadow: "0 4px 20px rgba(139,58,82,0.15)" }}>{brideName || "Bride"}</h1>
            <p style={{ fontSize: isPreview ? 20 : 34, color: pink, fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", margin: isPreview ? "6px 0" : "12px 0" }}>and</p>
            <h1 className="reveal" style={{ fontFamily: scriptFont, fontSize: isPreview ? 58 : 108, color: deepRose, lineHeight: 1, margin: 0, textShadow: "0 4px 20px rgba(139,58,82,0.15)" }}>{groomName || "Groom"}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: isPreview ? 20 : 32 }}>
              <div style={{ height: 1, width: 60, background: pink, opacity: 0.4 }} />
              <span style={{ fontSize: isPreview ? 18 : 28 }}>💕</span>
              <div style={{ height: 1, width: 60, background: pink, opacity: 0.4 }} />
            </div>
          </div>
        </div>

        {/* HERO IMAGES */}
        {heroImageUrls.length > 0 && (
          <div style={{ background: "#f9d6d6" }}>
            <ImageSlideshow urls={heroImageUrls} aspectRatio={isPreview ? "4/3" : "16/9"} autoplayMs={5000} isPreview={isPreview} showArrows showDots overlayGradient="linear-gradient(to bottom,transparent 60%,rgba(249,212,212,0.5) 100%)" borderRadius={0} />
          </div>
        )}

        {/* COUNTDOWN */}
        {!isPreview && date && countdown.days >= 0 && (
          <div style={{ background: deepRose, padding: "20px", textAlign: "center" }}>
            <p style={{ color: "#fce8e8", fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 12 }}>Until the Big Day</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
              {[["days", countdown.days], ["hours", countdown.hours], ["mins", countdown.minutes], ["secs", countdown.seconds]].map(([label, val]) => (
                <div key={label as string} style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, color: "#fff", lineHeight: 1 }}>{String(val).padStart(2,"0")}</p>
                  <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, color: "rgba(255,255,255,0.6)", fontFamily: "'Montserrat',sans-serif", marginTop: 4 }}>{label as string}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DATE CARD */}
        <div style={{ padding: isPreview ? "32px 20px" : "52px 40px" }}>
          <div style={{ background: "white", border: `2px solid #f0c8c8`, padding: isPreview ? "28px 20px" : "48px 32px", textAlign: "center", position: "relative", boxShadow: "0 8px 40px rgba(193,123,123,0.12)" }}>
            {["top:-14px;left:-14px", "top:-14px;right:-14px", "bottom:-14px;left:-14px", "bottom:-14px;right:-14px"].map((pos, i) => (
              <div key={i} style={{ position: "absolute", ...(Object.fromEntries(pos.split(";").map(p => { const [k,v] = p.split(":"); return [k, v]; }))) as React.CSSProperties, fontSize: isPreview ? 18 : 24 }}>🌹</div>
            ))}
            <p style={{ color: pink, fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: isPreview ? 12 : 20 }}>Wedding Day</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#4a1a2a", fontSize: isPreview ? 16 : 28, marginBottom: 6, fontWeight: 400 }}>{fmt(date) || "Wedding Date"}</h2>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#8b5563", fontStyle: "italic", fontSize: isPreview ? 14 : 22, marginBottom: isPreview ? 14 : 24 }}>{fmtTime(time) || "Time TBD"}</p>
            <div style={{ height: 1, background: `linear-gradient(90deg,transparent,#f0c8c8,transparent)`, margin: isPreview ? "12px 0" : "20px 0" }} />
            <h3 style={{ fontFamily: "'Playfair Display',serif", color: "#4a1a2a", fontSize: isPreview ? 14 : 22, marginBottom: 4, fontWeight: 400 }}>{venue || "Venue Name"}</h3>
            {venueAddress && <p style={{ color: "#9a7080", fontSize: isPreview ? 11 : 14, fontStyle: "italic", marginBottom: 8 }}>{venueAddress}</p>}
            {venueMapUrl && !isPreview && (
              <a href={venueMapUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 10, padding: "8px 20px", background: deepRose, color: "#fff", fontSize: 11, textDecoration: "none", borderRadius: 2, letterSpacing: ls("0.1em") }}>📍 Get Directions</a>
            )}
            {receptionVenue && (
              <div style={{ marginTop: isPreview ? 14 : 24, paddingTop: isPreview ? 14 : 20, borderTop: "1px solid #f0c8c8" }}>
                <p style={{ color: pink, fontSize: 9, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif" }}>{t.reception}</p>
                <p style={{ color: "#4a1a2a", fontSize: isPreview ? 13 : 18, fontFamily: "'Playfair Display',serif", marginTop: 4 }}>{receptionVenue}</p>
                {receptionTime && <p style={{ color: "#9a7080", fontSize: isPreview ? 11 : 13, marginTop: 3 }}>{fmtTime(receptionTime)}</p>}
              </div>
            )}
            {dressCode && <p style={{ color: pink, fontSize: isPreview ? 10 : 13, marginTop: isPreview ? 12 : 18, fontStyle: "italic" }}>🌸 {t.dressCode}: {dressCode}</p>}
          </div>
        </div>

        {/* PRE-WEDDING EVENTS */}
        {events && events.length > 0 && (
          <div style={{ background: softPink, padding: isPreview ? "28px 20px" : "52px 40px" }}>
            <p style={{ color: pink, fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", textAlign: "center", marginBottom: isPreview ? 20 : 32 }}>Celebrations</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isPreview ? 10 : 16 }}>
              {events.map((ev, i) => (
                <div key={i} style={{ background: "white", padding: isPreview ? "14px" : "20px", borderRadius: 12, border: "1px solid #f0c8c8", textAlign: "center" }}>
                  <p style={{ fontSize: isPreview ? 18 : 28, marginBottom: 6 }}>
                    {["💃","🎵","🌿","🎺","💐","🎊"][i % 6]}
                  </p>
                  <h4 style={{ color: deepRose, fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 12 : 17, fontWeight: 400, margin: "0 0 6px" }}>{ev.name}</h4>
                  {ev.date && <p style={{ color: pink, fontSize: isPreview ? 9 : 12, fontFamily: "'Montserrat',sans-serif" }}>{new Date(ev.date + "T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</p>}
                  {ev.time && <p style={{ color: "#9a7080", fontSize: isPreview ? 9 : 12 }}>{fmtTime(ev.time)}</p>}
                  {ev.venue && <p style={{ color: "#9a7080", fontSize: isPreview ? 9 : 12, fontStyle: "italic", marginTop: 4 }}>{ev.venue}</p>}
                  {ev.description && <p style={{ color: "#b08090", fontSize: isPreview ? 8 : 11, marginTop: 4, lineHeight: 1.5 }}>{ev.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAROUSEL — round portrait */}
        {imageUrls && imageUrls.length > 0 && (
          <div style={{ background: softPink, padding: isPreview ? "28px 0 20px" : "48px 0 32px" }}>
            <p style={{ color: pink, fontSize: 9, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", textAlign: "center", marginBottom: 20 }}>Our Moments</p>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: "50%", width: isPreview ? 200 : 320, height: isPreview ? 200 : 320, margin: "0 auto", border: "8px solid white", boxShadow: "0 12px 48px rgba(193,123,123,0.3)" }}>
              {imageUrls.map((url, i) => (
                <img key={i} src={url} alt={`Photo ${i+1}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === activeSlide ? 1 : 0, transitionProperty: "opacity", transitionDuration: "0.5s", transitionTimingFunction: "ease" }} />
              ))}
            </div>
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
                {imageUrls.map((_, i) => (
                  <button key={i} onClick={() => !isPreview && setActiveSlide(i)} style={{ width: i === activeSlide ? 24 : 8, height: 8, borderRadius: 4, background: i === activeSlide ? pink : "rgba(193,123,123,0.25)", border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* COUPLE BIOS */}
        {(brideAbout || groomAbout) && (
          <div style={{ background: "white", padding: isPreview ? "28px 20px" : "52px 40px" }}>
            <p style={{ color: pink, fontSize: 9, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", textAlign: "center", marginBottom: isPreview ? 16 : 28 }}>Meet the Couple</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isPreview ? 12 : 24 }}>
              {brideAbout && (
                <div style={{ background: lightPink, padding: isPreview ? 14 : 20, borderRadius: 16, textAlign: "center" }}>
                  <h3 style={{ fontFamily: scriptFont, fontSize: isPreview ? 24 : 38, color: deepRose, marginBottom: 8 }}>{brideName || "Bride"}</h3>
                  <p style={{ color: "#6b3a4a", fontSize: isPreview ? 10 : 14, lineHeight: 1.7, fontStyle: "italic" }}>{brideAbout}</p>
                </div>
              )}
              {groomAbout && (
                <div style={{ background: lightPink, padding: isPreview ? 14 : 20, borderRadius: 16, textAlign: "center" }}>
                  <h3 style={{ fontFamily: scriptFont, fontSize: isPreview ? 24 : 38, color: deepRose, marginBottom: 8 }}>{groomName || "Groom"}</h3>
                  <p style={{ color: "#6b3a4a", fontSize: isPreview ? 10 : 14, lineHeight: 1.7, fontStyle: "italic" }}>{groomAbout}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAMILIES with photos */}
        {(brideFamily?.fatherName || groomFamily?.fatherName || brideFamilyImageUrls.length > 0 || groomFamilyImageUrls.length > 0) && (
          <div style={{ padding: isPreview ? "28px 20px" : "52px 40px", background: "white" }}>
            <p style={{ color: pink, fontSize: 9, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", textAlign: "center", marginBottom: isPreview ? 20 : 32 }}>Our Families</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isPreview ? 12 : 24 }}>
              {[
                { label: t.bridesFamily, fam: brideFamily, imgs: brideFamilyImageUrls },
                { label: t.groomsFamily, fam: groomFamily, imgs: groomFamilyImageUrls },
              ].map(({ label, fam, imgs }) => (
                <div key={label} style={{ textAlign: "center", padding: isPreview ? 14 : 20, background: lightPink, borderRadius: 12, border: "1px solid #f0c8c8" }}>
                  <p style={{ color: pink, fontSize: 9, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: 10 }}>{label}</p>
                  {imgs.length > 0 && (
                    <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
                      <ImageSlideshow urls={imgs} aspectRatio="4/3" autoplayMs={5000} isPreview={isPreview} showArrows={false} showDots={imgs.length > 1} borderRadius={10} />
                    </div>
                  )}
                  {fam?.fatherName && <p style={{ color: "#4a1a2a", fontSize: isPreview ? 12 : 16, marginBottom: 3, fontFamily: "'Playfair Display',serif" }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#8b5563", fontSize: isPreview ? 11 : 14, marginBottom: 8 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: pink, fontSize: isPreview ? 10 : 12 }}>{m.name} <span style={{ opacity: 0.7 }}>· {m.relation}</span></p>)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STORY with images */}
        {(story || storyImageUrls.length > 0) && (
          <div style={{ padding: isPreview ? "32px 20px" : "60px 48px", textAlign: "center", background: softPink }}>
            <p style={{ color: pink, fontSize: 9, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: isPreview ? 12 : 20 }}>Our Love Story</p>
            {storyImageUrls.length > 0 && (
              <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: isPreview ? 14 : 24, boxShadow: "0 8px 32px rgba(193,123,123,0.2)" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={ invAccent || "#c9a84c"} isPreview={isPreview} />
              </div>
            )}
            {story && (
              <>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: isPreview ? 12 : 20 }}>🌸💕🌸</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#6b3a4a", fontStyle: "italic", fontSize: isPreview ? 13 : 20, lineHeight: 1.9 }}>{story}</p>
              </>
            )}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline || rsvpWhatsapp) && (
          <div style={{ background: "white", padding: isPreview ? "28px 20px" : "52px 40px", textAlign: "center" }}>
            <p style={{ color: pink, fontSize: 9, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginBottom: isPreview ? 12 : 20 }}>RSVP</p>
            {rsvpDeadline && <p style={{ color: "#4a1a2a", fontSize: isPreview ? 13 : 17, fontFamily: "'Playfair Display',serif", marginBottom: 8 }}>Please respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: "#8b5563", fontSize: isPreview ? 12 : 16, fontStyle: "italic" }}>{rsvpContact}</p>}
            {rsvpWhatsapp && !isPreview && (
              <a href={`https://wa.me/${rsvpWhatsapp}?text=Hi! I'd like to RSVP for ${brideName} & ${groomName}'s wedding`} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, padding: "12px 28px", background: "#25D366", color: "#fff", textDecoration: "none", borderRadius: 24, fontFamily: "'Montserrat',sans-serif", fontSize: 13 }}>
                💬 {t.rsvpOnWhatsapp}
              </a>
            )}
          </div>
        )}

        {/* SPECIAL NOTE */}
        {specialNote && (
          <div style={{ background: lightPink, padding: isPreview ? "20px" : "36px 40px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: deepRose, fontStyle: "italic", fontSize: isPreview ? 12 : 18, lineHeight: 1.8 }}>&ldquo;{specialNote}&rdquo;</p>
          </div>
        )}

        {/* HASHTAG */}
        {coupleHashtag && (
          <div style={{ background: deepRose, padding: isPreview ? "14px" : "22px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: isPreview ? 14 : 22 }}>{coupleHashtag}</p>
          </div>
        )}

        {/* FOOTER */}
        <div style={{ background: `linear-gradient(135deg,#f9d6d6,#fce8e8)`, padding: isPreview ? "36px 20px" : "64px 40px", textAlign: "center" }}>
          <p style={{ fontFamily: scriptFont, fontSize: isPreview ? 38 : 68, color: deepRose }}>{brideName || "Bride"} &amp; {groomName || "Groom"}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10, fontSize: isPreview ? 16 : 24 }}>🌸💕🌸</div>
          <p style={{ color: "#c17b7b", fontSize: isPreview ? 9 : 12, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginTop: 10 }}>{fmt(date)}</p>
        </div>
        <BrandFooter isPreview={isPreview} bgColor="#fdf0f0" textColor="rgba(139,58,82,0.5)" accentColor={deepRose} />
      </div>
    </div>
  );
}
