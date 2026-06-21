"use client";
import { TemplateProps } from "@/lib/types";
import { useState, useEffect, useRef } from "react";
import PhotoGallery, { GalleryStyle, Fillet } from "@/components/PhotoGallery";
import GalleryDisplay from "@/components/GalleryDisplay";
import { TRANSLATIONS, DEFAULT_LANG, SupportedLang } from "@/lib/translations";

/* ═══════════════════════════════════════════════════════════════════════════
   BUTTERFLY — direct DOM manipulation, zero React state in the RAF loop
   Wing flap = pure CSS animation on <svg> children, no JS involvement
   Position = wrapperEl.style.transform  (GPU composited, 60fps)
══════════════════════════════════════════════════════════════════════════ */

const BUTTERFLY_HTML = (color: string) => {
  const c2 = color + "bb";
  const c3 = color + "44";
  // All right-wing paths are manually reflected around x=60 (x → 120-x)
  return `
<svg id="bf-svg" width="100" height="84" viewBox="0 0 120 100"
  style="display:block;filter:drop-shadow(0 3px 16px ${color}99);overflow:visible">
  <defs>
    <radialGradient id="bgl" cx="30%" cy="35%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bgr" cx="70%" cy="35%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- ══ LEFT wings — animate scaleX 1→0.12 around body (x=60) ══ -->
  <g id="bf-left" style="transform-box:fill-box;transform-origin:100% 52px;animation:bf-flap-l 0.44s ease-in-out infinite">
    <!-- upper left wing -->
    <path d="M60,52 C55,34 42,7 14,12 C2,27 7,50 28,56 C42,61 57,54 60,52Z"
      fill="${color}" opacity="0.92"/>
    <path d="M60,52 C55,34 42,7 14,12 C2,27 7,50 28,56 C42,61 57,54 60,52Z"
      fill="url(#bgl)"/>
    <!-- eyespot upper left -->
    <circle cx="27" cy="31" r="8.5" fill="${c3}"/>
    <circle cx="27" cy="31" r="5"   fill="#0d0418" opacity="0.6"/>
    <circle cx="24" cy="28" r="2"   fill="#fff" opacity="0.9"/>
    <!-- veins upper left -->
    <path d="M60,52 C46,37 28,24 15,19" stroke="${c2}" stroke-width="0.9" fill="none"/>
    <path d="M60,52 C42,46 23,43 13,42" stroke="${c2}" stroke-width="0.7" fill="none"/>
    <!-- lower left wing -->
    <path d="M60,55 C47,59 26,63 15,79 C25,95 48,89 57,79 C63,71 61,57 60,55Z"
      fill="${c2}"/>
    <circle cx="33" cy="76" r="6.5" fill="${c3}"/>
    <circle cx="33" cy="76" r="3.2" fill="#0d0418" opacity="0.45"/>
    <!-- border shimmer left -->
    <path d="M60,52 C55,34 42,7 14,12 C2,27 7,50 28,56 C42,61 57,54 60,52Z"
      fill="none" stroke="#fff" stroke-width="0.5" opacity="0.35"/>
  </g>

  <!-- ══ RIGHT wings — mirror: each x → 120-x, animate scaleX 1→0.12 ══ -->
  <g id="bf-right" style="transform-box:fill-box;transform-origin:0% 52px;animation:bf-flap-r 0.44s ease-in-out infinite">
    <!-- upper right wing (left paths mirrored: x → 120-x) -->
    <path d="M60,52 C65,34 78,7 106,12 C118,27 113,50 92,56 C78,61 63,54 60,52Z"
      fill="${color}" opacity="0.92"/>
    <path d="M60,52 C65,34 78,7 106,12 C118,27 113,50 92,56 C78,61 63,54 60,52Z"
      fill="url(#bgr)"/>
    <!-- eyespot upper right -->
    <circle cx="93" cy="31" r="8.5" fill="${c3}"/>
    <circle cx="93" cy="31" r="5"   fill="#0d0418" opacity="0.6"/>
    <circle cx="96" cy="28" r="2"   fill="#fff" opacity="0.9"/>
    <!-- veins upper right -->
    <path d="M60,52 C74,37 92,24 105,19" stroke="${c2}" stroke-width="0.9" fill="none"/>
    <path d="M60,52 C78,46 97,43 107,42" stroke="${c2}" stroke-width="0.7" fill="none"/>
    <!-- lower right wing -->
    <path d="M60,55 C73,59 94,63 105,79 C95,95 72,89 63,79 C57,71 59,57 60,55Z"
      fill="${c2}"/>
    <circle cx="87" cy="76" r="6.5" fill="${c3}"/>
    <circle cx="87" cy="76" r="3.2" fill="#0d0418" opacity="0.45"/>
    <!-- border shimmer right -->
    <path d="M60,52 C65,34 78,7 106,12 C118,27 113,50 92,56 C78,61 63,54 60,52Z"
      fill="none" stroke="#fff" stroke-width="0.5" opacity="0.35"/>
  </g>

  <!-- ══ BODY ══ -->
  <ellipse cx="60" cy="60" rx="4"   ry="22" fill="#1a0a2e"/>
  <ellipse cx="60" cy="60" rx="2.2" ry="11" fill="${color}" opacity="0.3"/>
  <!-- Head -->
  <circle cx="60" cy="36" r="6"   fill="#1a0a2e"/>
  <circle cx="60" cy="36" r="3"   fill="${color}" opacity="0.4"/>
  <!-- Antennae -->
  <path d="M57,32 Q47,17 39,8"  stroke="#1a0a2e" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <path d="M63,32 Q73,17 81,8"  stroke="#1a0a2e" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <circle cx="38" cy="7"  r="3.5" fill="#1a0a2e"/>
  <circle cx="82" cy="7"  r="3.5" fill="#1a0a2e"/>
  <!-- Antenna glow tips -->
  <circle cx="38" cy="7"  r="2"   fill="${color}" opacity="0.85"/>
  <circle cx="82" cy="7"  r="2"   fill="${color}" opacity="0.85"/>
</svg>`;
};

/* CSS keyframes — scaleX only, transform-box:fill-box keeps origin at wing root */
const BUTTERFLY_CSS = `
@keyframes bf-flap-l {
  0%,100% { transform: scaleX(1);    }
  50%      { transform: scaleX(0.1); }
}
@keyframes bf-flap-r {
  0%,100% { transform: scaleX(1);    }
  50%      { transform: scaleX(0.1); }
}
@keyframes bf-idle-l {
  0%,100% { transform: scaleX(1);    }
  50%      { transform: scaleX(0.6); }
}
@keyframes bf-idle-r {
  0%,100% { transform: scaleX(1);    }
  50%      { transform: scaleX(0.6); }
}
`;

/* ── Bezier math ── */
interface V2 { x: number; y: number }
function bez(p0: V2, c1: V2, c2: V2, p3: V2, t: number): V2 {
  const m = 1 - t;
  return {
    x: m*m*m*p0.x + 3*m*m*t*c1.x + 3*m*t*t*c2.x + t*t*t*p3.x,
    y: m*m*m*p0.y + 3*m*m*t*c1.y + 3*m*t*t*c2.y + t*t*t*p3.y,
  };
}
function bezTan(p0: V2, c1: V2, c2: V2, p3: V2, t: number): V2 {
  const m = 1 - t;
  return {
    x: 3*(m*m*(c1.x-p0.x)+2*m*t*(c2.x-c1.x)+t*t*(p3.x-c2.x)),
    y: 3*(m*m*(c1.y-p0.y)+2*m*t*(c2.y-c1.y)+t*t*(p3.y-c2.y)),
  };
}
function makeCurve(from: V2, to: V2, speed = 3.5) {
  const dist = Math.hypot(to.x-from.x, to.y-from.y);
  const mx   = (from.x+to.x)/2, my = (from.y+to.y)/2;
  const px   = -(to.y-from.y)/Math.max(dist,1), py = (to.x-from.x)/Math.max(dist,1);
  const bow  = dist * (0.25 + Math.random()*0.35) * (Math.random()>.5?1:-1);
  return {
    p0: from,
    c1: { x: from.x+(to.x-from.x)*.22 + px*bow*.55, y: from.y+(to.y-from.y)*.22 + py*bow*.55 },
    c2: { x: mx+px*bow, y: my+py*bow },
    p3: to, t: 0,
    dur: Math.max(55, dist/speed),
  };
}
function easeIO(t: number) { return t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; }

/* ── React component — mounts one real DOM butterfly ── */
function ButterflyEngine({ color, targets }: { color: string; targets: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    /* Inject HTML & CSS once */
    wrap.innerHTML = BUTTERFLY_HTML(color);
    const styleEl = document.createElement("style");
    styleEl.textContent = BUTTERFLY_CSS;
    document.head.appendChild(styleEl);

    const leftWing  = wrap.querySelector("#bf-left")  as SVGGElement | null;
    const rightWing = wrap.querySelector("#bf-right") as SVGGElement | null;

    /* Start position — top-left area, just below viewport top */
    let pos: V2 = { x: window.innerWidth * 0.12, y: window.scrollY + 80 };
    let rot  = 0;
    let path = makeCurve(pos, { x: window.innerWidth*0.55, y: window.scrollY+180 });
    let state: "flying"|"landing"|"landed"|"takeoff" = "flying";
    let landedIdx  = -1;
    let idleT      = 0;
    let landTarget: V2 = { x: 0, y: 0 };
    let driftT     = 0;
    let raf        = 0;

    /* Resolve a CSS selector to absolute page coordinates */
    function resolveTarget(sel: string): V2 | null {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      /* land just right of the element centre, slightly above */
      return {
        x: r.left + r.width * 0.65 + window.scrollX,
        y: r.top  + r.height * 0.1 + window.scrollY,
      };
    }

    /* Apply idle animation on wings when landed */
    function setIdleWings(on: boolean) {
      if (!leftWing || !rightWing) return;
      if (on) {
        leftWing.style.animation  = "bf-idle-l 1.1s ease-in-out infinite";
        rightWing.style.animation = "bf-idle-r 1.1s ease-in-out infinite";
      } else {
        leftWing.style.animation  = "bf-flap-l 0.44s ease-in-out infinite";
        rightWing.style.animation = "bf-flap-r 0.44s ease-in-out infinite";
      }
    }

    /* Main RAF loop — only touches style.transform, never setState */
    function tick() {
      raf = requestAnimationFrame(tick);
      driftT += 0.017;
      let x = pos.x, y = pos.y;

      if (state === "flying" || state === "takeoff") {
        if (!path || path.t >= 1) {
          /* Wander to a random nearby point */
          path = makeCurve(pos, {
            x: 60  + Math.random() * (window.innerWidth - 180),
            y: window.scrollY + 60 + Math.random() * (window.innerHeight * 0.55),
          }, state === "takeoff" ? 4 : 3.2);
          if (state === "takeoff") state = "flying";
        }
        path.t = Math.min(1, path.t + 1/path.dur);
        const pt  = bez(path.p0, path.c1, path.c2, path.p3, easeIO(path.t));
        const tan = bezTan(path.p0, path.c1, path.c2, path.p3, Math.min(.99, path.t));
        rot = Math.atan2(tan.y, tan.x) * (180/Math.PI);
        /* organic micro-wobble layered on top */
        x = pt.x + Math.sin(driftT*1.4)*4;
        y = pt.y + Math.cos(driftT*0.9)*5;

      } else if (state === "landing") {
        if (!path || path.t >= 1) { state = "landed"; idleT = 0; setIdleWings(true); pos = landTarget; return; }
        path.t = Math.min(1, path.t + 1/path.dur);
        const ease = easeIO(path.t);
        const pt   = bez(path.p0, path.c1, path.c2, path.p3, ease);
        x = pt.x; y = pt.y;
        rot = rot * 0.93; /* straighten up as we land */
        if (path.t >= 1) { state = "landed"; idleT = 0; setIdleWings(true); pos = landTarget; }

      } else if (state === "landed") {
        idleT++;
        /* Subtle body bob */
        x = pos.x + Math.sin(idleT*0.04)*1.2;
        y = pos.y + Math.cos(idleT*0.035)*1.8;
        rot = Math.sin(idleT*0.025)*3;
      }

      pos = { x, y };
      wrap.style.transform = `translate(${x}px,${y}px) rotate(${rot}deg)`;
    }

    raf = requestAnimationFrame(tick);

    /* Scroll listener — check which target is near viewport centre */
    let lastIdx = -1;
    function onScroll() {
      const vc = window.scrollY + window.innerHeight * 0.42;
      let found = -1;

      targets.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return;
        const r   = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        if (vc >= top - 80 && vc < top + r.height + 80) found = i;
      });

      if (found === lastIdx) return;
      lastIdx = found;

      if (found >= 0) {
        const t = resolveTarget(targets[found]);
        if (!t) return;
        landTarget  = t;
        landedIdx   = found;
        state       = "landing";
        setIdleWings(false);
        path = makeCurve({ ...pos }, t, 5.5);
      } else {
        if (state === "landed" || state === "landing") {
          landedIdx = -1;
          setIdleWings(false);
          state = "takeoff";
          path  = makeCurve({ ...pos }, {
            x: 80 + Math.random()*(window.innerWidth-220),
            y: window.scrollY + 80 + Math.random()*160,
          }, 5);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      styleEl.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        userSelect: "none",
        willChange: "transform",
        /* start offscreen — JS positions immediately */
        transform: "translate(-200px,-200px)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   useReveal
═══════════════════════════════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    el.querySelectorAll(".t15-reveal,.t15-reveal-l,.t15-reveal-r").forEach(c => io.observe(c));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEMPLATE 15 — Butterfly Garden
═══════════════════════════════════════════════════════════════════════════ */
export default function Template15({ invitation, isPreview }: TemplateProps) {
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

  const hGS = (heroGalleryStyle || galleryStyle || "slideshow") as GalleryStyle;
  const hGF = (heroGalleryFillet || galleryFillet || "soft") as Fillet;
  const sGS = (storyGalleryStyle || galleryStyle || "slideshow") as GalleryStyle;
  const sGF = (storyGalleryFillet || galleryFillet || "soft") as Fillet;
  const bGS = (brideFamilyGalleryStyle || galleryStyle || "slideshow") as GalleryStyle;
  const bGF = (brideFamilyGalleryFillet || galleryFillet || "soft") as Fillet;
  const gGS = (groomFamilyGalleryStyle || galleryStyle || "slideshow") as GalleryStyle;
  const gGF = (groomFamilyGalleryFillet || galleryFillet || "soft") as Fillet;

  const t   = TRANSLATIONS[(lang as SupportedLang) || DEFAULT_LANG] || TRANSLATIONS[DEFAULT_LANG];
  const ls  = (s: string) => t === TRANSLATIONS["english"] ? s : "0";
  const tt  = (s: string) => t === TRANSLATIONS["english"] ? s : "none";

  const gold       = accentColor || "#c9a84c";
  const sage       = "#4a6741";
  const cream      = "#fdf9f4";
  const bark       = "#2d1e0f";
  const mossLight  = "#7a9e6e";
  const blush      = "#f5e6da";
  const scriptFont = fontFamily ? `'${fontFamily}',cursive,serif` : "'Great Vibes',cursive";

  const heroRef   = useReveal();
  const venueRef  = useReveal();
  const storyRef  = useReveal();
  const biosRef   = useReveal();
  const familyRef = useReveal();
  const eventsRef = useReveal();
  const rsvpRef   = useReveal();

  const [cd, setCd] = useState({ days:0, hours:0, minutes:0, seconds:0 });
  useEffect(() => {
    if (!date || isPreview) return;
    const tgt = new Date(date+"T"+(time||"00:00")+":00");
    const tick = () => {
      const diff = tgt.getTime()-Date.now(); if (diff<=0) return;
      const s = Math.floor(diff/1000);
      setCd({ days: Math.floor(s/86400), hours: Math.floor((s%86400)/3600), minutes: Math.floor((s%3600)/60), seconds: s%60 });
    };
    tick(); const id = setInterval(tick,1000); return () => clearInterval(id);
  }, [date, time, isPreview]);

  const fmt = (d: string) => {
    if (!d) return "";
    try { return new Date(d+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}); }
    catch { return d; }
  };
  const fmtT = (v: string) => {
    if (!v) return "";
    try { const [h,m]=v.split(":").map(Number); return `${h%12||12}:${String(m).padStart(2,"0")} ${h>=12?"PM":"AM"}`; }
    catch { return v; }
  };

  /* Landing selectors — butterfly visits each in order as user scrolls */
  const landingTargets = [
    "[data-bf='bride-name']",
    "[data-bf='groom-name']",
    "[data-bf='venue-name']",
    "[data-bf='story-head']",
    "[data-bf='rsvp-head']",
  ];

  /* ── Decorative SVGs ── */
  const Sprig = ({ style }: { style?: React.CSSProperties }) => (
    <svg width="80" height="96" viewBox="0 0 80 96" style={{ opacity:0.22, pointerEvents:"none", ...style }}>
      <path d="M40,90 Q40,50 40,10" stroke={sage} strokeWidth="2" fill="none"/>
      <path d="M40,70 Q25,58 12,62" stroke={sage} strokeWidth="1.5" fill="none"/>
      <path d="M40,55 Q55,43 68,47" stroke={sage} strokeWidth="1.5" fill="none"/>
      <path d="M40,38 Q26,26 16,30" stroke={sage} strokeWidth="1.5" fill="none"/>
      <ellipse cx="40" cy="10" rx="6" ry="9" fill={sage}/>
      <ellipse cx="12" cy="62" rx="7" ry="5" fill={sage} transform="rotate(-20,12,62)"/>
      <ellipse cx="68" cy="47" rx="7" ry="5" fill={sage} transform="rotate(20,68,47)"/>
      <ellipse cx="16" cy="30" rx="7" ry="5" fill={sage} transform="rotate(-25,16,30)"/>
    </svg>
  );
  const WreathTop = () => (
    <svg width="340" height="72" viewBox="0 0 340 72" style={{ display:"block", margin:"0 auto", opacity:0.3 }}>
      <path d="M20,65 Q80,10 170,8 Q260,10 320,65" stroke={sage} strokeWidth="2.5" fill="none"/>
      {[35,75,115,170,225,265,305].map((x,i)=>(
        <ellipse key={i} cx={x} cy={18+Math.sin(i)*7} rx="9" ry="5.5"
          fill={sage} transform={`rotate(${-30+i*10},${x},${18+Math.sin(i)*7})`}/>
      ))}
      {[55,95,135,170,205,245,285].map((x,i)=>(
        <circle key={i} cx={x} cy={13+Math.cos(i)*5} r="3.5" fill={gold} opacity="0.55"/>
      ))}
    </svg>
  );
  const Divider = () => (
    <div style={{ display:"flex", alignItems:"center", gap:14, padding:"0 32px", marginBottom:32 }}>
      <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${gold}55)` }}/>
      <svg width="28" height="28" viewBox="0 0 28 28">
        <path d="M14,2 Q18,10 26,12 Q18,14 20,22 Q14,16 8,22 Q10,14 2,12 Q10,10 14,2Z" fill={gold} opacity="0.65"/>
      </svg>
      <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${gold}55,transparent)` }}/>
    </div>
  );

  return (
    <div style={{ background:cream, fontFamily:"'Montserrat',sans-serif", color:bark, overflowX:"hidden", position:"relative" }}>

      {/* ── Butterfly engine ── */}
      {!isPreview && <ButterflyEngine color={gold} targets={landingTargets}/>}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500&display=swap');
        .t15-reveal   { opacity:0; transform:translateY(22px); transition-property:opacity,transform; transition-duration:.85s; transition-timing-function:cubic-bezier(.22,1,.36,1); }
        .t15-reveal.visible   { opacity:1; transform:none; }
        .t15-reveal-l { opacity:0; transform:translateX(-26px); transition-property:opacity,transform; transition-duration:.85s; transition-timing-function:cubic-bezier(.22,1,.36,1); }
        .t15-reveal-l.visible { opacity:1; transform:none; }
        .t15-reveal-r { opacity:0; transform:translateX(26px);  transition-property:opacity,transform; transition-duration:.85s; transition-timing-function:cubic-bezier(.22,1,.36,1); }
        .t15-reveal-r.visible { opacity:1; transform:none; }
        @keyframes t15-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes t15-spin  { to{transform:rotate(360deg)} }
      `}</style>

      {/* ══════════════════════════════ HERO */}
      <div ref={heroRef} style={{
        minHeight: isPreview ? "auto" : "100vh",
        background:`linear-gradient(175deg,${cream} 0%,${blush} 55%,${cream} 100%)`,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        padding: isPreview ? "48px 24px 32px" : "80px 40px 64px",
        textAlign:"center", position:"relative", overflow:"hidden",
      }}>
        {!isPreview && <>
          <Sprig style={{ position:"absolute", top:16, left:12, transform:"rotate(-30deg)" }}/>
          <Sprig style={{ position:"absolute", top:16, right:12, transform:"rotate(30deg) scaleX(-1)" }}/>
          <Sprig style={{ position:"absolute", bottom:16, left:12, transform:"rotate(20deg)" }}/>
          <Sprig style={{ position:"absolute", bottom:16, right:12, transform:"rotate(-20deg) scaleX(-1)" }}/>
        </>}

        <WreathTop/>

        <p className="t15-reveal" style={{ fontSize:9, letterSpacing:ls("0.45em"), textTransform:tt("uppercase") as any, color:mossLight, margin:"12px 0 8px", fontWeight:500 }}>
          {t.togetherWithFamilies}
        </p>

        {/* ← butterfly lands here on the bride name */}
        <h1 data-bf="bride-name" className="t15-reveal" style={{
          fontFamily:scriptFont, fontSize: isPreview ? 62 : 108, color:sage,
          lineHeight:.95, margin:"0 0 4px", textShadow:`0 2px 28px ${sage}33`,
          animation: isPreview ? "none" : "t15-float 4.2s ease-in-out infinite",
          display:"inline-block",
        }}>{brideName || "Bride"}</h1>

        <div className="t15-reveal" style={{ display:"flex", alignItems:"center", gap:18, margin:"10px 0" }}>
          <div style={{ height:1, width:52, background:`linear-gradient(90deg,transparent,${gold})` }}/>
          <svg width="22" height="22" viewBox="0 0 22 22" style={{ animation:"t15-spin 14s linear infinite", flexShrink:0 }}>
            <path d="M11,1 L12.5,8.5 L20,11 L12.5,13.5 L11,21 L9.5,13.5 L2,11 L9.5,8.5Z" fill={gold} opacity="0.75"/>
          </svg>
          <div style={{ height:1, width:52, background:`linear-gradient(90deg,${gold},transparent)` }}/>
        </div>

        {/* ← butterfly also lands here on groom name */}
        <h1 data-bf="groom-name" className="t15-reveal" style={{
          fontFamily:scriptFont, fontSize: isPreview ? 62 : 108, color:sage,
          lineHeight:.95, margin:"4px 0 24px", textShadow:`0 2px 28px ${sage}33`,
          animation: isPreview ? "none" : "t15-float 4.2s ease-in-out .5s infinite",
          display:"inline-block",
        }}>{groomName || "Groom"}</h1>

        <p className="t15-reveal" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isPreview ? 14 : 20, color:bark, opacity:.65, marginBottom:28, fontStyle:"italic", maxWidth:400 }}>
          {t.requestPleasure}
        </p>

        {date && (
          <div className="t15-reveal" style={{
            display:"inline-flex", flexDirection:"column", alignItems:"center",
            padding:"18px 38px", border:`1px solid ${gold}55`, borderRadius:2,
            background:"rgba(255,255,255,0.72)", backdropFilter:"blur(10px)", gap:5, marginBottom:28,
          }}>
            <p style={{ fontSize:9, letterSpacing:ls("0.4em"), textTransform:tt("uppercase") as any, color:mossLight, marginBottom:3 }}>{t.weddingCeremony}</p>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isPreview ? 16 : 23, color:sage, fontWeight:600 }}>{fmt(date)}</p>
            {time && <p style={{ fontSize:12, color:bark, opacity:.5 }}>{fmtT(time)}</p>}
          </div>
        )}

        {heroImageUrls.length > 0 && (
          <div className="t15-reveal" style={{ width:"100%", maxWidth:480, borderRadius:14, overflow:"hidden", boxShadow:"0 18px 52px rgba(0,0,0,0.13)", marginTop:12 }}>
            <PhotoGallery images={heroImageUrls} style={hGS} fillet={hGF} accentColor={gold} isPreview={isPreview} />
          </div>
        )}

        {!isPreview && date && (
          <div className="t15-reveal" style={{ display:"flex", gap:24, marginTop:32 }}>
            {[{v:cd.days,l:t.days},{v:cd.hours,l:t.hours},{v:cd.minutes,l:t.minutes},{v:cd.seconds,l:t.seconds}].map(({v,l})=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, color:sage, fontWeight:600, lineHeight:1 }}>{String(v).padStart(2,"0")}</div>
                <div style={{ fontSize:8, letterSpacing:ls("0.3em"), textTransform:tt("uppercase") as any, color:mossLight, marginTop:5 }}>{l}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════ VENUE */}
      <div ref={venueRef} style={{ background:`linear-gradient(135deg,${sage}15,${cream})`, padding: isPreview ? "36px 24px" : "72px 60px", textAlign:"center", position:"relative" }}>
        <Divider/>
        <p className="t15-reveal" style={{ fontSize:9, letterSpacing:ls("0.4em"), textTransform:tt("uppercase") as any, color:mossLight, marginBottom:8 }}>{t.venue}</p>
        {/* ← butterfly lands here on the venue name */}
        <h2 data-bf="venue-name" className="t15-reveal" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isPreview ? 28 : 42, color:sage, fontWeight:400, marginBottom:6, display:"inline-block" }}>{venue}</h2>
        {venueAddress && <p className="t15-reveal" style={{ color:bark, opacity:.5, fontSize:14, marginBottom:16 }}>{venueAddress}</p>}
        <div className="t15-reveal" style={{ display:"flex", justifyContent:"center", gap:36, flexWrap:"wrap", marginTop:20 }}>
          {time && <div style={{ textAlign:"center" }}><p style={{ fontSize:9, letterSpacing:ls("0.3em"), textTransform:tt("uppercase") as any, color:mossLight, marginBottom:4 }}>{t.weddingCeremony}</p><p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, color:sage }}>{fmtT(time)}</p></div>}
          {receptionVenue && <div style={{ textAlign:"center" }}><p style={{ fontSize:9, letterSpacing:ls("0.3em"), textTransform:tt("uppercase") as any, color:mossLight, marginBottom:4 }}>{t.reception}</p><p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, color:sage }}>{receptionVenue}</p>{receptionTime && <p style={{ fontSize:13, color:bark, opacity:.5 }}>{fmtT(receptionTime)}</p>}</div>}
          {dressCode && <div style={{ textAlign:"center" }}><p style={{ fontSize:9, letterSpacing:ls("0.3em"), textTransform:tt("uppercase") as any, color:mossLight, marginBottom:4 }}>{t.dressCode}</p><p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, color:sage }}>{dressCode}</p></div>}
        </div>
        {venueMapUrl && <a href={venueMapUrl} target="_blank" rel="noreferrer" className="t15-reveal" style={{ display:"inline-block", marginTop:20, padding:"10px 26px", border:`1px solid ${sage}55`, borderRadius:2, color:sage, textDecoration:"none", fontSize:11, letterSpacing:ls("0.2em"), textTransform:tt("uppercase") as any }}>📍 {t.venue}</a>}
      </div>

      {/* ══════════════════════════════ STORY */}
      {story && (
        <div ref={storyRef} style={{ background:cream, padding: isPreview ? "36px 24px" : "72px 60px", textAlign:"center" }}>
          <Divider/>
          {/* ← butterfly lands here on "Our Story" heading */}
          <p data-bf="story-head" className="t15-reveal" style={{ fontSize:9, letterSpacing:ls("0.4em"), textTransform:tt("uppercase") as any, color:mossLight, marginBottom:8, display:"inline-block" }}>{t.ourStory}</p>
          <p className="t15-reveal" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isPreview ? 14 : 21, color:bark, opacity:.75, maxWidth:680, margin:"0 auto 24px", lineHeight:1.88, fontStyle:"italic" }}>{story}</p>
          {storyImageUrls.length > 0 && (
            <div className="t15-reveal" style={{ borderRadius:14, overflow:"hidden", maxWidth:560, margin:"0 auto", boxShadow:"0 12px 40px rgba(0,0,0,0.09)" }}>
              <PhotoGallery images={storyImageUrls} style={sGS} fillet={sGF} accentColor={gold} isPreview={isPreview} />
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════ ABOUT COUPLE */}
      {(brideAbout||groomAbout) && (
        <div ref={biosRef} style={{ background:blush, padding: isPreview ? "32px 24px" : "64px 60px" }}>
          <Divider/>
          <p style={{ textAlign:"center", fontSize:9, letterSpacing:ls("0.4em"), textTransform:tt("uppercase") as any, color:mossLight, marginBottom:28 }}>{t.aboutTheCouple}</p>
          <div style={{ display:"grid", gridTemplateColumns: isPreview ? "1fr" : "1fr 1fr", gap:32, maxWidth:720, margin:"0 auto" }}>
            {[{name:brideName,about:brideAbout},{name:groomName,about:groomAbout}].map(({name,about},i)=>about&&(
              <div key={i} className={i===0?"t15-reveal-l":"t15-reveal-r"}
                style={{ background:"rgba(255,255,255,0.6)", borderRadius:14, padding:"26px", backdropFilter:"blur(8px)", border:`1px solid ${sage}22` }}>
                <h3 style={{ fontFamily:scriptFont, fontSize: isPreview ? 30 : 42, color:sage, marginBottom:10 }}>{name}</h3>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:bark, opacity:.7, lineHeight:1.78, fontStyle:"italic" }}>{about}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════ EVENTS */}
      {events && events.length > 0 && (
        <div ref={eventsRef} style={{ background:`${sage}12`, padding: isPreview ? "32px 24px" : "64px 60px" }}>
          <Divider/>
          <p style={{ textAlign:"center", fontSize:9, letterSpacing:ls("0.4em"), textTransform:tt("uppercase") as any, color:mossLight, marginBottom:28 }}>{t.weddingCelebrations}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:16, maxWidth:600, margin:"0 auto" }}>
            {events.map((ev,i)=>(
              <div key={i} className="t15-reveal" style={{ background:"rgba(255,255,255,0.72)", borderRadius:14, padding:"20px 24px", border:`1px solid ${sage}30`, display:"flex", gap:16, alignItems:"center" }}>
                <div style={{ width:46, height:46, borderRadius:"50%", background:`${sage}22`, border:`1px solid ${sage}44`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12,2 Q16,8 20,10 Q16,12 16,18 Q12,14 8,18 Q8,12 4,10 Q8,8 12,2Z" fill={sage} opacity="0.75"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isPreview ? 16 : 21, color:sage, fontWeight:600, marginBottom:2 }}>{ev.name}</p>
                  <p style={{ fontSize:12, color:bark, opacity:.5 }}>{fmt(ev.date)}{ev.time&&` · ${fmtT(ev.time)}`}</p>
                  {ev.venue && <p style={{ fontSize:12, color:bark, opacity:.4 }}>{ev.venue}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════ FAMILY */}
      {(brideFamily||groomFamily) && (
        <div ref={familyRef} style={{ background:cream, padding: isPreview ? "32px 24px" : "64px 60px", textAlign:"center" }}>
          <Divider/>
          <p style={{ fontSize:9, letterSpacing:ls("0.4em"), textTransform:tt("uppercase") as any, color:mossLight, marginBottom:6 }}>{t.withBlessingsOfFamilies}</p>
          <div style={{ display:"grid", gridTemplateColumns: isPreview ? "1fr" : "1fr 1fr", gap:32, maxWidth:640, margin:"24px auto 0" }}>
            {[{label:t.bridesFamily,fam:brideFamily,imgs:brideFamilyImageUrls,s:"l",gs:bGS,gf:bGF},{label:t.groomsFamily,fam:groomFamily,imgs:groomFamilyImageUrls,s:"r",gs:gGS,gf:gGF}].map(({label,fam,imgs,s,gs,gf})=>fam&&(
              <div key={label} className={s==="l"?"t15-reveal-l":"t15-reveal-r"}>
                <p style={{ fontSize:9, letterSpacing:ls("0.3em"), textTransform:tt("uppercase") as any, color:mossLight, marginBottom:12 }}>{label}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:bark, opacity:.7, lineHeight:2.1 }}>
                  {fam.fatherName}<br/>{fam.motherName}
                  {(fam.members??[]).map(m=><span key={m.name}><br/>{m.name} <span style={{opacity:.5,fontSize:12}}>({m.relation})</span></span>)}
                </p>
                {imgs.length>0&&<div style={{ borderRadius:10, overflow:"hidden", marginTop:14, boxShadow:"0 8px 24px rgba(0,0,0,0.08)" }}><PhotoGallery images={imgs} style={gs} fillet={gf} accentColor={gold} isPreview={isPreview}/></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════ RSVP */}
      <div ref={rsvpRef} style={{ background:`linear-gradient(135deg,${sage}20,${blush})`, padding: isPreview ? "36px 24px" : "72px 60px", textAlign:"center" }}>
        <Divider/>
        {/* ← butterfly lands here on the RSVP heading */}
        <p data-bf="rsvp-head" className="t15-reveal" style={{ fontSize:9, letterSpacing:ls("0.4em"), textTransform:tt("uppercase") as any, color:mossLight, marginBottom:8, display:"inline-block" }}>{t.kindlyRsvp}</p>
        <h2 className="t15-reveal" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isPreview ? 28 : 44, color:sage, fontWeight:400, marginBottom:18 }}>
          {brideName} {t.and} {groomName}
        </h2>
        {rsvpDeadline&&<p className="t15-reveal" style={{ fontSize:13, color:bark, opacity:.5, marginBottom:24, fontStyle:"italic" }}>Please respond by {fmt(rsvpDeadline)}</p>}
        <div className="t15-reveal" style={{ display:"flex", flexDirection:"column", gap:12, alignItems:"center" }}>
          {rsvpWhatsapp&&<a href={`https://wa.me/${rsvpWhatsapp}?text=Hi! Confirming attendance for ${brideName} %26 ${groomName}'s wedding 🌿`} target="_blank" rel="noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"14px 38px", background:sage, color:"#fff", borderRadius:2, textDecoration:"none", fontSize:13, letterSpacing:ls("0.15em"), textTransform:tt("uppercase") as any, fontWeight:600 }}>
            💬 {t.rsvpOnWhatsapp}
          </a>}
          {rsvpContact&&<p style={{ fontSize:13, color:bark, opacity:.5 }}>or call {rsvpContact}</p>}
        </div>
        {specialNote&&<p className="t15-reveal" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:bark, opacity:.6, maxWidth:480, margin:"28px auto 0", fontStyle:"italic", lineHeight:1.75 }}>{specialNote}</p>}
        {coupleHashtag&&<p className="t15-reveal" style={{ color:mossLight, fontSize:15, marginTop:20, fontWeight:600 }}>{coupleHashtag}</p>}
      </div>

      {/* ══════════════════════════════ FOOTER */}
      <div style={{ background:bark, padding:"32px 40px", textAlign:"center" }}>
        <p style={{ fontFamily:scriptFont, fontSize:38, color:gold, marginBottom:8 }}>{brideName} {t.and} {groomName}</p>
        <p style={{ color:"rgba(255,255,255,0.28)", fontSize:11, letterSpacing:ls("0.18em"), textTransform:tt("uppercase") as any }}>
          Made with ♥ by Digi Invites · Developed by AK Tech Dev Solutions &amp; Morphiq Media
        </p>
      </div>
    </div>
  );
}
