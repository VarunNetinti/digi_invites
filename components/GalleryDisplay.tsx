"use client";
import { useState, useEffect, useCallback, useRef } from "react";

export type GalleryStyleId =
  | "slideshow"       // classic crossfade slideshow
  | "grid-2"          // 2-column grid, rounded cards
  | "grid-3"          // 3-column masonry-style grid
  | "collage-overlap" // overlapping polaroid-style cards
  | "filmstrip"       // horizontal scrolling filmstrip
  | "polaroid"        // single polaroid that flips through
  | "magazine"        // hero + 2 thumbnails side layout
  | "frames";         // stacked frames with parallax depth

export interface GalleryStyleMeta {
  id: GalleryStyleId;
  name: string;
  desc: string;
  emoji: string;
  minImages: number;
}

export const GALLERY_STYLES: GalleryStyleMeta[] = [
  { id: "slideshow",       name: "Slideshow",       desc: "Classic crossfade with arrows",       emoji: "▶️",  minImages: 1 },
  { id: "grid-2",          name: "Grid Duo",         desc: "2-column grid, soft rounded edges",   emoji: "⊞",   minImages: 2 },
  { id: "grid-3",          name: "Grid Trio",        desc: "3-column mosaic layout",              emoji: "⊟",   minImages: 3 },
  { id: "collage-overlap", name: "Collage",          desc: "Overlapping tilted polaroids",        emoji: "🖼️",  minImages: 3 },
  { id: "filmstrip",       name: "Film Strip",       desc: "Horizontal scrolling strip",          emoji: "🎞️",  minImages: 2 },
  { id: "polaroid",        name: "Polaroid Flip",    desc: "Single polaroid card, auto-flip",     emoji: "📸",  minImages: 1 },
  { id: "magazine",        name: "Magazine",         desc: "Hero + thumbnail sidebar",            emoji: "📰",  minImages: 2 },
  { id: "frames",          name: "Stacked Frames",   desc: "Depth-layered framed photos",         emoji: "🪞",  minImages: 2 },
];

interface GalleryDisplayProps {
  urls: string[];
  style?: GalleryStyleId;
  accentColor?: string;
  isPreview?: boolean;
  height?: number;
}

/* ── helpers ── */
const rad = (n: number) => `${n}px`;
const fillet = (n = 16) => rad(n);

/* ══════════════════════════════════════════════════════════
   1. SLIDESHOW — crossfade + slide transitions
══════════════════════════════════════════════════════════ */
function Slideshow({ urls, accentColor = "#c9a84c", isPreview, height = 340 }: GalleryDisplayProps) {
  const [active, setActive] = useState(0);
  const [effect, setEffect] = useState<"fade"|"slide"|"zoom">("fade");
  const total = urls.length;
  const next = useCallback(() => setActive(p => (p+1)%total), [total]);
  const prev = useCallback(() => setActive(p => (p-1+total)%total), [total]);

  useEffect(() => {
    if (isPreview || total <= 1) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next, total, isPreview]);

  const transitions = ["fade","slide","zoom"] as const;

  return (
    <div style={{ position:"relative", height, borderRadius: fillet(18), overflow:"hidden" }}>
      {urls.map((url, i) => {
        const active_ = i === active;
        let transform = "none";
        let opacity = active_ ? 1 : 0;
        if (effect === "slide") transform = active_ ? "translateX(0)" : i < active ? "translateX(-100%)" : "translateX(100%)";
        if (effect === "zoom")  transform = active_ ? "scale(1)" : "scale(1.08)";
        return (
          <div key={i} style={{ position:"absolute", inset:0, transitionProperty:"opacity,transform", transitionDuration:"0.85s", transitionTimingFunction:"cubic-bezier(.4,0,.2,1)", opacity, transform, zIndex: active_ ? 1 : 0 }}>
            <img src={url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
            {/* Vignette */}
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,0.35) 100%)", pointerEvents:"none" }}/>
          </div>
        );
      })}

      {/* Transition picker */}
      {!isPreview && (
        <div style={{ position:"absolute", top:10, left:12, zIndex:10, display:"flex", gap:4 }}>
          {transitions.map(t => (
            <button key={t} onClick={() => setEffect(t)}
              style={{ padding:"3px 8px", borderRadius:20, fontSize:9, border:`1px solid ${t===effect?accentColor:"rgba(255,255,255,0.3)"}`, background: t===effect ? accentColor : "rgba(0,0,0,0.4)", color: t===effect?"#000":"#fff", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", letterSpacing:"0.1em", backdropFilter:"blur(6px)" }}>
              {t}
            </button>
          ))}
        </div>
      )}

      {!isPreview && total > 1 && (
        <>
          <button onClick={prev} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", zIndex:10, background:"rgba(0,0,0,0.45)", color:"#fff", border:"none", borderRadius:"50%", width:38, height:38, fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)" }}>‹</button>
          <button onClick={next} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", zIndex:10, background:"rgba(0,0,0,0.45)", color:"#fff", border:"none", borderRadius:"50%", width:38, height:38, fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)" }}>›</button>
          <div style={{ position:"absolute", bottom:12, left:0, right:0, display:"flex", justifyContent:"center", gap:6, zIndex:10 }}>
            {urls.map((_,i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ width: i===active?22:7, height:7, borderRadius:4, background: i===active ? accentColor : "rgba(255,255,255,0.4)", border:"none", cursor:"pointer", transitionProperty:"all", transitionDuration:"0.3s", transitionTimingFunction:"ease", padding:0 }}/>
            ))}
          </div>
          <div style={{ position:"absolute", top:10, right:12, zIndex:10, padding:"3px 9px", background:"rgba(0,0,0,0.45)", borderRadius:12, fontSize:10, color:"rgba(255,255,255,0.85)", backdropFilter:"blur(6px)" }}>{active+1}/{total}</div>
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   2. GRID DUO — 2 columns, fillet edges, hover lift
══════════════════════════════════════════════════════════ */
function GridDuo({ urls, accentColor = "#c9a84c", isPreview, height = 340 }: GalleryDisplayProps) {
  const [hovered, setHovered] = useState(-1);
  const pairs = Math.ceil(urls.length / 2);
  const shown = urls.slice(0, Math.min(6, urls.length));

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, height, borderRadius: fillet(18), overflow:"hidden" }}>
      {shown.map((url, i) => (
        <div key={i}
          onMouseEnter={() => !isPreview && setHovered(i)}
          onMouseLeave={() => setHovered(-1)}
          style={{ position:"relative", overflow:"hidden", borderRadius: fillet(12),
            transform: hovered===i ? "scale(1.03)" : "scale(1)",
            transitionProperty:"transform,box-shadow", transitionDuration:"0.35s", transitionTimingFunction:"ease",
            boxShadow: hovered===i ? "0 12px 32px rgba(0,0,0,0.35)" : "0 2px 8px rgba(0,0,0,0.15)",
          }}>
          <img src={url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom,transparent 60%,${accentColor}22)`, pointerEvents:"none" }}/>
          {/* Fillet glow border */}
          <div style={{ position:"absolute", inset:0, borderRadius: fillet(12), border:`1.5px solid ${accentColor}33`, pointerEvents:"none" }}/>
        </div>
      ))}
      {/* Fill empty slots */}
      {shown.length % 2 !== 0 && <div style={{ borderRadius: fillet(12), background:"rgba(255,255,255,0.05)" }}/>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   3. GRID TRIO — 3-column mosaic
══════════════════════════════════════════════════════════ */
function GridTrio({ urls, accentColor = "#c9a84c", isPreview, height = 340 }: GalleryDisplayProps) {
  const shown = urls.slice(0, Math.min(9, urls.length));
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6, height, borderRadius: fillet(18), overflow:"hidden" }}>
      {shown.map((url, i) => (
        <div key={i} style={{ position:"relative", overflow:"hidden", borderRadius: fillet(10),
          gridRow: i===0 ? "span 2" : undefined,
        }}>
          <img src={url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          <div style={{ position:"absolute", inset:0, borderRadius: fillet(10), border:`1.5px solid rgba(255,255,255,0.12)`, pointerEvents:"none" }}/>
          {/* Hover overlay */}
          {!isPreview && <div style={{ position:"absolute", inset:0, background:`${accentColor}11`, opacity:0, transitionProperty:"opacity", transitionDuration:"0.3s", transitionTimingFunction:"ease" }}/>}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   4. COLLAGE OVERLAP — tilted stacked polaroids, click to cycle
══════════════════════════════════════════════════════════ */
function CollageOverlap({ urls, accentColor = "#c9a84c", isPreview, height = 340 }: GalleryDisplayProps) {
  const [top, setTop] = useState(0);
  const tilts = [-8, 5, -3, 7, -5, 3, -6];
  const offsets = [
    { x: 0, y: 0 }, { x: 28, y: 12 }, { x: -22, y: 18 },
    { x: 18, y: -10 }, { x: -30, y: -8 }, { x: 24, y: 24 }, { x: -18, y: 20 },
  ];
  const shown = urls.slice(0, Math.min(5, urls.length));
  const w = isPreview ? 120 : 200, h = isPreview ? 100 : 165;

  return (
    <div style={{ position:"relative", height, display:"flex", alignItems:"center", justifyContent:"center", cursor: isPreview ? "default" : "pointer" }}
      onClick={() => !isPreview && setTop(p => (p+1)%shown.length)}>
      {shown.map((url, i) => {
        const zi = i === top ? shown.length + 1 : shown.length - Math.abs(i - top);
        const off = offsets[i % offsets.length];
        const tilt = tilts[i % tilts.length];
        return (
          <div key={i} style={{
            position:"absolute",
            width: w, height: h,
            left: `calc(50% + ${off.x}px - ${w/2}px)`,
            top:  `calc(50% + ${off.y}px - ${h/2}px)`,
            zIndex: zi,
            transform: i === top ? `rotate(${tilt * 0.3}deg) scale(1.08)` : `rotate(${tilt}deg)`,
            transitionProperty:"transform,z-index,box-shadow", transitionDuration:"0.5s", transitionTimingFunction:"cubic-bezier(.34,1.56,.64,1)",
            boxShadow: i===top ? "0 20px 48px rgba(0,0,0,0.5)" : "0 6px 20px rgba(0,0,0,0.3)",
          }}>
            {/* Polaroid frame */}
            <div style={{ width:"100%", height:"100%", background:"#fff", borderRadius:4, padding:"7px 7px 28px", boxSizing:"border-box" }}>
              <img src={url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", borderRadius:2 }}/>
            </div>
            {/* Gold border on top card */}
            {i===top && <div style={{ position:"absolute", inset:0, borderRadius:4, border:`2px solid ${accentColor}88`, pointerEvents:"none" }}/>}
          </div>
        );
      })}
      {!isPreview && <div style={{ position:"absolute", bottom:6, right:12, fontSize:10, color:"rgba(255,255,255,0.4)", fontFamily:"'Montserrat',sans-serif" }}>tap to flip</div>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   5. FILMSTRIP — horizontal scroll, film perforation edges
══════════════════════════════════════════════════════════ */
function Filmstrip({ urls, accentColor = "#c9a84c", isPreview, height = 340 }: GalleryDisplayProps) {
  const [active, setActive] = useState(0);
  const stripH = isPreview ? height : height - 60;
  const thumbW = isPreview ? 80 : 120;

  return (
    <div style={{ height, borderRadius: fillet(18), overflow:"hidden", background:"#0a0a0a", display:"flex", flexDirection:"column" }}>
      {/* Main viewer */}
      <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
        {urls.map((url,i) => (
          <div key={i} style={{ position:"absolute", inset:0, opacity: i===active?1:0, transitionProperty:"opacity", transitionDuration:"0.6s", transitionTimingFunction:"ease" }}>
            <img src={url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          </div>
        ))}
        {/* Film sprocket overlay top */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:12, background:"#0a0a0a", display:"flex", alignItems:"center", gap:8, padding:"0 8px", zIndex:5 }}>
          {Array.from({length:20}).map((_,i)=><div key={i} style={{ width:7, height:6, borderRadius:2, background:"#222", flexShrink:0 }}/>)}
        </div>
        {/* Film sprocket overlay bottom */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:12, background:"#0a0a0a", display:"flex", alignItems:"center", gap:8, padding:"0 8px", zIndex:5 }}>
          {Array.from({length:20}).map((_,i)=><div key={i} style={{ width:7, height:6, borderRadius:2, background:"#222", flexShrink:0 }}/>)}
        </div>
      </div>
      {/* Filmstrip thumbnails */}
      {!isPreview && (
        <div style={{ height:60, background:"#111", display:"flex", alignItems:"center", gap:3, padding:"0 8px", overflowX:"auto" }}>
          {urls.map((url,i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ flexShrink:0, width:thumbW, height:44, borderRadius:3, overflow:"hidden", border:`2px solid ${i===active?accentColor:"transparent"}`, cursor:"pointer", padding:0, background:"none",
                transitionProperty:"border-color,transform", transitionDuration:"0.2s", transitionTimingFunction:"ease",
                transform: i===active ? "scale(1.08)" : "scale(1)" }}>
              <img src={url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   6. POLAROID FLIP — single polaroid, auto-animates
══════════════════════════════════════════════════════════ */
function PolaroidFlip({ urls, accentColor = "#c9a84c", isPreview, height = 340 }: GalleryDisplayProps) {
  const [idx, setIdx] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (isPreview || urls.length <= 1) return;
    const t = setInterval(() => {
      setFlipping(true);
      setTimeout(() => { setIdx(p => (p+1)%urls.length); setFlipping(false); }, 400);
    }, 3500);
    return () => clearInterval(t);
  }, [urls.length, isPreview]);

  const pw = isPreview ? 200 : 280, ph = isPreview ? 180 : 240;

  return (
    <div style={{ height, display:"flex", alignItems:"center", justifyContent:"center", background:"transparent" }}>
      <div style={{
        width: pw, background:"#fff",
        padding:"12px 12px 48px",
        borderRadius: fillet(4),
        boxShadow:"0 20px 60px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)",
        transform: flipping ? "rotateY(90deg) scale(0.92)" : "rotateY(0deg) rotate(-2deg)",
        transitionProperty:"transform", transitionDuration:"0.4s", transitionTimingFunction:"ease-in-out",
        border:`2px solid ${accentColor}44`,
      }}>
        <img src={urls[idx]} alt="" style={{ width:"100%", height: ph, objectFit:"cover", display:"block", borderRadius:2 }}/>
        {/* Polaroid caption line */}
        <div style={{ height:2, background:`${accentColor}44`, margin:"10px 8px 0", borderRadius:1 }}/>
        <div style={{ textAlign:"center", marginTop:6 }}>
          {urls.map((_,i)=>(
            <span key={i} style={{ display:"inline-block", width:5, height:5, borderRadius:"50%", background: i===idx ? accentColor : "#ddd", margin:"0 2px" }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   7. MAGAZINE — hero left + thumbnail stack right
══════════════════════════════════════════════════════════ */
function Magazine({ urls, accentColor = "#c9a84c", isPreview, height = 340 }: GalleryDisplayProps) {
  const [active, setActive] = useState(0);
  const thumbs = urls.filter((_,i) => i !== active).slice(0, 3);
  const thumbActualIdx = (i: number) => urls.indexOf(thumbs[i]);

  return (
    <div style={{ display:"grid", gridTemplateColumns: isPreview ? "1fr" : "1.7fr 1fr", gap:8, height, borderRadius: fillet(18), overflow:"hidden" }}>
      {/* Hero */}
      <div style={{ position:"relative", overflow:"hidden", borderRadius: fillet(14) }}>
        <img src={urls[active]} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", transitionProperty:"opacity", transitionDuration:"0.6s", transitionTimingFunction:"ease" }}/>
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top,${accentColor}55 0%,transparent 50%)`, pointerEvents:"none" }}/>
        {/* Gold corner accent */}
        <div style={{ position:"absolute", top:12, left:12, width:40, height:3, background:accentColor, borderRadius:2 }}/>
        <div style={{ position:"absolute", top:12, left:12, width:3, height:40, background:accentColor, borderRadius:2 }}/>
      </div>
      {/* Thumbnails */}
      {!isPreview && (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {thumbs.map((url,i) => (
            <div key={i}
              onClick={() => setActive(thumbActualIdx(i))}
              style={{ flex:1, position:"relative", overflow:"hidden", borderRadius: fillet(12), cursor:"pointer",
                boxShadow:"0 4px 16px rgba(0,0,0,0.2)",
                transitionProperty:"transform,box-shadow", transitionDuration:"0.25s", transitionTimingFunction:"ease",
              }}>
              <img src={url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.15)", borderRadius: fillet(12), border:`1.5px solid ${accentColor}33` }}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   8. STACKED FRAMES — depth-layered bordered frames
══════════════════════════════════════════════════════════ */
function StackedFrames({ urls, accentColor = "#c9a84c", isPreview, height = 340 }: GalleryDisplayProps) {
  const [active, setActive] = useState(0);
  const shown = urls.slice(0, Math.min(4, urls.length));

  useEffect(() => {
    if (isPreview || shown.length <= 1) return;
    const t = setInterval(() => setActive(p => (p+1)%shown.length), 4000);
    return () => clearInterval(t);
  }, [shown.length, isPreview]);

  const frameColors = ["#fff", "#f5e6c8", "#e8d5b7", "#d4b896"];
  const frameWidths = [10, 8, 8, 8];

  return (
    <div style={{ height, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      {shown.map((url, i) => {
        const offset = i - active;
        const absOff = Math.abs(offset);
        const isFront = i === active;
        return (
          <div key={i}
            onClick={() => !isPreview && setActive(i)}
            style={{
              position:"absolute",
              width: isPreview ? 160 : 260, height: isPreview ? 130 : 210,
              background: frameColors[i % frameColors.length],
              padding: frameWidths[i % frameWidths.length],
              borderRadius: fillet(6),
              boxShadow: isFront ? "0 24px 56px rgba(0,0,0,0.45)" : `0 ${6+absOff*4}px ${16+absOff*8}px rgba(0,0,0,0.25)`,
              transform: isFront
                ? "translateX(0) scale(1) rotate(0deg)"
                : `translateX(${offset * (isPreview?18:30)}px) scale(${1 - absOff*0.07}) rotate(${offset * 4}deg)`,
              zIndex: shown.length - absOff,
              transitionProperty:"transform,box-shadow,z-index", transitionDuration:"0.6s", transitionTimingFunction:"cubic-bezier(.34,1.2,.64,1)",
              cursor: isPreview ? "default" : "pointer",
              border:`3px solid ${isFront ? accentColor : "transparent"}`,
            }}>
            <img src={url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT — GalleryDisplay router
══════════════════════════════════════════════════════════ */
export default function GalleryDisplay({
  urls,
  style = "slideshow",
  accentColor = "#c9a84c",
  isPreview = false,
  height = 340,
}: GalleryDisplayProps) {
  if (!urls || urls.length === 0) return null;

  const props = { urls, accentColor, isPreview, height };

  switch (style) {
    case "grid-2":          return <GridDuo      {...props}/>;
    case "grid-3":          return <GridTrio     {...props}/>;
    case "collage-overlap": return <CollageOverlap {...props}/>;
    case "filmstrip":       return <Filmstrip    {...props}/>;
    case "polaroid":        return <PolaroidFlip {...props}/>;
    case "magazine":        return <Magazine     {...props}/>;
    case "frames":          return <StackedFrames {...props}/>;
    default:                return <Slideshow    {...props}/>;
  }
}
