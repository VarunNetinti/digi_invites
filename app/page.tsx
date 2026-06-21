"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─── tiny hook: count up when in view ─── */
function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = target / (duration / 16);
      const t = setInterval(() => {
        start += step;
        if (start >= target) { setVal(target); clearInterval(t); }
        else setVal(Math.floor(start));
      }, 16);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

/* ─── floating card ─── */
function FloatingCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const animate = () => {
      const t = Date.now() / 1000;
      setTilt({ x: Math.sin(t * 0.4) * 5, y: Math.cos(t * 0.3) * 6 });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        width: "100%",
        maxWidth: 340,
        margin: "0 auto",
        perspective: 1000,
        cursor: "pointer",
      }}
    >
      <div style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transitionProperty: "transform", transitionDuration: "0.1s", transitionTimingFunction: "ease-out",
        transformStyle: "preserve-3d",
        position: "relative",
      }}>
        {/* Shadow */}
        <div style={{
          position: "absolute",
          bottom: -24,
          left: "10%",
          right: "10%",
          height: 40,
          background: "radial-gradient(ellipse, rgba(201,168,76,0.3) 0%, transparent 70%)",
          filter: "blur(12px)",
          transform: "translateZ(-20px)",
        }} />

        {/* Card face */}
        <div style={{
          background: "linear-gradient(160deg, #1a0a2e 0%, #2d1444 45%, #1a0f3e 100%)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
          position: "relative",
        }}>
          {/* shimmer overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `linear-gradient(${105 + tilt.y * 3}deg, transparent 30%, rgba(201,168,76,0.06) 50%, transparent 70%)`,
            transitionProperty: "background", transitionDuration: "0.1s", transitionTimingFunction: "ease",
          }} />

          {/* Top gold border */}
          <div style={{ height: 3, background: "linear-gradient(90deg, transparent, #c9a84c, #e8d5a3, #c9a84c, transparent)" }} />

          {/* Card content */}
          <div style={{ padding: "32px 28px 28px", textAlign: "center", fontFamily: "'Cormorant Garamond', serif" }}>
            {/* Ornament */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 20 }}>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.6))" }} />
              <span style={{ color: "#c9a84c", fontSize: 12, letterSpacing: 3 }}>✦ ❧ ✦</span>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,rgba(201,168,76,0.6),transparent)" }} />
            </div>

            <p style={{ color: "#c9a84c", fontSize: 8, letterSpacing: "0.5em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 16, opacity: 0.8 }}>
              Together with their families
            </p>

            <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 44, color: "#c9a84c", lineHeight: 1, margin: "0 0 4px", textShadow: "0 0 30px rgba(201,168,76,0.4)" }}>
              Priya
            </h2>
            <p style={{ color: "#e8d5a3", fontSize: 18, fontStyle: "italic", margin: "6px 0" }}>&amp;</p>
            <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 44, color: "#c9a84c", lineHeight: 1, margin: "0 0 20px", textShadow: "0 0 30px rgba(201,168,76,0.4)" }}>
              Rahul
            </h2>

            {/* Date strip */}
            <div style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#c9a84c", fontSize: 20, fontFamily: "'Playfair Display',serif", fontWeight: 400, lineHeight: 1 }}>14</p>
                <p style={{ color: "#888", fontSize: 7, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginTop: 2 }}>Feb</p>
              </div>
              <div style={{ height: 28, width: 1, background: "rgba(201,168,76,0.25)" }} />
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#e8d5a3", fontSize: 11, fontStyle: "italic" }}>7:00 PM</p>
                <p style={{ color: "#888", fontSize: 7, letterSpacing: "0.2em", fontFamily: "'Montserrat',sans-serif", marginTop: 2 }}>2026</p>
              </div>
              <div style={{ height: 28, width: 1, background: "rgba(201,168,76,0.25)" }} />
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#e8d5a3", fontSize: 9, lineHeight: 1.4 }}>The Taj<br />Palace</p>
              </div>
            </div>

            {/* Venue */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 10 }}>📍</span>
              <p style={{ color: "#888", fontSize: 10, fontStyle: "italic", fontFamily: "'Montserrat',sans-serif" }}>Mumbai, Maharashtra</p>
            </div>

            {/* Photo thumbnails */}
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
              {["#4a2a6e","#6b3a8a","#3d1f5a"].map((bg, i) => (
                <div key={i} style={{ flex: 1, height: 40, borderRadius: 6, background: bg, border: "1px solid rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14, opacity: 0.5 }}>📷</span>
                </div>
              ))}
            </div>

            {/* Families */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
              {[["Bride's Family","Mr. Sharma","Mrs. Sharma"],["Groom's Family","Mr. Mehta","Mrs. Mehta"]].map(([label, f, m]) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, padding: "8px 10px", textAlign: "left" }}>
                  <p style={{ color: "#c9a84c", fontSize: 6.5, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 5, opacity: 0.8 }}>{label}</p>
                  <p style={{ color: "#e8d5a3", fontSize: 9, marginBottom: 1 }}>{f}</p>
                  <p style={{ color: "#aaa", fontSize: 9 }}>{m}</p>
                </div>
              ))}
            </div>

            {/* RSVP bar */}
            <div style={{ background: "linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.06))", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ color: "#c9a84c", fontSize: 7, letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif" }}>RSVP by Jan 31</p>
              <p style={{ color: "#e8d5a3", fontSize: 9, fontStyle: "italic" }}>+91 7337493504</p>
            </div>

            {/* Bottom ornament */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 20 }}>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.4))" }} />
              <span style={{ color: "rgba(201,168,76,0.5)", fontSize: 10 }}>❧</span>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,rgba(201,168,76,0.4),transparent)" }} />
            </div>
          </div>

          {/* Bottom gold border */}
          <div style={{ height: 3, background: "linear-gradient(90deg, transparent, #c9a84c, #e8d5a3, #c9a84c, transparent)" }} />
        </div>
      </div>
    </div>
  );
}

/* ─── feature comparison ─── */
const vsData = [
  { feature: "Instant Delivery", digital: true, paper: false },
  { feature: "Update Anytime", digital: true, paper: false },
  { feature: "WhatsApp Shareable", digital: true, paper: false },
  { feature: "Photo Gallery", digital: true, paper: false },
  { feature: "Countdown Timer", digital: true, paper: false },
  { feature: "Zero Printing Cost", digital: true, paper: false },
  { feature: "Eco-Friendly", digital: true, paper: false },
  { feature: "Works on Any Phone", digital: true, paper: true },
];

/* ─── template previews — all 15 ─── */
const templates = [
  { id: 1,  name: "Royal Elegance",     tag: "Gold & Ivory",       bg: "linear-gradient(160deg,#1a0a2e,#2d1444)",   accent: "#c9a84c", desc: "Ornate gold borders, regal typography" },
  { id: 2,  name: "Blush Romance",      tag: "Pink Floral",        bg: "linear-gradient(160deg,#f9e4e4,#f5c6c6)",   accent: "#8b3a52", desc: "Soft blush tones, floral accents" },
  { id: 3,  name: "Modern Noir",        tag: "Black & White",      bg: "linear-gradient(160deg,#0d0d0d,#1a1a1a)",   accent: "#ffffff", desc: "Bold, editorial, minimalist luxury" },
  { id: 4,  name: "Rustic Garden",      tag: "Sage & Cream",       bg: "linear-gradient(160deg,#3d4e30,#4a5e3a)",   accent: "#c8d8a0", desc: "Earthy botanicals, warm textures" },
  { id: 5,  name: "Art Deco",           tag: "Navy & Gold",        bg: "linear-gradient(160deg,#0d1b3e,#1a2a5e)",   accent: "#c9a84c", desc: "Geometric glamour, 1920s luxury" },
  { id: 6,  name: "Japanese Zen",       tag: "Crimson & White",    bg: "linear-gradient(160deg,#fdfaf6,#f5ede0)",   accent: "#dc322f", desc: "Ink wash elegance, cherry blossom serenity" },
  { id: 7,  name: "Tropical Paradise",  tag: "Green & Gold",       bg: "linear-gradient(160deg,#1a4731,#2d6a4f)",   accent: "#f9c74f", desc: "Lush tropical greens, warm coral accents" },
  { id: 8,  name: "Celestial Night",    tag: "Indigo & Silver",    bg: "linear-gradient(160deg,#020712,#0a1628)",   accent: "#c8d8f0", desc: "Deep indigo starfield, constellation magic" },
  { id: 9,  name: "Indian Festive",     tag: "Marigold & Crimson", bg: "linear-gradient(160deg,#c0392b,#e67e22)",   accent: "#ffd700", desc: "Vibrant marigolds, mandala patterns, festive spirit" },
  { id: 10, name: "Gatsby Glamour",     tag: "Champagne & Black",  bg: "linear-gradient(160deg,#0a0a0a,#1a1a1a)",   accent: "#d4af37", desc: "Roaring twenties opulence, sunburst geometry" },
  { id: 11, name: "Lavender Fields",    tag: "Purple & Silver",    bg: "linear-gradient(160deg,#4a3568,#6b4f92)",   accent: "#c8b4e8", desc: "Romantic French countryside, soft lavender hues" },
  { id: 12, name: "Coastal Beach",      tag: "Ocean & Sand",       bg: "linear-gradient(160deg,#2e7da8,#5ba3c9)",   accent: "#fff8e1", desc: "Ocean blues, sandy textures, seaside romance" },
  { id: 13, name: "Vintage Newspaper",  tag: "Sepia & Ink",        bg: "linear-gradient(160deg,#f5ead0,#e8d5a8)",   accent: "#3a2a10", desc: "Old-print charm, typewriter fonts, nostalgic warmth" },
  { id: 14, name: "Boho Terracotta",    tag: "Terracotta & Sage",  bg: "linear-gradient(160deg,#b5451b,#c4622d)",   accent: "#fff5ee", desc: "Earthy terracotta, pampas grass, boho warmth" },
  { id: 15, name: "Emerald & Copper",   tag: "Jewel & Copper",     bg: "linear-gradient(160deg,#1a4a2e,#2d6644)",   accent: "#b87333", desc: "Rich emerald jewel tones with warm copper accents" },
];

export default function HomePage() {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const s500 = useCountUp(500);
  const s5 = useCountUp(5);
  const s1 = useCountUp(1);

  return (
    <div style={{ background: "#060410", color: "#fff", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════
          NAV
      ══════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: 64,
        background: "rgba(6,4,16,0.8)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="rgba(201,168,76,0.12)" />
            <path d="M14 6L16.5 11.5H22L17.5 15L19.5 21L14 17.5L8.5 21L10.5 15L6 11.5H11.5L14 6Z" fill="#c9a84c" />
          </svg>
          <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: 24, color: "#c9a84c", letterSpacing: 1 }}>Digi Invites</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[["#how", "How It Works"], ["#compare", "Why Digital"], ["#templates", "Templates"], ["#pricing", "Pricing"]].map(([href, label]) => (
            <a key={href} href={href} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", transitionProperty: "color", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
              {label}
            </a>
          ))}
          <Link href="/contact" style={{
            padding: "9px 24px", borderRadius: 6,
            background: "linear-gradient(135deg,#c9a84c,#e8d5a3)",
            color: "#060410", textDecoration: "none",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            Contact Us
          </Link>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO — SPLIT LAYOUT
      ══════════════════════════════════════════ */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "100px 60px 60px", gap: 60, maxWidth: 1300, margin: "0 auto" }}>

        {/* LEFT — copy */}
        <div>
          {/* Category badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 4, marginBottom: 36, background: "rgba(201,168,76,0.05)" }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#c9a84c", boxShadow: "0 0 8px #c9a84c", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c" }}>India's Digital Wedding Cards</span>
          </div>

          <h1 style={{ margin: 0, lineHeight: 1.02 }}>
            <span style={{ display: "block", fontFamily: "'Playfair Display',serif", fontSize: "clamp(42px,5.5vw,72px)", fontWeight: 400, color: "#ffffff", fontStyle: "italic", marginBottom: 4 }}>
              Your Wedding Card,
            </span>
            <span style={{ display: "block", fontFamily: "'Playfair Display',serif", fontSize: "clamp(42px,5.5vw,72px)", fontWeight: 700, color: "#ffffff", marginBottom: 4 }}>
              Delivered in
            </span>
            <span style={{
              display: "block",
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(50px,6.5vw,86px)",
              fontWeight: 700,
              background: "linear-gradient(135deg,#c9a84c 0%,#e8d5a3 40%,#c9a84c 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.01em",
            }}>
              One Tap.
            </span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.8, maxWidth: 480, margin: "28px 0 40px", fontFamily: "'Cormorant Garamond',serif" }}>
            No printing. No courier. No waiting. Create a stunning digital wedding card and share it with every guest instantly — just send a link.
          </p>

          {/* CTA row */}
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{
              padding: "15px 36px", borderRadius: 6,
              background: "linear-gradient(135deg,#c9a84c,#e8d5a3)",
              color: "#060410", textDecoration: "none",
              fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
              boxShadow: "0 8px 32px rgba(201,168,76,0.3)",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              <span>Request Your Digital Card</span>
              <span style={{ fontSize: 14 }}>→</span>
            </Link>
            <a href="#templates" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 2 }}>
              See Templates ↓
            </a>
          </div>

          {/* Trust row */}
          <div style={{ display: "flex", gap: 28, marginTop: 48, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { ref: s500.ref, val: s500.val, suffix: "+", label: "Cards Created" },
              { ref: s5.ref, val: s5.val, suffix: " Mins", label: "To Go Live" },
              { ref: s1.ref, val: s1.val, suffix: " Link", label: "Share Anywhere" },
            ].map(({ ref, val, suffix, label }, i) => (
              <div key={label} ref={i === 0 ? ref : undefined}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: "#c9a84c", lineHeight: 1, fontWeight: 600 }}>{val}{suffix}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — interactive card */}
        <div style={{ position: "relative" }}>
          {/* Background glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          {/* Floating particles */}
          {[{ t: "8%", l: "5%", s: 4, op: 0.4, d: "0s" }, { t: "20%", r: "10%", s: 3, op: 0.3, d: "0.8s" }, { t: "70%", l: "8%", s: 5, op: 0.35, d: "1.5s" }, { t: "80%", r: "5%", s: 3, op: 0.3, d: "0.4s" }, { t: "40%", r: "2%", s: 4, op: 0.25, d: "1.2s" }].map((dot, i) => (
            <div key={i} style={{
              position: "absolute", top: dot.t, left: (dot as { l?: string }).l, right: (dot as { r?: string }).r,
              width: dot.s, height: dot.s, borderRadius: "50%",
              background: "#c9a84c", opacity: dot.op,
              animation: `float 4s ease-in-out ${dot.d} infinite alternate`,
            }} />
          ))}
          <FloatingCard />
          {/* Label below card */}
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 20 }}>← Hover to interact with the card →</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════════ */}
      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)", padding: "14px 0", background: "rgba(201,168,76,0.03)" }}>
        <div style={{ display: "flex", gap: 48, animation: "marquee 60s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {[...Array(3)].flatMap(() => ["💌 Share via WhatsApp", "📱 Opens on Any Phone", "🎨 5 Premium Templates", "⚡ Live in 5 Minutes", "🌿 Zero Paper Waste", "✨ Photo Gallery Included", "💌 Share via WhatsApp", "📱 Opens on Any Phone"]).map((t, i) => (
            <span key={i} style={{ color: "rgba(201,168,76,0.6)", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", flexShrink: 0 }}>{t.replace("🎨 5 Premium Templates", "🎨 15 Premium Templates")}</span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          HOW IT WORKS — PROCESS
      ══════════════════════════════════════════ */}
      <section id="how" style={{ padding: "120px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
          <div style={{ width: 2, height: 40, background: "#c9a84c", flexShrink: 0, marginTop: 4 }} />
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 10 }}>The Process</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 400, color: "#fff", margin: 0, fontStyle: "italic" }}>
              From idea to inbox<br /><strong style={{ fontStyle: "normal" }}>in under 5 minutes.</strong>
            </h2>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginTop: 64 }}>
          {[
            { n: "01", title: "Fill In Your Details", body: "Add the couple's names, wedding date, venue, family members, your love story, and RSVP info. Everything in one form.", icon: "✏️" },
            { n: "02", title: "Pick Your Template", body: "Choose from 15 handcrafted themes — Royal Elegance, Blush Romance, Modern Noir, Rustic Garden, Art Deco, Japanese Zen, and many more.", icon: "🎨" },
            { n: "03", title: "Share Your Card Link", body: "Get a beautiful unique URL. Send it on WhatsApp, Instagram, or email. Guests open it instantly, no app needed.", icon: "🔗" },
          ].map((step, i) => (
            <div key={i} style={{ padding: "40px 36px", background: i === 1 ? "rgba(201,168,76,0.05)" : "transparent", border: "1px solid", borderColor: i === 1 ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.05)", position: "relative" }}>
              <div style={{ position: "absolute", top: 24, right: 28, fontFamily: "'Playfair Display',serif", fontSize: 64, color: "rgba(255,255,255,0.04)", fontWeight: 700, lineHeight: 1 }}>{step.n}</div>
              <div style={{ fontSize: 36, marginBottom: 24 }}>{step.icon}</div>
              <div style={{ display: "inline-block", padding: "4px 12px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 3, marginBottom: 16 }}>
                <span style={{ color: "#c9a84c", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 600 }}>Step {step.n}</span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#fff", fontWeight: 400, marginBottom: 12 }}>{step.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.8 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VS — DIGITAL vs PAPER
      ══════════════════════════════════════════ */}
      <section id="compare" style={{ padding: "100px 60px", background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 12, textAlign: "center" }}>Why Go Digital</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", textAlign: "center", color: "#fff", margin: "0 0 64px", fontWeight: 400 }}>
            Paper cards are <em>so</em> 2010.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "16px 28px", background: "rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.15)", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a84c", boxShadow: "0 0 8px #c9a84c" }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a84c" }}>Digital Card</span>
            </div>
            <div style={{ padding: "16px 20px", background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
              <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>Feature</span>
            </div>
            <div style={{ padding: "16px 28px", background: "rgba(0,0,0,0.2)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Paper Card</span>
            </div>

            {/* Rows */}
            {vsData.map((row, i) => (
              <React.Fragment key={row.feature}>
                <div style={{ padding: "14px 28px", background: i % 2 === 0 ? "rgba(201,168,76,0.02)" : "transparent", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "#4ade80", fontSize: 11, fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Included</span>
                </div>
                <div style={{ padding: "14px 20px", background: i % 2 === 0 ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.1)", borderLeft: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{row.feature}</span>
                </div>
                <div style={{ padding: "14px 28px", background: i % 2 === 0 ? "rgba(0,0,0,0.1)" : "transparent", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>{row.paper ? "Included" : "Not Available"}</span>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: row.paper ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.1)", border: `1px solid ${row.paper ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: row.paper ? "#4ade80" : "#f87171", fontSize: 11, fontWeight: 700 }}>{row.paper ? "✓" : "✕"}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/contact" style={{ padding: "14px 36px", borderRadius: 6, background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", color: "#060410", textDecoration: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Contact Us to Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TEMPLATES — BIG SHOWCASE
      ══════════════════════════════════════════ */}
      <section id="templates" style={{ padding: "100px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 12 }}>Premium Designs</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", color: "#fff", margin: 0, fontWeight: 400 }}>
              Every card tells a<br /><em>different story.</em>
            </h2>
          </div>
          <Link href="/templates" style={{ color: "#c9a84c", textDecoration: "none", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: "1px solid rgba(201,168,76,0.3)", paddingBottom: 2 }}>
            See All Templates →
          </Link>
        </div>

        {/* Tab selector */}
        <div style={{ display: "flex", gap: 2,flexWrap: "wrap", marginBottom: 32, paddingBottom: 4 }}>
          {templates.map((t, i) => (
            <button key={i} onClick={() => setActiveTemplate(i)} style={{
              padding: "10px 20px", border: "1px solid", borderRadius: 4, cursor: "pointer", flexShrink: 0,
              fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif",
              background: activeTemplate === i ? "rgba(201,168,76,0.1)" : "transparent",
              borderColor: activeTemplate === i ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.07)",
              color: activeTemplate === i ? "#c9a84c" : "rgba(255,255,255,0.35)",
              transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease",
            }}>
              {t.name}
            </button>
          ))}
        </div>

        {/* Active template showcase */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", minHeight: 360 }}>
          {/* Template card preview */}
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ background: templates[activeTemplate].bg, padding: "48px 32px", textAlign: "center", position: "relative", minHeight: 320 }}>
              {/* Mock card content styled to match template */}
              <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg,transparent,${templates[activeTemplate].accent}60)` }} />
                <span style={{ color: templates[activeTemplate].accent, fontSize: 10, opacity: 0.7 }}>✦ ❧ ✦</span>
                <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg,${templates[activeTemplate].accent}60,transparent)` }} />
              </div>
              <p style={{ color: templates[activeTemplate].accent, fontSize: 8, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Montserrat',sans-serif", opacity: 0.7 }}>
                Together with their families
              </p>
              <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 52, color: templates[activeTemplate].accent, lineHeight: 1, margin: "0 0 4px", textShadow: `0 0 20px ${templates[activeTemplate].accent}50` }}>Priya</p>
              <p style={{ color: templates[activeTemplate].accent, fontSize: 16, fontStyle: "italic", opacity: 0.7, margin: "6px 0", fontFamily: "'Cormorant Garamond',serif" }}>&amp;</p>
              <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 52, color: templates[activeTemplate].accent, lineHeight: 1, margin: "0 0 24px", textShadow: `0 0 20px ${templates[activeTemplate].accent}50` }}>Rahul</p>
              <div style={{ padding: "12px 20px", border: `1px solid ${templates[activeTemplate].accent}30`, background: `${templates[activeTemplate].accent}08`, display: "inline-block" }}>
                <p style={{ color: templates[activeTemplate].accent, fontSize: 10, opacity: 0.8, fontStyle: "italic", fontFamily: "'Cormorant Garamond',serif" }}>February 14, 2026 · 7:00 PM</p>
                <p style={{ color: templates[activeTemplate].accent, fontSize: 9, opacity: 0.6, marginTop: 3, fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.2em" }}>The Taj Palace, Mumbai</p>
              </div>

              {/* Template badge */}
              <div style={{ position: "absolute", top: 14, right: 14, padding: "4px 12px", borderRadius: 3, background: `${templates[activeTemplate].accent}15`, border: `1px solid ${templates[activeTemplate].accent}30` }}>
                <span style={{ color: templates[activeTemplate].accent, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif" }}>{templates[activeTemplate].tag}</span>
              </div>
            </div>
          </div>

          {/* Template info */}
          <div>
            <div style={{ display: "inline-block", padding: "5px 14px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 3, marginBottom: 20 }}>
              <span style={{ color: "#c9a84c", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase" }}>Template {activeTemplate + 1} of {templates.length}</span>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, color: "#fff", fontWeight: 400, marginBottom: 8 }}>{templates[activeTemplate].name}</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, lineHeight: 1.7, marginBottom: 28, fontFamily: "'Cormorant Garamond',serif" }}>{templates[activeTemplate].desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
              {["Full names, date, time, venue", "Family details — both sides", "Photo gallery up to 10 photos", "Love story & personal message", "RSVP contact & deadline"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "#c9a84c", fontSize: 9 }}>✓</span>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" style={{ padding: "13px 32px", borderRadius: 6, background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", color: "#060410", textDecoration: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", display: "inline-block" }}>
              Enquire About This Design
            </Link>
          </div>
        </div>

        {/* Template dots nav */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
          {templates.map((_, i) => (
            <button key={i} onClick={() => setActiveTemplate(i)} style={{ width: i === activeTemplate ? 28 : 8, height: 8, borderRadius: 4, background: i === activeTemplate ? "#c9a84c" : "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════════ */}
      <section style={{ padding: "80px 60px", background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c9a84c", textAlign: "center", marginBottom: 12 }}>What's Inside</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,3.5vw,44px)", textAlign: "center", color: "#fff", margin: "0 0 56px", fontWeight: 400 }}>
            Everything your card needs.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1 }}>
            {[
              { icon: "💌", title: "Instant Shareable Link", desc: "One link — opens on any phone, no app download needed." },
              { icon: "📸", title: "Photo Gallery", desc: "Upload up to 10 photos of the couple to set the mood." },
              { icon: "🎨", title: "15 Premium Templates", desc: "Choose from 15 unique handcrafted designs — from regal gold to tropical & festive." },
              { icon: "👨‍👩‍👧‍👦", title: "Full Family Details", desc: "Add names and relations for both bride & groom families." },
              { icon: "⏳", title: "Live Countdown Timer", desc: "Guests see a live countdown to the wedding day." },
              { icon: "📍", title: "Google Maps Link", desc: "Venue address links directly to Google Maps." },
              { icon: "📱", title: "Mobile Optimised", desc: "Looks stunning on every screen size, every phone." },
              { icon: "🔒", title: "Private & Secure", desc: "Only people with your link can see your invitation." },
              { icon: "✍️", title: "Your Love Story", desc: "A personal message section to move your guests." },
            ].map((f, i) => (
              <div key={i} style={{ padding: "28px 24px", background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", transitionProperty: "background", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.04)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.015)")}>
                <div style={{ fontSize: 26, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 14, color: "#ddd", marginBottom: 8, fontWeight: 500 }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════ */}
      <section id="pricing" style={{ padding: "100px 60px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 12 }}>Transparent Pricing</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", color: "#fff", margin: "0 0 12px", fontWeight: 400 }}>
            One card. One price.<br /><em>Share forever.</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, marginBottom: 52, fontFamily: "'Cormorant Garamond',serif" }}>No subscriptions. No hidden fees. Pay once, keep forever.</p>

          <div style={{ border: "1px solid rgba(201,168,76,0.25)", background: "rgba(201,168,76,0.04)", position: "relative", padding: "48px 40px" }}>
            {/* Top accent line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#c9a84c,transparent)" }} />

            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em", textTransform: "uppercase" }}>Digital Wedding Card</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4, margin: "20px 0 8px" }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "#c9a84c", fontWeight: 400 }}>₹</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 80, color: "#c9a84c", lineHeight: 1, fontWeight: 700 }}>999</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginBottom: 36 }}>per invitation · one-time payment</p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32, marginBottom: 36 }}>
              {[
                "15 premium template designs",
                "Full family details — both sides",
                "Photo gallery (up to 10 photos)",
                "Countdown timer for guests",
                "Google Maps venue link",
                "Love story / personal message",
                "RSVP contact & deadline",
                "Shareable link — forever",
                "Mobile-optimised design",
              ].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "#c9a84c", fontSize: 12, flexShrink: 0 }}>✓</span>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, textAlign: "left" }}>{f}</span>
                </div>
              ))}
            </div>

            <Link href="/contact" style={{ display: "block", padding: "16px", background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", color: "#060410", textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center" }}>
              Contact Us to Order →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MULTI-LANGUAGE SECTION
      ══════════════════════════════════════════ */}
      <section style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.04)", overflow: "hidden", position: "relative" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", padding: "0 60px", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 4, marginBottom: 24, background: "rgba(201,168,76,0.04)" }}>
            <span style={{ fontSize: 16 }}>🌐</span>
            <span style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a84c" }}>8 Languages · One Invitation</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,54px)", color: "#fff", fontWeight: 400, margin: "0 0 20px", lineHeight: 1.15 }}>
            Your Guests Read It<br />
            <em style={{ background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>In Their Language</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1.8, fontFamily: "'Cormorant Garamond',serif", maxWidth: 600, margin: "0 auto" }}>
            Send one link. Your invitation speaks to every guest in the language closest to their heart — whether it&apos;s Telugu, Urdu, Tamil or Marathi.
          </p>
        </div>

        {/* Marquee row 1 — scrolls left */}
        <div style={{ position: "relative", marginBottom: 3 }}>
          <div style={{ display: "flex", gap: 3, animation: "marquee-left 28s linear infinite", width: "max-content" }}>
            {[...Array(2)].flatMap(() => [
              { lang: "తెలుగు",   phrase: "కలిసి చేసుకునే వేడుకకు ఆహ్వానం",   flag: "🌟", color: "#f4a261" },
              { lang: "हिंदी",    phrase: "विवाह में पधारने का निमंत्रण",      flag: "🇮🇳", color: "#e76f51" },
              { lang: "English",  phrase: "Join us to celebrate our wedding",  flag: "🇬🇧", color: "#c9a84c" },
              { lang: "தமிழ்",   phrase: "திருமண விழாவிற்கு அன்புடன் அழைக்கிறோம்", flag: "🌺", color: "#e9c46a" },
              { lang: "मराठी",   phrase: "लग्नसोहळ्यास हार्दिक आमंत्रण",     flag: "🧡", color: "#2a9d8f" },
              { lang: "اردو",    phrase: "شادی کی تقریب میں خوش آمدید",       flag: "☪️", color: "#c9a84c" },
              { lang: "ಕನ್ನಡ",   phrase: "ವಿವಾಹ ಸಮಾರಂಭಕ್ಕೆ ಸ್ವಾಗತ",        flag: "💛", color: "#f4a261" },
              { lang: "മലയാളം", phrase: "വിവാഹ വിരുന്നിലേക്ക് ക്ഷണിക്കുന്നു", flag: "🌴", color: "#52b788" },
            ]).map((item, i) => (
              <div key={i} style={{ flexShrink: 0, padding: "18px 28px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, minWidth: 260, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${item.color}60,transparent)` }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{item.flag}</span>
                  <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: item.color }}>{item.lang}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.5, fontFamily: "'Noto Sans',sans-serif" }}>{item.phrase}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee row 2 — scrolls right */}
        <div style={{ position: "relative", marginBottom: 60 }}>
          <div style={{ display: "flex", gap: 3, animation: "marquee-right 34s linear infinite", width: "max-content" }}>
            {[...Array(2)].flatMap(() => [
              { lang: "हिंदी",    phrase: "हमारे परिवारों के आशीर्वाद से",    flag: "🇮🇳", color: "#e76f51" },
              { lang: "ಕನ್ನಡ",   phrase: "ನಮ್ಮ ಕುಟುಂಬಗಳ ಆಶೀರ್ವಾದದೊಂದಿಗೆ",   flag: "💛", color: "#f4a261" },
              { lang: "English",  phrase: "With the blessings of our families", flag: "🇬🇧", color: "#c9a84c" },
              { lang: "மலயாளம",  phrase: "ഞങ്ങളുടെ കുടുംബങ്ങളുടെ ആശീർ",    flag: "🌴", color: "#52b788" },
              { lang: "తెలుగు",   phrase: "మా కుటుంబాల ఆశీర్వాదాలతో",        flag: "🌟", color: "#f4a261" },
              { lang: "اردو",    phrase: "ہمارے خاندانوں کی دعاؤں کے ساتھ",  flag: "☪️", color: "#c9a84c" },
              { lang: "मराठी",   phrase: "आमच्या कुटुंबाच्या आशीर्वादाने",    flag: "🧡", color: "#2a9d8f" },
              { lang: "தமிழ்",   phrase: "எங்கள் குடும்பங்களின் ஆசியுடன்",   flag: "🌺", color: "#e9c46a" },
            ]).map((item, i) => (
              <div key={i} style={{ flexShrink: 0, padding: "18px 28px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, minWidth: 260, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${item.color}60,transparent)` }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{item.flag}</span>
                  <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: item.color }}>{item.lang}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.5, fontFamily: "'Noto Sans',sans-serif" }}>{item.phrase}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Language pill grid */}
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", padding: "0 60px" }}>
          {[
            { flag: "🇬🇧", name: "English",   native: "English" },
            { flag: "🇮🇳", name: "Hindi",     native: "हिंदी" },
            { flag: "🌟", name: "Telugu",    native: "తెలుగు" },
            { flag: "🧡", name: "Marathi",   native: "मराठी" },
            { flag: "💛", name: "Kannada",   native: "ಕನ್ನಡ" },
            { flag: "🌴", name: "Malayalam", native: "മലയാളം" },
            { flag: "🌺", name: "Tamil",     native: "தமிழ்" },
            { flag: "☪️", name: "Urdu",      native: "اردو" },
          ].map(l => (
            <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 40, background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.18)" }}>
              <span style={{ fontSize: 18 }}>{l.flag}</span>
              <span style={{ color: "#c9a84c", fontSize: 12, fontWeight: 600 }}>{l.name}</span>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>{l.native}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section style={{ padding: "80px 60px", borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c9a84c", textAlign: "center", marginBottom: 12 }}>Happy Couples</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,3.5vw,44px)", textAlign: "center", color: "#fff", margin: "0 0 52px", fontWeight: 400 }}>
            They made the switch to digital.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1 }}>
            {[
              { name: "Priya & Rahul", city: "Mumbai", text: "Our guests were amazed. No one could believe it was a digital card — it looked more beautiful than printed ones. Shared on WhatsApp and it went to 200+ people in minutes." },
              { name: "Anjali & Vikram", city: "Pune", text: "The Art Deco template was exactly what we wanted. Classy, luxurious, and so easy to set up. Everyone kept asking which designer made it!", highlight: true },
              { name: "Sneha & Arjun", city: "Bangalore", text: "We saved money on printing and every guest confirmed they got the details correctly. The countdown timer feature was the best — guests loved it!" },
            ].map((t) => (
              <div key={t.name} style={{ padding: "36px 32px", background: t.highlight ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.01)", border: "1px solid", borderColor: t.highlight ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.05)", position: "relative" }}>
                {t.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#c9a84c,transparent)" }} />}
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 30, lineHeight: 1, marginBottom: 16, fontFamily: "'Playfair Display',serif" }}>&ldquo;</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.9, fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", marginBottom: 24 }}>{t.text}</p>
                <div>
                  <p style={{ color: "#c9a84c", fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{t.name}</p>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, letterSpacing: "0.15em" }}>{t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA — BOLD FULL-WIDTH
      ══════════════════════════════════════════ */}
      <section style={{ padding: "120px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        {/* Decorative lines */}
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.1),transparent)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 24 }}>Start Today</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,6vw,80px)", color: "#fff", margin: "0 0 20px", fontWeight: 400, lineHeight: 1.1 }}>
            Your guests deserve<br />
            <em style={{ fontStyle: "italic", background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              a card that wows.
            </em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, maxWidth: 480, margin: "0 auto 48px", fontFamily: "'Cormorant Garamond',serif", lineHeight: 1.8 }}>
            Create your digital wedding card in under 5 minutes. Share it with everyone. Make it unforgettable.
          </p>
          <Link href="/contact" style={{
            padding: "18px 56px", background: "linear-gradient(135deg,#c9a84c,#e8d5a3)",
            color: "#060410", textDecoration: "none", fontSize: 13, fontWeight: 700,
            letterSpacing: "0.25em", textTransform: "uppercase",
            boxShadow: "0 16px 48px rgba(201,168,76,0.25)",
            display: "inline-block",
          }}>
            ✦ &nbsp; Contact Us to Get Started &nbsp; ✦
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40 }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="7" fill="rgba(201,168,76,0.1)" />
                <path d="M14 6L16.5 11.5H22L17.5 15L19.5 21L14 17.5L8.5 21L10.5 15L6 11.5H11.5L14 6Z" fill="#c9a84c" />
              </svg>
              <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: 22, color: "#c9a84c" }}>Digi Invites</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, lineHeight: 1.7 }}>India&apos;s digital wedding card platform. Beautiful, instant, and paperless.</p>
          </div>
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16 }}>Navigate</p>
              {[["/#how","How It Works"],["/#compare","Why Digital"],["/#templates","Templates"],["/#pricing","Pricing"]].map(([href, label]) => (
                <div key={href} style={{ marginBottom: 10 }}>
                  <a href={href} style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: 13, transitionProperty: "color", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                    {label}
                  </a>
                </div>
              ))}
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16 }}>Company</p>
              {[["/about","About Us"],["/contact","Contact"],["/privacy","Privacy Policy"]].map(([href, label]) => (
                <div key={href} style={{ marginBottom: 10 }}>
                  <Link href={href} style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: 13, transitionProperty: "color", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                    {label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "32px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>© 2025 Digi Invites. All rights reserved.</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.25em" }}>✦ CRAFTED WITH LOVE ✦</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
              Developed in collaboration with <span style={{ color: "#c9a84c" }}>AK Tech Dev Solutions</span> &amp; <span style={{ color: "#c9a84c" }}>Morphiq Media</span>
            </p>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════
          GLOBAL KEYFRAMES
      ══════════════════════════════════════════ */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-10px); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 900px) {
          @keyframes marquee-left  { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        @keyframes marquee-right { 0% { transform: translateX(-50%) } 100% { transform: translateX(0) } }
        }
      `}</style>
    </div>
  );
}
