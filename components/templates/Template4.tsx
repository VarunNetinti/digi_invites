"use client";
import ImageSlideshow from "@/components/ImageSlideshow";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import GalleryDisplay from "@/components/GalleryDisplay";
import { TemplateProps } from "@/lib/types";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState, useEffect, useRef } from "react";
import BrandFooter from "@/components/BrandFooter";

export default function Template4({ invitation, isPreview }: TemplateProps) {
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

  const fmt = (d: string) => { if (!d) return ""; try { return new Date(d+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}); } catch { return d; } };
  const fmtTime = (t: string) => { if (!t) return ""; try { const [h,m] = t.split(":").map(Number); return `${h%12||12}:${m.toString().padStart(2,"0")} ${h>=12?"PM":"AM"}`; } catch { return t; } };

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

  // ── Wire scroll reveals ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale")
      .forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);


  const sage = invAccent || "#4a5e3a";
  const lightSage = "#c8d8a0";
  const scriptFont = invFont ? `'${invFont}',cursive,serif` : "'Great Vibes',cursive";
  const warmCream = "#f5e6c8";
  const earthBrown = "#3d2b10";

  const leafDivider = (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 auto" }}>
      <div style={{ flex: 1, height: 1, background: "#c8b89a" }} />
      <span style={{ fontSize: 14 }}>🌿</span>
      <div style={{ flex: 1, height: 1, background: "#c8b89a" }} />
    </div>
  );

  return (
    <div className={isPreview ? "pointer-events-none" : ""}>
      <div style={{ width: isPreview ? "390px" : "100%", fontFamily: "'Lato',sans-serif", background: "#f5f0e8" }}>

        {/* HERO */}
        <div style={{ background: `linear-gradient(160deg,#3d4e30,${sage},#2e4020)`, padding: isPreview ? "64px 24px 48px" : "110px 40px 80px", textAlign: "center", position: "relative", overflow: "hidden", minHeight: isPreview ? 460 : "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", top: 12, left: 12, fontSize: isPreview ? 44 : 80, opacity: 0.18, transform: "rotate(-20deg)" }}>🌾</div>
          <div style={{ position: "absolute", top: 12, right: 12, fontSize: isPreview ? 44 : 80, opacity: 0.18, transform: "rotate(20deg) scaleX(-1)" }}>🌾</div>
          <div style={{ position: "absolute", bottom: 16, left: 16, fontSize: isPreview ? 36 : 64, opacity: 0.14 }}>🍃</div>
          <div style={{ position: "absolute", bottom: 16, right: 16, fontSize: isPreview ? 36 : 64, opacity: 0.14, transform: "scaleX(-1)" }}>🍃</div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ color: lightSage, fontSize: isPreview ? 8 : 11, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, marginBottom: isPreview ? 20 : 36, fontWeight: 300 }}>Join us to celebrate</p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 42 : 80, color: "#ffffff", fontStyle: "italic", lineHeight: 1.1, margin: "0 0 8px", textShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>{brideName || "Bride"}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: isPreview ? "10px 0" : "16px 0" }}>
              <div style={{ height: 1, width: 48, background: "rgba(255,255,255,0.3)" }} />
              <span style={{ fontSize: isPreview ? 18 : 28 }}>🌿</span>
              <div style={{ height: 1, width: 48, background: "rgba(255,255,255,0.3)" }} />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 42 : 80, color: "#ffffff", fontStyle: "italic", lineHeight: 1.1, margin: 0, textShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>{groomName || "Groom"}</h1>
          </div>
        </div>


        {/* HERO IMAGES */}
        {heroImageUrls.length > 0 && (
          <div>
            <ImageSlideshow urls={heroImageUrls} aspectRatio={isPreview ? "4/3" : "16/9"} autoplayMs={5000} isPreview={isPreview} showArrows showDots />
          </div>
        )}

        {/* COUNTDOWN */}
        {!isPreview && date && countdown.days >= 0 && (
          <div style={{ background: sage, padding: "20px", textAlign: "center" }}>
            <p style={{ color: lightSage, fontSize: 9, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, marginBottom: 12 }}>Days Until Forever</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
              {[["days", countdown.days], ["hours", countdown.hours], ["mins", countdown.minutes], ["secs", countdown.seconds]].map(([label, val]) => (
                <div key={label as string} style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: "#fff", lineHeight: 1, fontWeight: 300 }}>{String(val).padStart(2,"0")}</p>
                  <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: "rgba(200,216,160,0.7)", textTransform: tt("uppercase") as any, marginTop: 4 }}>{label as string}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DATE PLANK */}
        <div style={{ padding: isPreview ? "28px 16px" : "0 28px", marginTop: isPreview ? 0 : -24, position: "relative", zIndex: 2 }}>
          <div style={{ background: `linear-gradient(135deg,${warmCream},#ede0bb,${warmCream})`, border: "2px solid #8b6914", padding: isPreview ? "20px 18px" : "40px 32px", textAlign: "center", boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}>
            <p style={{ color: "#7a5c2e", fontSize: 8, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, marginBottom: isPreview ? 8 : 14 }}>Wedding Day</p>
            <p style={{ fontFamily: "'Playfair Display',serif", color: earthBrown, fontSize: isPreview ? 14 : 24, marginBottom: 4 }}>{fmt(date) || "Wedding Date"}</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#6b4c1e", fontStyle: "italic", fontSize: isPreview ? 13 : 20, marginBottom: isPreview ? 12 : 20 }}>{fmtTime(time) || "Time TBD"}</p>
            <div style={{ height: 1, background: "rgba(139,105,20,0.25)", margin: isPreview ? "12px 0" : "20px 0" }} />
            <p style={{ fontFamily: "'Playfair Display',serif", color: earthBrown, fontSize: isPreview ? 13 : 22, marginBottom: 4 }}>{venue || "Venue Name"}</p>
            {venueAddress && <p style={{ color: "#7a5c2e", fontSize: isPreview ? 10 : 14, fontStyle: "italic", marginBottom: 8 }}>{venueAddress}</p>}
            {venueMapUrl && !isPreview && (
              <a href={venueMapUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 10, padding: "8px 20px", background: sage, color: "#fff", fontSize: 11, textDecoration: "none", letterSpacing: ls("0.1em") }}>📍 Get Directions</a>
            )}
            {receptionVenue && (
              <div style={{ marginTop: isPreview ? 12 : 20, paddingTop: isPreview ? 12 : 16, borderTop: "1px solid rgba(139,105,20,0.2)" }}>
                <p style={{ color: "#7a5c2e", fontSize: 8, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any }}>{t.reception} · {receptionVenue}{receptionTime ? ` · ${fmtTime(receptionTime)}` : ""}</p>
              </div>
            )}
            {dressCode && <p style={{ color: "#8b6914", fontSize: isPreview ? 10 : 13, marginTop: isPreview ? 10 : 16, fontStyle: "italic" }}>{t.dressCode}: {dressCode}</p>}
          </div>
        </div>

        {/* PRE-WEDDING EVENTS */}
        {events && events.length > 0 && (
          <div style={{ padding: isPreview ? "28px 16px" : "52px 28px" }}>
            {leafDivider}
            <p style={{ color: "#7a5c2e", fontSize: 8, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, textAlign: "center", margin: isPreview ? "16px 0 20px" : "28px 0 32px" }}>Celebrations</p>
            <div style={{ display: "flex", flexDirection: "column", gap: isPreview ? 10 : 16 }}>
              {events.map((ev, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: isPreview ? "52px 1fr" : "80px 1fr", gap: isPreview ? 12 : 20, alignItems: "start", background: "#fff", padding: isPreview ? "12px" : "20px", border: "1px solid #d8c89a" }}>
                  <div style={{ textAlign: "center", background: sage, padding: isPreview ? "8px 4px" : "12px 8px" }}>
                    {ev.date && <p style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 18 : 28, lineHeight: 1, fontWeight: 300 }}>{new Date(ev.date+"T00:00:00").getDate()}</p>}
                    {ev.date && <p style={{ color: lightSage, fontSize: 8, letterSpacing: ls("0.2em"), textTransform: tt("uppercase") as any }}>{new Date(ev.date+"T00:00:00").toLocaleDateString("en-US",{month:"short"})}</p>}
                  </div>
                  <div>
                    <h4 style={{ color: earthBrown, fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 12 : 18, fontWeight: 400, margin: "0 0 4px" }}>{ev.name}</h4>
                    <p style={{ color: "#7a5c2e", fontSize: isPreview ? 9 : 13 }}>{ev.venue}{ev.time ? ` · ${fmtTime(ev.time)}` : ""}</p>
                    {ev.description && <p style={{ color: "#9a7c40", fontSize: isPreview ? 9 : 12, marginTop: 4, lineHeight: 1.5, fontStyle: "italic" }}>{ev.description}</p>}
                  </div>
                </div>
              ))}
            </div>
            {leafDivider}
          </div>
        )}

        {/* CAROUSEL */}
        {imageUrls && imageUrls.length > 0 && (
          <div style={{ padding: isPreview ? "20px 16px 12px" : "40px 24px 24px" }}>
            <p style={{ color: "#7a5c2e", fontSize: 8, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, textAlign: "center", marginBottom: 16 }}>Our Memories</p>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.5s", transitionTimingFunction: "ease", transform: `translateX(-${activeSlide * 100}%)` }}>
                {imageUrls.map((url, i) => (
                  <div key={i} style={{ minWidth: "100%", padding: "0 8px", flexShrink: 0 }}>
                    <div style={{ aspectRatio: "4/3", overflow: "hidden", border: "6px solid white", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", outline: "1px solid #c8b89a", transform: i%2===0 ? "rotate(-1deg)" : "rotate(1deg)" }}>
                      <img src={url} alt={`Photo ${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>
                ))}
              </div>
              {imageUrls.length > 1 && !isPreview && (
                <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
                  <button onClick={() => setActiveSlide(p => Math.max(0,p-1))} style={{ background: sage, color: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 16, cursor: "pointer" }}>‹</button>
                  <button onClick={() => setActiveSlide(p => Math.min(imageUrls.length-1,p+1))} style={{ background: sage, color: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 16, cursor: "pointer" }}>›</button>
                </div>
              )}
              {imageUrls.length > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
                  {imageUrls.map((_, i) => <button key={i} onClick={() => !isPreview && setActiveSlide(i)} style={{ width: i===activeSlide ? 20 : 8, height: 8, borderRadius: 4, background: i===activeSlide ? sage : "rgba(74,94,58,0.3)", border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* COUPLE BIOS */}
        {(brideAbout || groomAbout) && (
          <div style={{ background: "#eee5d3", padding: isPreview ? "24px 16px" : "48px 28px" }}>
            {leafDivider}
            <p style={{ color: "#7a5c2e", fontSize: 8, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, textAlign: "center", margin: isPreview ? "14px 0 16px" : "24px 0 28px" }}>The Couple</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isPreview ? 10 : 20 }}>
              {brideAbout && <div style={{ background: "#f5ede0", padding: isPreview ? "14px" : "20px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", color: earthBrown, fontSize: isPreview ? 14 : 22, fontStyle: "italic", marginBottom: 8 }}>{brideName || "Bride"}</p>
                <p style={{ color: "#5c3d1a", fontSize: isPreview ? 10 : 13, lineHeight: 1.7, fontStyle: "italic" }}>{brideAbout}</p>
              </div>}
              {groomAbout && <div style={{ background: "#f5ede0", padding: isPreview ? "14px" : "20px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", color: earthBrown, fontSize: isPreview ? 14 : 22, fontStyle: "italic", marginBottom: 8 }}>{groomName || "Groom"}</p>
                <p style={{ color: "#5c3d1a", fontSize: isPreview ? 10 : 13, lineHeight: 1.7, fontStyle: "italic" }}>{groomAbout}</p>
              </div>}
            </div>
            {leafDivider}
          </div>
        )}

        {/* FAMILIES */}
        {(brideFamily?.fatherName || groomFamily?.fatherName || brideFamilyImageUrls.length > 0 || groomFamilyImageUrls.length > 0) && (
          <div style={{ background: "#eee5d3", padding: isPreview ? "24px 16px" : "48px 28px" }}>
            <p style={{ color: "#7a5c2e", fontSize: 8, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, textAlign: "center", marginBottom: isPreview ? 16 : 24 }}>Our Families</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isPreview ? 10 : 16 }}>
              {[{ label: t.bridesFamily, fam: brideFamily }, { label: t.groomsFamily, fam: groomFamily }].map(({ label, fam }) => (
                <div key={label} style={{ background: "#f5ede0", padding: isPreview ? "12px" : "18px", textAlign: "center" }}>
                  <p style={{ color: "#7a5c2e", fontSize: 8, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, marginBottom: 8 }}>{label}</p>
                  {label.includes("Bride") && brideFamilyImageUrls.length > 0 && (
                    <div style={{ borderRadius: 6, overflow: "hidden", marginBottom: 10 }}>
                      <ImageSlideshow urls={brideFamilyImageUrls} aspectRatio="4/3" autoplayMs={5000} isPreview={isPreview} showArrows={false} showDots={brideFamilyImageUrls.length > 1} />
                    </div>
                  )}
                  {label.includes("Groom") && groomFamilyImageUrls.length > 0 && (
                    <div style={{ borderRadius: 6, overflow: "hidden", marginBottom: 10 }}>
                      <ImageSlideshow urls={groomFamilyImageUrls} aspectRatio="4/3" autoplayMs={5000} isPreview={isPreview} showArrows={false} showDots={groomFamilyImageUrls.length > 1} />
                    </div>
                  )}
                  {fam?.fatherName && <p style={{ color: earthBrown, fontSize: isPreview ? 11 : 16, marginBottom: 3 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#6b4c1e", fontSize: isPreview ? 10 : 14, marginBottom: 6 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: "#8b6914", fontSize: isPreview ? 9 : 12 }}>{m.name} · {m.relation}</p>)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STORY with images */}
        {(story || storyImageUrls.length > 0) && (
          <div style={{ padding: isPreview ? "24px 16px" : "52px 36px", textAlign: "center" }}>
            {leafDivider}
            <p style={{ color: "#7a5c2e", fontSize: 8, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, margin: isPreview ? "14px 0 12px" : "24px 0 20px" }}>{t.ourStory}</p>
{storyImageUrls.length > 0 && (
              <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: isPreview ? 12 : 22 }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={invAccent || "#c9a84c"} isPreview={isPreview} />
              </div>
            )}
            {story &&             <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#5c3d1a", fontStyle: "italic", fontSize: isPreview ? 13 : 20, lineHeight: 1.9 }}>{story}</p>}
            {leafDivider}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline || rsvpWhatsapp) && (
          <div style={{ background: "#eee5d3", padding: isPreview ? "20px 16px" : "40px 28px", textAlign: "center" }}>
            <p style={{ color: "#7a5c2e", fontSize: 8, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, marginBottom: isPreview ? 10 : 18 }}>RSVP</p>
            {rsvpDeadline && <p style={{ color: earthBrown, fontSize: isPreview ? 12 : 17, fontFamily: "'Playfair Display',serif", marginBottom: 6 }}>Kindly respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: "#6b4c1e", fontSize: isPreview ? 11 : 15, fontStyle: "italic" }}>{rsvpContact}</p>}
            {rsvpWhatsapp && !isPreview && (
              <a href={`https://wa.me/${rsvpWhatsapp}?text=Hi! RSVP for ${brideName} & ${groomName}'s wedding`} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, padding: "10px 24px", background: "#25D366", color: "#fff", textDecoration: "none", fontSize: 13 }}>
                💬 {t.rsvpOnWhatsapp}
              </a>
            )}
          </div>
        )}

        {/* SPECIAL NOTE */}
        {specialNote && (
          <div style={{ padding: isPreview ? "16px" : "28px 36px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#5c3d1a", fontStyle: "italic", fontSize: isPreview ? 12 : 17, lineHeight: 1.8 }}>&ldquo;{specialNote}&rdquo;</p>
          </div>
        )}

        {/* HASHTAG */}
        {coupleHashtag && (
          <div style={{ background: sage, padding: isPreview ? "12px" : "18px", textAlign: "center" }}>
            <p style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 13 : 20 }}>{coupleHashtag}</p>
          </div>
        )}

        {/* FOOTER */}
        <div style={{ background: sage, padding: isPreview ? "28px 20px" : "52px 40px", textAlign: "center" }}>
          <p style={{ fontFamily: scriptFont, fontSize: isPreview ? 36 : 64, color: "#ffffff" }}>{brideName || "Bride"} &amp; {groomName || "Groom"}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10, fontSize: isPreview ? 14 : 22 }}>🌿💚🌿</div>
          <p style={{ color: lightSage, fontSize: isPreview ? 8 : 11, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, marginTop: 10 }}>{fmt(date)}</p>
        </div>
        <BrandFooter isPreview={isPreview} bgColor="#2e3d22" textColor="rgba(200,216,160,0.55)" accentColor={lightSage} />
      </div>
    </div>
  );
}
