"use client";
import ImageSlideshow from "@/components/ImageSlideshow";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import GalleryDisplay from "@/components/GalleryDisplay";
import { TemplateProps } from "@/lib/types";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState, useEffect, useRef } from "react";
import BrandFooter from "@/components/BrandFooter";

export default function Template5({ invitation, isPreview }: TemplateProps) {
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

  const navy = "#0d1b3e";
  const gold = invAccent || "#c9a84c";
  const lightGold = "#e8d5a3";
  const slate = "#8899bb";
  const deepBlue = "#667799";
  const scriptFont = invFont ? `'${invFont}',cursive,serif` : "'Great Vibes',cursive";

  const decoDivider = (
    <svg viewBox="0 0 400 32" style={{ width: "100%", display: "block" }}>
      <line x1="0" y1="16" x2="140" y2="16" stroke={gold} strokeWidth="0.6" opacity="0.4"/>
      <polygon points="152,4 168,16 152,28 136,16" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6"/>
      <polygon points="182,2 204,16 182,30 160,16" fill="none" stroke={gold} strokeWidth="1"/>
      <polygon points="216,4 232,16 216,28 200,16" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6"/>
      <line x1="248" y1="16" x2="400" y2="16" stroke={gold} strokeWidth="0.6" opacity="0.4"/>
    </svg>
  );

  return (
    <div className={isPreview ? "pointer-events-none" : ""}>
      <div style={{ width: isPreview ? "390px" : "100%", fontFamily: "'Cormorant Garamond',serif", background: navy }}>

        {/* HERO */}
        <div style={{ minHeight: isPreview ? 500 : "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isPreview ? "64px 24px 48px" : "80px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* Art deco SVG background pattern */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.05 }}>
            <svg width="100%" height="100%">
              <defs>
                <pattern id="ad5" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <polygon points="40,8 72,40 40,72 8,40" fill="none" stroke={gold} strokeWidth="0.8"/>
                  <circle cx="40" cy="40" r="16" fill="none" stroke={gold} strokeWidth="0.4"/>
                  <circle cx="40" cy="40" r="4" fill="none" stroke={gold} strokeWidth="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ad5)"/>
            </svg>
          </div>
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 520 }}>
            {decoDivider}
            <p style={{ color: gold, fontSize: isPreview ? 8 : 11, letterSpacing: ls("0.8em"), textTransform: tt("uppercase") as any, margin: isPreview ? "16px 0 20px" : "24px 0 32px", fontFamily: "'Montserrat',sans-serif" }}>The Marriage of</p>
            <h1 className="reveal" style={{ fontFamily: scriptFont, fontSize: isPreview ? 38 : 80, color: lightGold, fontStyle: "italic", lineHeight: 1.1, textShadow: `0 0 60px rgba(201,168,76,0.35)`, margin: "0 0 8px" }}>{brideName || "Bride"}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, margin: isPreview ? "12px 0" : "20px 0" }}>
              <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg,transparent,${gold})` }} />
              <svg width={isPreview ? 24 : 36} height={isPreview ? 24 : 36} viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.5"/>
                <polygon points="20,3 23,14 34,14 26,21 29,32 20,25 11,32 14,21 6,14 17,14" fill={gold} opacity="0.85"/>
              </svg>
              <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg,${gold},transparent)` }} />
            </div>
            <h1 className="reveal" style={{ fontFamily: scriptFont, fontSize: isPreview ? 38 : 80, color: lightGold, fontStyle: "italic", lineHeight: 1.1, textShadow: `0 0 60px rgba(201,168,76,0.35)`, margin: "0 0 20px" }}>{groomName || "Groom"}</h1>
            {decoDivider}
            <p style={{ color: gold, fontSize: isPreview ? 13 : 20, fontStyle: "italic", marginTop: isPreview ? 16 : 28 }}>{fmt(date) || "Wedding Date"}</p>
            <p style={{ color: slate, fontSize: isPreview ? 10 : 14, letterSpacing: ls("0.2em"), marginTop: 6, fontFamily: "'Montserrat',sans-serif", fontWeight: 300 }}>{fmtTime(time) || "—"} · {venue || "Venue"}</p>
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
          <div style={{ borderTop: `1px solid rgba(201,168,76,0.2)`, borderBottom: `1px solid rgba(201,168,76,0.2)`, padding: "20px", display: "flex", justifyContent: "center", gap: 32 }}>
            {[["days", countdown.days], ["hours", countdown.hours], ["mins", countdown.minutes], ["secs", countdown.seconds]].map(([label, val]) => (
              <div key={label as string} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: lightGold, lineHeight: 1, fontWeight: 300 }}>{String(val).padStart(2,"0")}</p>
                <p style={{ fontSize: 9, letterSpacing: ls("0.3em"), color: slate, textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginTop: 4 }}>{label as string}</p>
              </div>
            ))}
          </div>
        )}

        {/* DETAILS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid rgba(201,168,76,0.15)` }}>
          {[{ l: "Date", v: fmt(date) || "—" }, { l: "Time", v: fmtTime(time) || "—" }, { l: "Venue", v: venue || "—" }].map((item, i) => (
            <div key={i} style={{ padding: isPreview ? "14px 10px" : "28px 20px", borderRight: i < 2 ? `1px solid rgba(201,168,76,0.15)` : "none", textAlign: "center" }}>
              <p style={{ fontSize: 8, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, color: gold, fontFamily: "'Montserrat',sans-serif", marginBottom: 6 }}>{item.l}</p>
              <p style={{ color: lightGold, fontSize: isPreview ? 10 : 14, fontStyle: "italic", fontWeight: 300, lineHeight: 1.4 }}>{item.v}</p>
            </div>
          ))}
        </div>

        {venueAddress && (
          <div style={{ padding: isPreview ? "12px 16px" : "20px 32px", borderTop: `1px solid rgba(201,168,76,0.1)`, textAlign: "center" }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, color: gold, fontFamily: "'Montserrat',sans-serif", marginBottom: 5 }}>Address</p>
            <p style={{ color: slate, fontSize: isPreview ? 10 : 14, fontWeight: 300 }}>{venueAddress}</p>
          </div>
        )}

        {(receptionVenue || dressCode) && (
          <div style={{ display: "grid", gridTemplateColumns: receptionVenue && dressCode ? "1fr 1fr" : "1fr", borderTop: `1px solid rgba(201,168,76,0.12)` }}>
            {receptionVenue && (
              <div style={{ padding: isPreview ? "12px" : "22px 28px", borderRight: dressCode ? `1px solid rgba(201,168,76,0.12)` : "none", textAlign: "center" }}>
                <p style={{ fontSize: 8, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, color: gold, fontFamily: "'Montserrat',sans-serif", marginBottom: 5 }}>{t.reception}</p>
                <p style={{ color: lightGold, fontSize: isPreview ? 10 : 14, fontStyle: "italic" }}>{receptionVenue}</p>
                {receptionTime && <p style={{ color: slate, fontSize: isPreview ? 9 : 12, marginTop: 3 }}>{fmtTime(receptionTime)}</p>}
              </div>
            )}
            {dressCode && (
              <div style={{ padding: isPreview ? "12px" : "22px 28px", textAlign: "center" }}>
                <p style={{ fontSize: 8, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, color: gold, fontFamily: "'Montserrat',sans-serif", marginBottom: 5 }}>{t.dressCode}</p>
                <p style={{ color: lightGold, fontSize: isPreview ? 10 : 14, fontStyle: "italic" }}>{dressCode}</p>
              </div>
            )}
          </div>
        )}

        {venueMapUrl && !isPreview && (
          <div style={{ padding: "14px 24px", borderTop: `1px solid rgba(201,168,76,0.1)`, textAlign: "center" }}>
            <a href={venueMapUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: gold, textDecoration: "none", fontSize: 12, letterSpacing: ls("0.15em"), fontFamily: "'Montserrat',sans-serif" }}>📍 Get Directions</a>
          </div>
        )}

        {/* PRE-WEDDING EVENTS */}
        {events && events.length > 0 && (
          <div style={{ borderTop: `1px solid rgba(201,168,76,0.2)`, padding: isPreview ? "24px 16px" : "52px 32px" }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: gold, textAlign: "center", marginBottom: isPreview ? 18 : 32, fontFamily: "'Montserrat',sans-serif" }}>Celebrations</p>
            <div style={{ display: "flex", flexDirection: "column", gap: isPreview ? 1 : 1 }}>
              {events.map((ev, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: isPreview ? "52px 1fr" : "88px 1fr", borderTop: i===0 ? `1px solid rgba(201,168,76,0.15)` : "none", borderBottom: `1px solid rgba(201,168,76,0.12)`, padding: isPreview ? "12px" : "20px 24px", gap: isPreview ? 12 : 24, alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    {ev.date ? <>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 22 : 36, color: lightGold, lineHeight: 1, fontWeight: 300 }}>{new Date(ev.date+"T00:00:00").getDate()}</p>
                      <p style={{ fontSize: 8, letterSpacing: ls("0.3em"), color: gold, textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif" }}>{new Date(ev.date+"T00:00:00").toLocaleDateString("en-US",{month:"short"})}</p>
                    </> : <span style={{ color: gold, fontSize: 20 }}>◇</span>}
                  </div>
                  <div>
                    <h4 style={{ color: lightGold, fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 12 : 18, fontWeight: 400, margin: "0 0 4px", fontStyle: "italic" }}>{ev.name}</h4>
                    <p style={{ color: slate, fontSize: isPreview ? 9 : 13, fontFamily: "'Montserrat',sans-serif", fontWeight: 300 }}>{ev.venue}{ev.time ? ` · ${fmtTime(ev.time)}` : ""}</p>
                    {ev.description && <p style={{ color: deepBlue, fontSize: isPreview ? 9 : 12, marginTop: 3, fontStyle: "italic" }}>{ev.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CINEMA CAROUSEL */}
        {imageUrls && imageUrls.length > 0 && (
          <div style={{ borderTop: `1px solid rgba(201,168,76,0.2)` }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: gold, textAlign: "center", padding: isPreview ? "18px 0 0" : "28px 0 0", fontFamily: "'Montserrat',sans-serif" }}>Gallery</p>
            <div style={{ position: "relative", overflow: "hidden", marginTop: 16 }}>
              <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.6s", transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)", transform: `translateX(-${activeSlide * 100}%)` }}>
                {imageUrls.map((url, i) => (
                  <div key={i} style={{ minWidth: "100%", aspectRatio: "16/9", flexShrink: 0, position: "relative" }}>
                    <img src={url} alt={`Photo ${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom,transparent 55%,rgba(13,27,62,0.6))` }} />
                    <div style={{ position: "absolute", bottom: 12, right: 16, fontSize: isPreview ? 9 : 11, color: `rgba(201,168,76,0.7)`, fontFamily: "'Montserrat',sans-serif", letterSpacing: ls("0.2em") }}>{i+1} / {imageUrls.length}</div>
                  </div>
                ))}
              </div>
              {imageUrls.length > 1 && !isPreview && (
                <>
                  <button onClick={() => setActiveSlide(p => Math.max(0,p-1))} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: `rgba(13,27,62,0.8)`, color: gold, border: `1px solid rgba(201,168,76,0.3)`, borderRadius: "50%", width: 44, height: 44, fontSize: 18, cursor: "pointer" }}>‹</button>
                  <button onClick={() => setActiveSlide(p => Math.min(imageUrls.length-1,p+1))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: `rgba(13,27,62,0.8)`, color: gold, border: `1px solid rgba(201,168,76,0.3)`, borderRadius: "50%", width: 44, height: 44, fontSize: 18, cursor: "pointer" }}>›</button>
                </>
              )}
            </div>
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "12px 0" }}>
                {imageUrls.map((_, i) => <button key={i} onClick={() => !isPreview && setActiveSlide(i)} style={{ width: i===activeSlide ? 20 : 6, height: 6, borderRadius: 3, background: i===activeSlide ? gold : `rgba(201,168,76,0.2)`, border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
              </div>
            )}
          </div>
        )}

        {/* COUPLE BIOS */}
        {(brideAbout || groomAbout) && (
          <div style={{ borderTop: `1px solid rgba(201,168,76,0.2)`, padding: isPreview ? "24px 16px" : "52px 32px" }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: gold, textAlign: "center", marginBottom: isPreview ? 18 : 28, fontFamily: "'Montserrat',sans-serif" }}>{t.aboutTheCouple}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0 }}>
              {[{ name: brideName, bio: brideAbout, label: "Bride" }, { name: groomName, bio: groomAbout, label: "Groom" }].map(({ name, bio, label }, idx) => bio ? (
                <div key={label} style={{ padding: idx===0 ? `0 ${isPreview?14:24}px 0 0` : `0 0 0 ${isPreview?14:24}px`, textAlign: "center" }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", color: lightGold, fontSize: isPreview ? 14 : 20, fontStyle: "italic", marginBottom: 8 }}>{name || label}</p>
                  <p style={{ color: slate, fontSize: isPreview ? 10 : 13, lineHeight: 1.7, fontWeight: 300, fontStyle: "italic" }}>{bio}</p>
                </div>
              ) : <div key={label} />)}
              <div style={{ background: `rgba(201,168,76,0.15)` }} />
            </div>
          </div>
        )}

        {/* FAMILIES */}
        {(brideFamily?.fatherName || groomFamily?.fatherName || brideFamilyImageUrls.length > 0 || groomFamilyImageUrls.length > 0) && (
          <div style={{ padding: isPreview ? "24px 16px" : "52px 32px", borderTop: `1px solid rgba(201,168,76,0.2)` }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: gold, textAlign: "center", marginBottom: isPreview ? 20 : 32, fontFamily: "'Montserrat',sans-serif" }}>With Blessings of Our Families</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0 }}>
              {[{ label: t.bridesFamily, fam: brideFamily }, { label: t.groomsFamily, fam: groomFamily }].map(({ label, fam }, idx) => (
                <div key={label} style={{ padding: idx===0 ? `0 ${isPreview?14:24}px 0 0` : `0 0 0 ${isPreview?14:24}px`, textAlign: "center" }}>
                  <p style={{ fontSize: 8, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, color: gold, fontFamily: "'Montserrat',sans-serif", marginBottom: 10 }}>{label}</p>
                  {idx === 0 && brideFamilyImageUrls.length > 0 && (
                    <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: isPreview ? 8 : 16, border: `1px solid rgba(201,168,76,0.2)` }}>
                      <ImageSlideshow urls={brideFamilyImageUrls} aspectRatio="4/3" autoplayMs={5000} isPreview={isPreview} showArrows={false} showDots={brideFamilyImageUrls.length > 1} />
                    </div>
                  )}
                  {idx === 1 && groomFamilyImageUrls.length > 0 && (
                    <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: isPreview ? 8 : 16, border: `1px solid rgba(201,168,76,0.2)` }}>
                      <ImageSlideshow urls={groomFamilyImageUrls} aspectRatio="4/3" autoplayMs={5000} isPreview={isPreview} showArrows={false} showDots={groomFamilyImageUrls.length > 1} />
                    </div>
                  )}
                  {fam?.fatherName && <p style={{ color: lightGold, fontSize: isPreview ? 12 : 17, fontStyle: "italic", marginBottom: 4 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: slate, fontSize: isPreview ? 11 : 14, marginBottom: 8 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: deepBlue, fontSize: isPreview ? 10 : 13 }}>{m.name} · {m.relation}</p>)}
                </div>
              ))}
              <div style={{ background: `rgba(201,168,76,0.2)` }} />
            </div>
          </div>
        )}

        {/* STORY with images */}
        {(story || storyImageUrls.length > 0) && (
          <div style={{ padding: isPreview ? "24px 16px" : "56px 40px", borderTop: `1px solid rgba(201,168,76,0.2)`, textAlign: "center" }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: gold, fontFamily: "'Montserrat',sans-serif", marginBottom: isPreview ? 14 : 22 }}>{t.ourStory}</p>
            {decoDivider}
            <p style={{ color: slate, fontStyle: "italic", fontSize: isPreview ? 13 : 20, lineHeight: 1.9, fontWeight: 300, marginTop: isPreview ? 14 : 22 }}>{story}</p>
            {storyImageUrls.length > 0 && (
              <div style={{ marginTop: 24, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={invAccent || "#c9a84c"} isPreview={isPreview} />
              </div>
            )}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline || rsvpWhatsapp) && (
          <div style={{ padding: isPreview ? "20px 16px" : "40px 32px", borderTop: `1px solid rgba(201,168,76,0.2)`, textAlign: "center" }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: gold, fontFamily: "'Montserrat',sans-serif", marginBottom: isPreview ? 12 : 18 }}>RSVP</p>
            {rsvpDeadline && <p style={{ color: lightGold, fontSize: isPreview ? 12 : 17, fontStyle: "italic", marginBottom: 6 }}>Kindly respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: deepBlue, fontSize: isPreview ? 11 : 14, fontFamily: "'Montserrat',sans-serif", fontWeight: 300 }}>{rsvpContact}</p>}
            {rsvpWhatsapp && !isPreview && (
              <a href={`https://wa.me/${rsvpWhatsapp}?text=Hi! RSVP for ${brideName} & ${groomName}'s wedding`} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, padding: "10px 28px", background: "#25D366", color: "#fff", textDecoration: "none", fontSize: 13, fontFamily: "'Montserrat',sans-serif" }}>
                💬 {t.rsvpOnWhatsapp}
              </a>
            )}
          </div>
        )}

        {/* SPECIAL NOTE */}
        {specialNote && (
          <div style={{ borderTop: `1px solid rgba(201,168,76,0.15)`, padding: isPreview ? "16px" : "28px 40px", textAlign: "center" }}>
            <p style={{ color: deepBlue, fontStyle: "italic", fontSize: isPreview ? 11 : 16, lineHeight: 1.8 }}>&ldquo;{specialNote}&rdquo;</p>
          </div>
        )}

        {/* HASHTAG */}
        {coupleHashtag && (
          <div style={{ borderTop: `1px solid rgba(201,168,76,0.15)`, padding: isPreview ? "14px" : "22px", textAlign: "center", background: "rgba(201,168,76,0.06)" }}>
            <p style={{ color: gold, fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 14 : 22, letterSpacing: ls("0.05em") }}>{coupleHashtag}</p>
            <p style={{ color: deepBlue, fontSize: isPreview ? 8 : 11, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, fontFamily: "'Montserrat',sans-serif", marginTop: 4 }}>{t.shareYourMoments}</p>
          </div>
        )}

        {/* FOOTER */}
        <div style={{ padding: isPreview ? "32px 16px" : "56px 40px", borderTop: `1px solid rgba(201,168,76,0.25)`, background: "rgba(0,0,0,0.35)", textAlign: "center" }}>
          <p style={{ fontSize: 8, letterSpacing: ls("0.8em"), textTransform: tt("uppercase") as any, color: gold, fontFamily: "'Montserrat',sans-serif", marginBottom: 12 }}>{(brideName||"BRIDE").toUpperCase()} &amp; {(groomName||"GROOM").toUpperCase()}</p>
          {decoDivider}
          <p style={{ color: slate, fontSize: isPreview ? 10 : 14, fontStyle: "italic", marginTop: 12 }}>{fmt(date) || "Wedding Date"}</p>
        </div>
        <BrandFooter isPreview={isPreview} bgColor="#080e1f" textColor="rgba(136,153,187,0.55)" accentColor={gold} />
      </div>
    </div>
  );
}
