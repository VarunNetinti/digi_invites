"use client";
import { TemplateProps } from "@/lib/types";
import { useState, useEffect, useRef } from "react";
import ImageSlideshow from "@/components/ImageSlideshow";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import GalleryDisplay from "@/components/GalleryDisplay";

/* ── tiny hook — wires up IntersectionObserver on a section div ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    el.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale")
      .forEach(c => io.observe(c));
    return () => io.disconnect();
  }, []);
  return ref;
}

import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";

export default function Template1({ invitation, isPreview }: TemplateProps) {
  const {
    brideName, groomName, brideAbout, groomAbout,
    date, time, venue, venueAddress,
    receptionVenue, receptionTime, dressCode,
    rsvpContact, rsvpDeadline, rsvpWhatsapp,
    story, brideFamily, groomFamily,
    events, coupleHashtag, venueMapUrl, specialNote,
    fontFamily, accentColor, lang,
    heroImageUrls = [], storyImageUrls = [],
    brideFamilyImageUrls = [], groomFamilyImageUrls = [],
    galleryStyle = "slideshow", galleryFillet = "soft",
    heroGalleryStyle, heroGalleryFillet,
    storyGalleryStyle, storyGalleryFillet,
    brideFamilyGalleryStyle, brideFamilyGalleryFillet,
    groomFamilyGalleryStyle, groomFamilyGalleryFillet,
  } = invitation;

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

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [prevSeconds, setPrevSeconds] = useState(0);
  const [flipSecs, setFlipSecs] = useState(false);

  const gold = accentColor || "#c9a84c";
  const cream = "#faf6f0";
  const deepPurple = "#1a0a2e";
  const scriptFont = fontFamily ? `'${fontFamily}',cursive,serif` : "'Great Vibes',cursive";

  // Section refs for scroll reveals
  const heroRef     = useReveal();
  const venueRef    = useReveal();
  const eventsRef   = useReveal();
  const biosRef     = useReveal();
  const familyRef   = useReveal();
  const storyRef    = useReveal();
  const rsvpRef     = useReveal();
  const footerRef   = useReveal();

  const fmt = (d: string) => {
    if (!d) return "";
    try { return new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }); }
    catch { return d; }
  };
  const fmtTime = (t: string) => {
    if (!t) return "";
    try { const [h, m] = t.split(":").map(Number); return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`; }
    catch { return t; }
  };

  useEffect(() => {
    if (!date || isPreview) return;
    const target = new Date(date + "T" + (time || "00:00") + ":00");
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdown({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: secs });
      setPrevSeconds(p => { if (p !== secs) setFlipSecs(f => { setTimeout(() => setFlipSecs(false), 400); return true; }); return secs; });
    };
    tick(); const t = setInterval(tick, 1000); return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time, isPreview]);

  const weddingDate = date ? new Date(date + "T00:00:00") : null;
  const day = weddingDate ? weddingDate.getDate() : "—";
  const monthName = weddingDate ? weddingDate.toLocaleDateString("en-US", { month: "long" }) : "—";
  const year = weddingDate ? weddingDate.getFullYear() : "——";

  const divider = (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 auto", width: "90%" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${gold})` }} />
      <span style={{ color: gold, fontSize: 14, animation: isPreview ? "none" : "heart-pulse 2s ease-in-out infinite" }}>❧</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${gold},transparent)` }} />
    </div>
  );

  /* Countdown box */
  const cdBox = (label: string, val: number, flip?: boolean) => (
    <div style={{ textAlign: "center" }}>
      <div style={{
        background: `rgba(255,255,255,0.08)`, border: `1px solid ${gold}44`,
        borderRadius: 8, padding: isPreview ? "6px 10px" : "12px 18px",
        minWidth: isPreview ? 40 : 64,
        animation: flip && !isPreview ? "digit-flip 0.4s ease" : "none",
      }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 28 : 48, color: gold, lineHeight: 1, fontWeight: 300 }}>{String(val).padStart(2, "0")}</p>
      </div>
      <p style={{ fontSize: isPreview ? 7 : 10, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, color: "#2d1444", fontFamily: "'Lato',sans-serif", marginTop: 6 }}>{label}</p>
    </div>
  );

  return (
    <div className={isPreview ? "pointer-events-none" : ""}>
      <div style={{ width: isPreview ? "390px" : "100%", fontFamily: "'Cormorant Garamond',serif", color: deepPurple }}>

        {/* ══ HERO ══ */}
        <div ref={heroRef} style={{
          background: `linear-gradient(180deg,#0f0520 0%,${deepPurple} 50%,#0f0520 100%)`,
          padding: isPreview ? "60px 28px 48px" : "100px 40px 80px", textAlign: "center",
          position: "relative", overflow: "hidden",
          minHeight: isPreview ? 480 : "100vh",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          {/* Animated dot grid */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(${gold} 1px,transparent 1px)`, backgroundSize: "32px 32px" }} />

          {/* Corner ornaments with twinkle */}
          {["top:20px;left:20px", "top:20px;right:20px;transform:scaleX(-1)", "bottom:20px;left:20px;transform:scaleY(-1)", "bottom:20px;right:20px;transform:scale(-1)"].map((pos, i) => (
            <div key={i} style={{ position: "absolute", ...(Object.fromEntries(pos.split(";").map(p => p.split(":")))) as React.CSSProperties, color: gold, fontSize: isPreview ? 22 : 40, opacity: 0.4, animation: isPreview ? "none" : `twinkle ${2 + i * 0.4}s ease-in-out ${i * 0.6}s infinite` }}>❧</div>
          ))}

          {/* Ambient floating particles behind hero text */}
          {!isPreview && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${10 + i * 14}%`, bottom: `${15 + (i % 3) * 20}%`,
              fontSize: 10 + i * 2, color: gold, opacity: 0.15,
              animation: `float ${3 + i}s ease-in-out ${i * 0.5}s infinite`,
              pointerEvents: "none",
            }}>✦</div>
          ))}

          <p className="reveal" style={{ color: "#e8d5a3", fontSize: isPreview ? 9 : 12, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, marginBottom: isPreview ? 20 : 36, fontFamily: "'Lato',sans-serif", position: "relative", animationDelay: "0.2s" }}>
            {t.togetherWithFamilies}
          </p>

          <h1 className="reveal" style={{
            fontFamily: scriptFont, fontSize: isPreview ? 54 : 96, color: gold, lineHeight: 1, margin: 0,
            textShadow: `0 0 60px ${gold}66`,
            animation: isPreview ? "none" : "name-reveal 1.2s cubic-bezier(0.22,1,0.36,1) 0.4s both, glow-pulse 3s ease-in-out 1.8s infinite",
          }}>{brideName || "Bride"}</h1>

          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, margin: isPreview ? "14px 0" : "20px 0", width: "70%", animationDelay: "0.6s" }}>
            <div style={{ flex: 1, height: 1, background: gold, opacity: 0.4 }} />
            <span style={{ color: "#e8d5a3", fontSize: isPreview ? 22 : 38, fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", animation: isPreview ? "none" : "heart-pulse 2.5s ease-in-out 1s infinite" }}>&amp;</span>
            <div style={{ flex: 1, height: 1, background: gold, opacity: 0.4 }} />
          </div>

          <h1 className="reveal" style={{
            fontFamily: scriptFont, fontSize: isPreview ? 54 : 96, color: gold, lineHeight: 1, margin: 0,
            textShadow: `0 0 60px ${gold}66`,
            animation: isPreview ? "none" : "name-reveal 1.2s cubic-bezier(0.22,1,0.36,1) 0.8s both, glow-pulse 3s ease-in-out 2.2s infinite",
          }}>{groomName || "Groom"}</h1>

          <p className="reveal" style={{ color: "#e8d5a3", fontSize: isPreview ? 9 : 13, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, margin: isPreview ? "20px 0 0" : "32px 0 0", fontFamily: "'Lato',sans-serif", animationDelay: "1s" }}>
            {t.requestPleasure}
          </p>

          {/* Date badge */}
          <div className="reveal" style={{ marginTop: isPreview ? 20 : 40, borderTop: `1px solid ${gold}44`, paddingTop: isPreview ? 18 : 32, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animationDelay: "1.2s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isPreview ? 16 : 32 }}>
              <div style={{ textAlign: "center", animation: isPreview ? "none" : "scale-in 0.8s ease 1.4s both" }}>
                <p style={{ color: gold, fontSize: isPreview ? 36 : 72, lineHeight: 1, fontFamily: "'Playfair Display',serif", fontWeight: 300 }}>{day}</p>
                <p style={{ color: "#e8d5a3", fontSize: isPreview ? 8 : 12, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif" }}>{monthName}</p>
              </div>
              <div style={{ width: 1, height: isPreview ? 50 : 80, background: `${gold}44` }} />
              <div style={{ textAlign: "center", animation: isPreview ? "none" : "scale-in 0.8s ease 1.6s both" }}>
                <p style={{ color: "#e8d5a3", fontSize: isPreview ? 13 : 22, fontStyle: "italic" }}>{fmtTime(time) || "Time TBD"}</p>
                <p style={{ color: gold, fontSize: isPreview ? 10 : 16, letterSpacing: ls("0.2em"), marginTop: 4, fontFamily: "'Lato',sans-serif" }}>{year}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero images */}
        {heroImageUrls.length > 0 && (
          <div style={{ background: deepPurple }}>
            <ImageSlideshow urls={heroImageUrls} aspectRatio={isPreview ? "4/3" : "16/9"} autoplayMs={5000} isPreview={isPreview} overlayGradient={`linear-gradient(to bottom,${deepPurple}44 0%,transparent 20%,transparent 80%,${deepPurple} 100%)`} showArrows showDots />
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: isPreview ? "10px 20px 14px" : "16px 40px 24px" }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${gold})`, opacity: 0.3 }} />
              <span style={{ color: gold, fontSize: 12, opacity: 0.5 }}>✦</span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${gold},transparent)`, opacity: 0.3 }} />
            </div>
          </div>
        )}

        {/* ══ COUNTDOWN ══ */}
        {!isPreview && date && countdown.days >= 0 && (
          <div style={{ background: gold, padding: "28px 20px", textAlign: "center" }}>
            <p style={{ color: deepPurple, fontSize: 9, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginBottom: 18, animation: "fade-in 0.8s ease" }}>{t.countingDownToForever}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: isPreview ? 12 : 20 }}>
              {cdBox("days", countdown.days)}
              {cdBox("hours", countdown.hours)}
              {cdBox("mins", countdown.minutes)}
              {cdBox("secs", countdown.seconds, flipSecs)}
            </div>
          </div>
        )}

        {/* ══ VENUE ══ */}
        <div ref={venueRef} style={{ background: cream, padding: isPreview ? "36px 24px" : "64px 40px", textAlign: "center" }}>
          {divider}
          <p className="reveal" style={{ color: gold, fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", margin: isPreview ? "16px 0 10px" : "28px 0 16px", animationDelay: "0.1s" }}>{t.weddingCeremony}</p>
          <h2 className="reveal" style={{ fontFamily: "'Playfair Display',serif", color: deepPurple, fontSize: isPreview ? 20 : 36, marginBottom: 8, fontWeight: 400, animationDelay: "0.2s" }}>{venue || "Venue Name"}</h2>
          {venueAddress && <p className="reveal" style={{ color: "#7a6652", fontSize: isPreview ? 12 : 16, fontStyle: "italic", marginBottom: 8, animationDelay: "0.3s" }}>{venueAddress}</p>}
          <p className="reveal" style={{ color: "#5a4030", fontSize: isPreview ? 12 : 17, animationDelay: "0.35s" }}>{fmt(date) || "Wedding Date"}{time ? ` · ${fmtTime(time)}` : ""}</p>
          {venueMapUrl && !isPreview && (
            <a href={venueMapUrl} target="_blank" rel="noreferrer" className="reveal" style={{ display: "inline-block", marginTop: 16, padding: "10px 24px", background: deepPurple, color: gold, fontSize: 11, letterSpacing: ls("0.2em"), textDecoration: "none", borderRadius: 2, transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease", animationDelay: "0.5s" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = gold; (e.target as HTMLElement).style.color = deepPurple; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = deepPurple; (e.target as HTMLElement).style.color = gold; }}>
              📍 Get Directions
            </a>
          )}
          {dressCode && (
            <div className="reveal" style={{ marginTop: isPreview ? 14 : 24, padding: "10px 20px", background: `${gold}14`, border: `1px solid ${gold}33`, display: "inline-block", animation: isPreview ? "none" : "border-shimmer 3s ease-in-out infinite", animationDelay: "0.6s" }}>
              <p style={{ color: gold, fontSize: isPreview ? 9 : 11, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif" }}>{t.dressCode}: {dressCode}</p>
            </div>
          )}
          {receptionVenue && (
            <div className="reveal" style={{ marginTop: isPreview ? 20 : 36, paddingTop: isPreview ? 20 : 32, borderTop: `1px solid #e8d5a3`, animationDelay: "0.4s" }}>
              <p style={{ color: gold, fontSize: 9, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginBottom: 8 }}>{t.reception}</p>
              <h3 style={{ fontFamily: "'Playfair Display',serif", color: deepPurple, fontSize: isPreview ? 16 : 26, fontWeight: 400, marginBottom: 4 }}>{receptionVenue}</h3>
              {receptionTime && <p style={{ color: "#7a6652", fontSize: isPreview ? 11 : 15 }}>{fmtTime(receptionTime)}</p>}
            </div>
          )}
          {divider}
        </div>

        {/* ══ EVENTS ══ */}
        {events?.length > 0 && (
          <div ref={eventsRef} style={{ background: deepPurple, padding: isPreview ? "32px 20px" : "64px 40px" }}>
            <p className="reveal" style={{ color: gold, fontSize: 9, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", textAlign: "center", marginBottom: isPreview ? 20 : 36 }}>{t.weddingCelebrations}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: isPreview ? 14 : 24 }}>
              {events.map((ev, i) => (
                <div key={i} className="reveal" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: isPreview ? 14 : 24, alignItems: "start", animationDelay: `${i * 0.15}s` }}>
                  <div style={{ textAlign: "center", minWidth: isPreview ? 48 : 72 }}>
                    <div style={{ width: isPreview ? 48 : 72, height: isPreview ? 48 : 72, borderRadius: "50%", border: `1px solid ${gold}66`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease", animation: isPreview ? "none" : `border-shimmer 3s ease-in-out ${i * 0.5}s infinite` }}>
                      <p style={{ color: gold, fontSize: isPreview ? 16 : 26, lineHeight: 1, fontFamily: "'Playfair Display',serif" }}>{ev.date ? new Date(ev.date + "T00:00:00").getDate() : "—"}</p>
                      <p style={{ color: "#e8d5a3", fontSize: isPreview ? 7 : 9, letterSpacing: ls("0.2em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif" }}>{ev.date ? new Date(ev.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" }) : "—"}</p>
                    </div>
                    {i < events.length - 1 && <div style={{ width: 1, height: isPreview ? 16 : 24, background: `${gold}33`, margin: "6px auto 0" }} />}
                  </div>
                  <div style={{ paddingTop: 6 }}>
                    <h3 style={{ color: "#faf6f0", fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 14 : 22, fontWeight: 400, margin: "0 0 4px" }}>{ev.name}</h3>
                    <p style={{ color: gold, fontSize: isPreview ? 10 : 13, fontFamily: "'Lato',sans-serif" }}>{ev.venue}{ev.time ? ` · ${fmtTime(ev.time)}` : ""}</p>
                    {ev.venueAddress && <p style={{ color: "#8870a0", fontSize: isPreview ? 9 : 12, marginTop: 2, fontStyle: "italic" }}>{ev.venueAddress}</p>}
                    {ev.description && <p style={{ color: "#c0b0d8", fontSize: isPreview ? 9 : 13, marginTop: 4, lineHeight: 1.6, fontStyle: "italic" }}>{ev.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ COUPLE BIOS ══ */}
        {(brideAbout || groomAbout) && (
          <div ref={biosRef} style={{ background: cream, padding: isPreview ? "32px 20px" : "60px 40px" }}>
            {divider}
            <p className="reveal" style={{ color: gold, fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", textAlign: "center", margin: isPreview ? "16px 0 20px" : "28px 0 36px" }}>{t.aboutTheCouple}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isPreview ? 16 : 32 }}>
              {brideAbout && (
                <div className="reveal-left" style={{ textAlign: "center", padding: isPreview ? 12 : 20, background: `${gold}0d`, border: `1px solid ${gold}22`, transitionProperty: "all", transitionDuration: "0.4s", transitionTimingFunction: "ease", animationDelay: "0.1s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${gold}22`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}>
                  <h3 style={{ fontFamily: scriptFont, fontSize: isPreview ? 22 : 36, color: deepPurple, marginBottom: 8 }}>{brideName || "Bride"}</h3>
                  <p style={{ color: "#5a4030", fontSize: isPreview ? 10 : 14, lineHeight: 1.7, fontStyle: "italic" }}>{brideAbout}</p>
                </div>
              )}
              {groomAbout && (
                <div className="reveal-right" style={{ textAlign: "center", padding: isPreview ? 12 : 20, background: `${gold}0d`, border: `1px solid ${gold}22`, transitionProperty: "all", transitionDuration: "0.4s", transitionTimingFunction: "ease", animationDelay: "0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${gold}22`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}>
                  <h3 style={{ fontFamily: scriptFont, fontSize: isPreview ? 22 : 36, color: deepPurple, marginBottom: 8 }}>{groomName || "Groom"}</h3>
                  <p style={{ color: "#5a4030", fontSize: isPreview ? 10 : 14, lineHeight: 1.7, fontStyle: "italic" }}>{groomAbout}</p>
                </div>
              )}
            </div>
            {divider}
          </div>
        )}

        {/* ══ FAMILIES ══ */}
        {(brideFamily?.fatherName || groomFamily?.fatherName || brideFamilyImageUrls.length > 0 || groomFamilyImageUrls.length > 0) && (
          <div ref={familyRef} style={{ background: deepPurple, padding: isPreview ? "32px 20px" : "60px 40px", textAlign: "center" }}>
            <p className="reveal" style={{ color: gold, fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginBottom: isPreview ? 20 : 36 }}>{t.withBlessingsOfFamilies}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0 }}>
              {[{ label: t.bridesFamily, fam: brideFamily, imgs: brideFamilyImageUrls, cls: "reveal-left" },
                { label: t.groomsFamily, fam: groomFamily, imgs: groomFamilyImageUrls, cls: "reveal-right" }].map(({ label, fam, imgs, cls }, idx) => (
                <div key={label} className={cls} style={{ padding: `0 ${isPreview ? 16 : 28}px`, textAlign: "center", animationDelay: `${idx * 0.2}s` }}>
                  <p style={{ color: gold, fontSize: 9, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginBottom: isPreview ? 10 : 16 }}>{label}</p>
                  {imgs.length > 0 && (
                    <div style={{ marginBottom: isPreview ? 10 : 18, borderRadius: isPreview ? 8 : 12, overflow: "hidden", border: `1px solid ${gold}44` }}>
                      <ImageSlideshow urls={imgs} aspectRatio="4/3" autoplayMs={5000} isPreview={isPreview} showArrows={!isPreview} showDots={imgs.length > 1} borderRadius={isPreview ? 8 : 12} />
                    </div>
                  )}
                  {fam?.fatherName && <p style={{ color: "#faf6f0", fontSize: isPreview ? 12 : 17, marginBottom: 4, fontStyle: "italic" }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#e8d5a3", fontSize: isPreview ? 11 : 15, marginBottom: 8 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: `${gold}bb`, fontSize: isPreview ? 10 : 13 }}>{m.name} <span style={{ opacity: 0.6, fontSize: "0.85em" }}>({m.relation})</span></p>)}
                </div>
              ))}
              <div style={{ background: `${gold}33` }} />
            </div>
          </div>
        )}

        {/* ══ STORY ══ */}
        {(story || storyImageUrls.length > 0) && (
          <div ref={storyRef} style={{ padding: isPreview ? "36px 24px" : "72px 60px", textAlign: "center", background: cream }}>
            {divider}
            <p className="reveal" style={{ color: gold, fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", margin: isPreview ? "16px 0 14px" : "28px 0 24px" }}>{t.ourStory}</p>
            {storyImageUrls.length > 0 && (
              <div className="reveal-scale" style={{ marginBottom: isPreview ? 16 : 28, borderRadius: isPreview ? 8 : 16, overflow: "hidden", boxShadow: "0 8px 40px rgba(26,10,46,0.18)" }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={accentColor} isPreview={isPreview} />
              </div>
            )}
            {story && <p className="reveal" style={{ fontFamily: "'Cormorant Garamond',serif", color: "#4a3728", fontStyle: "italic", fontSize: isPreview ? 13 : 20, lineHeight: 1.9, animationDelay: "0.2s" }}>{story}</p>}
            {divider}
          </div>
        )}

        {/* ══ RSVP ══ */}
        {(rsvpContact || rsvpDeadline || rsvpWhatsapp) && (
          <div ref={rsvpRef} style={{ background: deepPurple, padding: isPreview ? "32px 20px" : "60px 40px", textAlign: "center" }}>
            <p className="reveal" style={{ color: gold, fontSize: 9, letterSpacing: ls("0.5em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginBottom: isPreview ? 14 : 24 }}>{t.kindlyRsvp}</p>
            {rsvpDeadline && <p className="reveal" style={{ color: cream, fontSize: isPreview ? 13 : 18, marginBottom: 8, fontStyle: "italic", animationDelay: "0.1s" }}>Kindly respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p className="reveal" style={{ color: "#e8d5a3", fontSize: isPreview ? 12 : 16, animationDelay: "0.2s" }}>{rsvpContact}</p>}
            {rsvpWhatsapp && !isPreview && (
              <a href={`https://wa.me/${rsvpWhatsapp}?text=Hi! I'd like to RSVP for ${brideName || "the couple"}'s wedding`} target="_blank" rel="noreferrer"
                className="reveal"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, padding: "12px 28px", background: "#25D366", color: "#fff", textDecoration: "none", borderRadius: 4, fontFamily: "'Lato',sans-serif", fontSize: 13, letterSpacing: ls("0.1em"), transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease", animationDelay: "0.3s" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.transform = "scale(1.05)"; (e.target as HTMLElement).style.boxShadow = "0 8px 20px rgba(37,211,102,0.4)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.transform = ""; (e.target as HTMLElement).style.boxShadow = ""; }}>
                💬 {t.rsvpOnWhatsapp}
              </a>
            )}
          </div>
        )}

        {/* ══ SPECIAL NOTE ══ */}
        {specialNote && (
          <div style={{ background: "#f0e8d8", padding: isPreview ? "24px 20px" : "48px 60px", textAlign: "center" }}>
            <div className="reveal-scale">
              <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#5a3e28", fontStyle: "italic", fontSize: isPreview ? 12 : 18, lineHeight: 1.8 }}>&ldquo;{specialNote}&rdquo;</p>
            </div>
          </div>
        )}

        {/* ══ HASHTAG ══ */}
        {coupleHashtag && (
          <div style={{ background: gold, padding: isPreview ? "16px" : "24px", textAlign: "center" }}>
            <p style={{ color: deepPurple, fontSize: isPreview ? 14 : 22, fontFamily: "'Playfair Display',serif", fontWeight: 600, animation: isPreview ? "none" : "shimmer 3s linear infinite", background: `linear-gradient(90deg,${deepPurple},#4a1a2e,${deepPurple})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{coupleHashtag}</p>
            <p style={{ color: "#2d1444", fontSize: isPreview ? 9 : 11, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginTop: 4 }}>{t.shareYourMoments}</p>
          </div>
        )}

        {/* ══ FOOTER ══ */}
        <div ref={footerRef} style={{ background: `linear-gradient(180deg,#0f0520,${deepPurple})`, padding: isPreview ? "40px 20px" : "72px 40px", textAlign: "center" }}>
          <p className="reveal" style={{
            fontFamily: scriptFont, fontSize: isPreview ? 36 : 64, color: gold, margin: 0,
            animation: isPreview ? "none" : `glow-pulse 3s ease-in-out infinite`,
          }}>
            {brideName || "Bride"} &amp; {groomName || "Groom"}
          </p>
          <p className="reveal" style={{ color: "#e8d5a3", fontSize: isPreview ? 9 : 13, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, fontFamily: "'Lato',sans-serif", marginTop: 12, animationDelay: "0.2s" }}>{fmt(date) || "Wedding Date"}</p>
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px auto 0", width: "60%", animationDelay: "0.4s" }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${gold})`, opacity: 0.3 }} />
            <span style={{ color: gold, fontSize: 16, opacity: 0.5, animation: isPreview ? "none" : "heart-pulse 2s ease-in-out infinite" }}>✦</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${gold},transparent)`, opacity: 0.3 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
