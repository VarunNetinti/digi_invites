"use client";
import ImageSlideshow from "@/components/ImageSlideshow";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import GalleryDisplay from "@/components/GalleryDisplay";
import { TemplateProps } from "@/lib/types";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";
import { useState, useEffect, useRef } from "react";
import BrandFooter from "@/components/BrandFooter";

export default function Template3({ invitation, isPreview }: TemplateProps) {
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
  const accentColor = invAccent || "#ffffff";
  const scriptFont = invFont ? `'${invFont}',cursive,serif` : "'Playfair Display',serif";

  const weddingDate = date ? new Date(date+"T00:00:00") : null;
  const day = weddingDate ? weddingDate.getDate().toString().padStart(2,"0") : "—";
  const month = weddingDate ? weddingDate.toLocaleDateString("en-US",{month:"short"}).toUpperCase() : "—";
  const year = weddingDate ? weddingDate.getFullYear() : "——";

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

  const line = (
    <div style={{ display: "flex", alignItems: "center", gap: 20, margin: "0" }}>
      <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
    </div>
  );

  return (
    <div className={isPreview ? "pointer-events-none" : ""}>
      <div style={{ width: isPreview ? "390px" : "100%", fontFamily: "'Montserrat',sans-serif", background: "#0d0d0d", color: "#f0f0f0" }}>

        {/* HERO */}
        <div style={{ minHeight: isPreview ? 500 : "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isPreview ? "64px 24px 48px" : "80px 40px", textAlign: "center", position: "relative", borderBottom: "1px solid #1a1a1a" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
            <p style={{ fontSize: isPreview ? 8 : 10, letterSpacing: ls("0.8em"), textTransform: tt("uppercase") as any, color: "#444", marginBottom: isPreview ? 32 : 56 }}>Marriage Ceremony</p>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: isPreview ? 10 : 20, marginBottom: 0 }}>
              <h1 className="reveal" style={{ fontFamily: scriptFont, fontSize: isPreview ? 28 : 60, fontWeight: 300, color: accentColor, lineHeight: 1, margin: 0 }}>{brideName || "Bride"}</h1>
              <span style={{ color: "#333", fontSize: isPreview ? 24 : 52, fontWeight: 100 }}>&amp;</span>
              <h1 className="reveal" style={{ fontFamily: scriptFont, fontSize: isPreview ? 28 : 60, fontWeight: 300, color: accentColor, lineHeight: 1, margin: 0 }}>{groomName || "Groom"}</h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, margin: isPreview ? "28px 0" : "48px 0" }}>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,transparent,#333)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: isPreview ? 48 : 88, fontWeight: 100, color: "#fff", lineHeight: 1, fontFamily: "'Playfair Display',serif" }}>{day}</div>
                <div style={{ fontSize: isPreview ? 8 : 11, letterSpacing: ls("0.5em"), color: "#555", marginTop: 4 }}>{month} · {year}</div>
              </div>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,#333,transparent)" }} />
            </div>

            <p style={{ fontSize: isPreview ? 10 : 13, letterSpacing: ls("0.4em"), color: "#666", marginBottom: 6, textTransform: tt("uppercase") as any }}>{fmtTime(time) || "00:00"}</p>
            <p style={{ fontSize: isPreview ? 13 : 20, color: "#999", fontWeight: 300 }}>{venue || "Venue Name"}</p>
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
          <div style={{ padding: "20px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "center", gap: 32 }}>
            {[["days", countdown.days], ["hrs", countdown.hours], ["min", countdown.minutes], ["sec", countdown.seconds]].map(([label, val]) => (
              <div key={label as string} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: "#fff", fontWeight: 100, lineHeight: 1 }}>{String(val).padStart(2,"0")}</p>
                <p style={{ fontSize: 9, letterSpacing: ls("0.4em"), color: "#444", textTransform: tt("uppercase") as any, marginTop: 4 }}>{label as string}</p>
              </div>
            ))}
          </div>
        )}

        {/* INFO GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #1a1a1a" }}>
          {[
            { label: "Date", value: fmt(date) || "Wedding Date" },
            { label: "Time", value: fmtTime(time) || "—" },
            { label: "Venue", value: venue || "—" },
            { label: "Address", value: venueAddress || "—" },
          ].map((item, i) => (
            <div key={i} style={{ padding: isPreview ? "14px 12px" : "28px 24px", borderRight: i%2===0 ? "1px solid #1a1a1a" : "none", borderBottom: i<2 ? "1px solid #1a1a1a" : "none" }}>
              <p style={{ fontSize: 8, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, color: "#444", marginBottom: 6 }}>{item.label}</p>
              <p style={{ fontSize: isPreview ? 11 : 15, color: "#ccc", fontWeight: 300 }}>{item.value}</p>
            </div>
          ))}
        </div>

        {(receptionVenue || dressCode) && (
          <div style={{ display: "grid", gridTemplateColumns: receptionVenue && dressCode ? "1fr 1fr" : "1fr", borderBottom: "1px solid #1a1a1a" }}>
            {receptionVenue && (
              <div style={{ padding: isPreview ? "14px 12px" : "24px", borderRight: dressCode ? "1px solid #1a1a1a" : "none" }}>
                <p style={{ fontSize: 8, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, color: "#444", marginBottom: 6 }}>{t.reception}</p>
                <p style={{ fontSize: isPreview ? 11 : 15, color: "#ccc", fontWeight: 300 }}>{receptionVenue}</p>
                {receptionTime && <p style={{ fontSize: isPreview ? 10 : 13, color: "#555", marginTop: 3 }}>{fmtTime(receptionTime)}</p>}
              </div>
            )}
            {dressCode && (
              <div style={{ padding: isPreview ? "14px 12px" : "24px" }}>
                <p style={{ fontSize: 8, letterSpacing: ls("0.4em"), textTransform: tt("uppercase") as any, color: "#444", marginBottom: 6 }}>{t.dressCode}</p>
                <p style={{ fontSize: isPreview ? 11 : 15, color: "#ccc", fontWeight: 300 }}>{dressCode}</p>
              </div>
            )}
          </div>
        )}

        {venueMapUrl && !isPreview && (
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #1a1a1a" }}>
            <a href={venueMapUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#ccc", textDecoration: "none", fontSize: 12, letterSpacing: ls("0.1em") }}>📍 <span style={{ borderBottom: "1px solid #333" }}>Get Directions</span></a>
          </div>
        )}

        {/* PRE-WEDDING EVENTS */}
        {events && events.length > 0 && (
          <div style={{ borderTop: "1px solid #1a1a1a" }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: "#444", textAlign: "center", padding: isPreview ? "20px 0 14px" : "32px 0 24px" }}>Celebrations</p>
            {events.map((ev, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: isPreview ? "56px 1fr" : "100px 1fr", borderTop: "1px solid #111", padding: isPreview ? "12px 16px" : "20px 32px", gap: isPreview ? 12 : 24 }}>
                <div style={{ textAlign: "right" }}>
                  {ev.date && <p style={{ fontSize: isPreview ? 20 : 32, color: "#fff", fontFamily: "'Playfair Display',serif", fontWeight: 100, lineHeight: 1 }}>{new Date(ev.date+"T00:00:00").getDate()}</p>}
                  {ev.date && <p style={{ fontSize: 8, letterSpacing: ls("0.3em"), color: "#555", textTransform: tt("uppercase") as any }}>{new Date(ev.date+"T00:00:00").toLocaleDateString("en-US",{month:"short"})}</p>}
                </div>
                <div>
                  <h4 style={{ color: "#fff", fontSize: isPreview ? 12 : 17, fontWeight: 400, margin: "0 0 4px", fontFamily: "'Playfair Display',serif" }}>{ev.name}</h4>
                  <p style={{ color: "#666", fontSize: isPreview ? 9 : 12 }}>{ev.venue}{ev.time ? ` · ${fmtTime(ev.time)}` : ""}</p>
                  {ev.description && <p style={{ color: "#444", fontSize: isPreview ? 9 : 12, marginTop: 3, fontStyle: "italic" }}>{ev.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CAROUSEL */}
        {imageUrls && imageUrls.length > 0 && (
          <div style={{ borderTop: "1px solid #1a1a1a" }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: "#444", textAlign: "center", padding: isPreview ? "20px 0 0" : "32px 0 0" }}>Photographs</p>
            <div style={{ position: "relative", overflow: "hidden", marginTop: 16 }}>
              <div style={{ display: "flex", transitionProperty: "transform", transitionDuration: "0.6s", transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)", transform: `translateX(-${activeSlide * 100}%)` }}>
                {imageUrls.map((url, i) => (
                  <div key={i} style={{ minWidth: "100%", aspectRatio: "16/9", flexShrink: 0 }}>
                    <img src={url} alt={`Photo ${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(15%) contrast(1.05)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
                  </div>
                ))}
              </div>
              {imageUrls.length > 1 && !isPreview && (
                <>
                  <button onClick={() => setActiveSlide(p => Math.max(0,p-1))} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.7)", color: "#fff", border: "1px solid #222", borderRadius: "50%", width: 40, height: 40, fontSize: 16, cursor: "pointer" }}>‹</button>
                  <button onClick={() => setActiveSlide(p => Math.min(imageUrls.length-1,p+1))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.7)", color: "#fff", border: "1px solid #222", borderRadius: "50%", width: 40, height: 40, fontSize: 16, cursor: "pointer" }}>›</button>
                </>
              )}
            </div>
            {imageUrls.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "12px 0" }}>
                {imageUrls.map((_, i) => <button key={i} onClick={() => !isPreview && setActiveSlide(i)} style={{ width: i===activeSlide ? 20 : 6, height: 6, borderRadius: 3, background: i===activeSlide ? "#fff" : "#222", border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />)}
              </div>
            )}
          </div>
        )}

        {/* COUPLE BIOS */}
        {(brideAbout || groomAbout) && (
          <div style={{ borderTop: "1px solid #1a1a1a", padding: isPreview ? "24px 16px" : "48px 32px" }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: "#444", textAlign: "center", marginBottom: isPreview ? 16 : 28 }}>The Couple</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0 }}>
              {[{ name: brideName, bio: brideAbout, label: "Bride" }, { name: groomName, bio: groomAbout, label: "Groom" }].map(({ name, bio, label }, idx) => bio ? (
                <div key={label} style={{ padding: idx === 0 ? `0 ${isPreview ? 12 : 24}px 0 0` : `0 0 0 ${isPreview ? 12 : 24}px`, textAlign: "center" }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: isPreview ? 14 : 20, color: "#fff", fontWeight: 300, marginBottom: 8 }}>{name || label}</p>
                  <p style={{ color: "#555", fontSize: isPreview ? 10 : 13, lineHeight: 1.7, fontWeight: 300, fontStyle: "italic" }}>{bio}</p>
                </div>
              ) : <div key={label} />)}
              <div style={{ background: "#1a1a1a" }} />
            </div>
          </div>
        )}

        {/* FAMILIES */}
        {(brideFamily?.fatherName || groomFamily?.fatherName || brideFamilyImageUrls.length > 0 || groomFamilyImageUrls.length > 0) && (
          <div style={{ padding: isPreview ? "24px 16px" : "48px 32px", borderTop: "1px solid #1a1a1a" }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: "#444", textAlign: "center", marginBottom: isPreview ? 20 : 32 }}>Families</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0 }}>
              {[{ label: "Bride", fam: brideFamily }, { label: "Groom", fam: groomFamily }].map(({ label, fam }, idx) => (
                <div key={label} style={{ padding: idx===0 ? `0 ${isPreview?12:20}px 0 0` : `0 0 0 ${isPreview?12:20}px`, textAlign: "center" }}>
                  <p style={{ fontSize: 8, letterSpacing: ls("0.3em"), textTransform: tt("uppercase") as any, color: "#444", marginBottom: 10 }}>{label}&apos;s Family</p>
                  {idx === 0 && brideFamilyImageUrls.length > 0 && (
                    <div style={{ borderRadius: 6, overflow: "hidden", marginBottom: isPreview ? 8 : 14 }}>
                      <ImageSlideshow urls={brideFamilyImageUrls} aspectRatio="4/3" autoplayMs={5000} isPreview={isPreview} showArrows={false} showDots={brideFamilyImageUrls.length > 1} />
                    </div>
                  )}
                  {idx === 1 && groomFamilyImageUrls.length > 0 && (
                    <div style={{ borderRadius: 6, overflow: "hidden", marginBottom: isPreview ? 8 : 14 }}>
                      <ImageSlideshow urls={groomFamilyImageUrls} aspectRatio="4/3" autoplayMs={5000} isPreview={isPreview} showArrows={false} showDots={groomFamilyImageUrls.length > 1} />
                    </div>
                  )}
                  {fam?.fatherName && <p style={{ color: "#ccc", fontSize: isPreview ? 11 : 15, fontWeight: 300, marginBottom: 3 }}>{fam.fatherName}</p>}
                  {fam?.motherName && <p style={{ color: "#888", fontSize: isPreview ? 10 : 13, fontWeight: 300, marginBottom: 6 }}>{fam.motherName}</p>}
                  {fam?.members?.map((m, i) => <p key={i} style={{ color: "#555", fontSize: isPreview ? 9 : 12 }}>{m.name} · {m.relation}</p>)}
                </div>
              ))}
              <div style={{ background: "#1a1a1a" }} />
            </div>
          </div>
        )}

        {/* STORY with images */}
        {(story || storyImageUrls.length > 0) && (
          <div style={{ padding: isPreview ? "24px 16px" : "56px 40px", borderTop: "1px solid #1a1a1a", textAlign: "center" }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: "#444", marginBottom: isPreview ? 16 : 24 }}>{t.ourStory}</p>
{storyImageUrls.length > 0 && (
              <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: isPreview ? 14 : 24 }}>
                <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={accentColor || invAccent || "#c9a84c"} isPreview={isPreview} />
              </div>
            )}
            {story && <p style={{ fontFamily: "'Cormorant Garamond',serif", color: "#777", fontStyle: "italic", fontSize: isPreview ? 13 : 20, lineHeight: 1.9, fontWeight: 300 }}>{story}</p>}
          </div>
        )}

        {/* RSVP */}
        {(rsvpContact || rsvpDeadline || rsvpWhatsapp) && (
          <div style={{ padding: isPreview ? "20px" : "40px 32px", borderTop: "1px solid #1a1a1a", textAlign: "center" }}>
            <p style={{ fontSize: 8, letterSpacing: ls("0.6em"), textTransform: tt("uppercase") as any, color: "#444", marginBottom: isPreview ? 14 : 20 }}>RSVP</p>
            {rsvpDeadline && <p style={{ color: "#aaa", fontSize: isPreview ? 12 : 16, fontWeight: 300, marginBottom: 6 }}>Respond by {fmt(rsvpDeadline)}</p>}
            {rsvpContact && <p style={{ color: "#555", fontSize: isPreview ? 11 : 14 }}>{rsvpContact}</p>}
            {rsvpWhatsapp && !isPreview && (
              <a href={`https://wa.me/${rsvpWhatsapp}?text=Hi! RSVP for ${brideName} & ${groomName}'s wedding`} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, padding: "10px 24px", background: "#25D366", color: "#fff", textDecoration: "none", fontSize: 13, borderRadius: 2 }}>
                💬 {t.rsvpOnWhatsapp}
              </a>
            )}
          </div>
        )}

        {/* SPECIAL NOTE */}
        {specialNote && (
          <div style={{ borderTop: "1px solid #111", padding: isPreview ? "16px" : "28px 40px", textAlign: "center" }}>
            <p style={{ color: "#444", fontSize: isPreview ? 11 : 15, fontStyle: "italic", lineHeight: 1.7, fontFamily: "'Cormorant Garamond',serif" }}>&ldquo;{specialNote}&rdquo;</p>
          </div>
        )}

        {/* HASHTAG */}
        {coupleHashtag && (
          <div style={{ borderTop: "1px solid #1a1a1a", padding: isPreview ? "14px" : "20px", textAlign: "center" }}>
            <p style={{ color: "#fff", fontSize: isPreview ? 13 : 18, fontFamily: "'Playfair Display',serif", letterSpacing: ls("0.05em") }}>{coupleHashtag}</p>
          </div>
        )}

        {/* FOOTER */}
        <div style={{ padding: isPreview ? "28px 20px" : "48px 32px", borderTop: "1px solid #1a1a1a", textAlign: "center" }}>
          <p style={{ fontSize: 8, letterSpacing: ls("0.8em"), textTransform: tt("uppercase") as any, color: "#333", marginBottom: 16 }}>{(brideName||"BRIDE").toUpperCase()} &amp; {(groomName||"GROOM").toUpperCase()}</p>
          <p style={{ color: "#333", fontSize: isPreview ? 10 : 13, letterSpacing: ls("0.2em") }}>{fmt(date)}</p>
          <div style={{ width: 1, height: isPreview ? 40 : 64, background: "linear-gradient(to bottom,#333,transparent)", margin: "16px auto 0" }} />
        </div>
        <BrandFooter isPreview={isPreview} bgColor="#111" textColor="rgba(255,255,255,0.35)" accentColor={accentColor} />
      </div>
    </div>
  );
}
