"use client";
import { useState, useEffect, useCallback, useRef } from "react";

export type GalleryStyle =
  | "slideshow"       // classic crossfade slideshow
  | "slideshow-slide" // slide transition
  | "slideshow-zoom"  // ken burns zoom
  | "polaroid"        // stacked polaroids with rotation
  | "collage-2"       // 2-photo side by side
  | "collage-3"       // 1 big + 2 small
  | "collage-4"       // 2x2 grid with gap
  | "filmstrip"       // horizontal strip scrolling
  | "masonry"         // pinterest-style
  | "magazine";       // editorial 1 hero + strip

export type Fillet =
  | "none"       // 0px
  | "soft"       // 8px
  | "rounded"    // 16px
  | "pill"       // 32px
  | "circle";    // 50%

const FILLET_MAP: Record<Fillet, string> = {
  none:    "0px",
  soft:    "8px",
  rounded: "16px",
  pill:    "32px",
  circle:  "50%",
};

interface PhotoGalleryProps {
  images: string[];
  style?: GalleryStyle;
  fillet?: Fillet;
  accentColor?: string;
  isPreview?: boolean;
  aspectRatio?: string;
  autoplayMs?: number;
}

/* ── Individual image cell ── */
function Img({ src, style, fillet = "none", className }: { src: string; style?: React.CSSProperties; fillet?: string; className?: string }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: fillet, ...style }} className={className}>
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════ SLIDESHOW (crossfade) */
function SlideshowFade({ images, fillet, accentColor, isPreview, autoplayMs }: { images: string[]; fillet: string; accentColor: string; isPreview: boolean; autoplayMs: number }) {
  const [active, setActive] = useState(0);
  const n = images.length;
  const next = useCallback(() => setActive(p => (p + 1) % n), [n]);
  const prev = useCallback(() => setActive(p => (p - 1 + n) % n), [n]);
  useEffect(() => { if (isPreview || n <= 1) return; const id = setInterval(next, autoplayMs); return () => clearInterval(id); }, [next, n, autoplayMs, isPreview]);

  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: "66.6%", borderRadius: fillet, overflow: "hidden" }}>
      {images.map((img, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === active ? 1 : 0, transitionProperty: "opacity", transitionDuration: "0.9s", transitionTimingFunction: "ease", zIndex: i === active ? 1 : 0 }}>
          <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ))}
      {!isPreview && n > 1 && <>
        <button onClick={prev} style={navBtn("left")}>‹</button>
        <button onClick={next} style={navBtn("right")}>›</button>
        <Dots n={n} active={active} setActive={setActive} color={accentColor} />
        <Counter active={active} n={n} />
      </>}
    </div>
  );
}

/* ═══════════════════════════════════════════════ SLIDESHOW (slide) */
function SlideshowSlide({ images, fillet, accentColor, isPreview, autoplayMs }: { images: string[]; fillet: string; accentColor: string; isPreview: boolean; autoplayMs: number }) {
  const [active, setActive] = useState(0);
  const n = images.length;
  const next = useCallback(() => setActive(p => (p + 1) % n), [n]);
  const prev = useCallback(() => setActive(p => (p - 1 + n) % n), [n]);
  useEffect(() => { if (isPreview || n <= 1) return; const id = setInterval(next, autoplayMs); return () => clearInterval(id); }, [next, n, autoplayMs, isPreview]);

  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: "66.6%", borderRadius: fillet, overflow: "hidden" }}>
      <div style={{ display: "flex", height: "100%", position: "absolute", inset: 0, transitionProperty: "transform", transitionDuration: "0.7s", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)", transform: `translateX(-${active * 100}%)`, width: `${n * 100}%` }}>
        {images.map((img, i) => (
          <div key={i} style={{ width: `${100 / n}%`, height: "100%", flexShrink: 0 }}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
      {!isPreview && n > 1 && <>
        <button onClick={prev} style={navBtn("left")}>‹</button>
        <button onClick={next} style={navBtn("right")}>›</button>
        <Dots n={n} active={active} setActive={setActive} color={accentColor} />
        <Counter active={active} n={n} />
      </>}
    </div>
  );
}

/* ═══════════════════════════════════════════════ SLIDESHOW (ken burns zoom) */
function SlideshowZoom({ images, fillet, accentColor, isPreview, autoplayMs }: { images: string[]; fillet: string; accentColor: string; isPreview: boolean; autoplayMs: number }) {
  const [active, setActive] = useState(0);
  const n = images.length;
  const next = useCallback(() => setActive(p => (p + 1) % n), [n]);
  const prev = useCallback(() => setActive(p => (p - 1 + n) % n), [n]);
  useEffect(() => { if (isPreview || n <= 1) return; const id = setInterval(next, autoplayMs); return () => clearInterval(id); }, [next, n, autoplayMs, isPreview]);

  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: "66.6%", borderRadius: fillet, overflow: "hidden" }}>
      <style>{`@keyframes kb-zoom{0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.12) translate(-2%,-2%)}}`}</style>
      {images.map((img, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === active ? 1 : 0, transitionProperty: "opacity", transitionDuration: "1s", transitionTimingFunction: "ease", zIndex: i === active ? 1 : 0, overflow: "hidden" }}>
          <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", animation: i === active ? `kb-zoom ${autoplayMs}ms ease forwards` : "none" }} />
        </div>
      ))}
      {!isPreview && n > 1 && <>
        <button onClick={prev} style={navBtn("left")}>‹</button>
        <button onClick={next} style={navBtn("right")}>›</button>
        <Dots n={n} active={active} setActive={setActive} color={accentColor} />
        <Counter active={active} n={n} />
      </>}
    </div>
  );
}

/* ═══════════════════════════════════════════════ POLAROID */
function PolaroidGallery({ images, fillet, accentColor, isPreview, autoplayMs }: { images: string[]; fillet: string; accentColor: string; isPreview: boolean; autoplayMs: number }) {
  const [active, setActive] = useState(0);
  const n = Math.min(images.length, 6);
  const next = useCallback(() => setActive(p => (p + 1) % n), [n]);
  useEffect(() => { if (isPreview || n <= 1) return; const id = setInterval(next, autoplayMs); return () => clearInterval(id); }, [next, n, autoplayMs, isPreview]);

  const rotations = [-6, 4, -3, 7, -5, 3];

  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: "72%", userSelect: "none" }}>
      <style>{`@keyframes pol-pop{0%{transform:scale(0.85) rotate(var(--r));opacity:0}100%{transform:scale(1) rotate(var(--r));opacity:1}}`}</style>
      {images.slice(0, n).map((img, i) => {
        const rot   = rotations[i % rotations.length];
        const isTop = i === active;
        return (
          <div key={i} onClick={() => !isPreview && setActive(i)} style={{
            position: "absolute",
            left: `${10 + (i % 3) * 28}%`,
            top:  `${i < 3 ? 0 : 38}%`,
            width: "42%",
            background: "#fff",
            boxShadow: isTop ? "0 20px 48px rgba(0,0,0,0.35)" : "0 6px 18px rgba(0,0,0,0.2)",
            transform: `rotate(${isTop ? 0 : rot}deg) scale(${isTop ? 1.06 : 1})`,
            transitionProperty: "transform, box-shadow, z-index",
            transitionDuration: "0.45s",
            transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
            zIndex: isTop ? 10 : i,
            cursor: isPreview ? "default" : "pointer",
            padding: "6px 6px 22px",
            borderRadius: "2px",
          }}>
            <div style={{ width: "100%", paddingBottom: "75%", position: "relative", overflow: "hidden", borderRadius: fillet === "none" ? "1px" : fillet }}>
              <img src={img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {isTop && <div style={{ height: 2, background: accentColor, marginTop: 10, opacity: 0.4, borderRadius: 1 }} />}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════ COLLAGE 2 (side by side) */
function Collage2({ images, fillet, accentColor, isPreview, autoplayMs }: { images: string[]; fillet: string; accentColor: string; isPreview: boolean; autoplayMs: number }) {
  const [offset, setOffset] = useState(0);
  const n = images.length;
  useEffect(() => { if (isPreview || n <= 2) return; const id = setInterval(() => setOffset(p => (p + 2) % n), autoplayMs); return () => clearInterval(id); }, [n, autoplayMs, isPreview]);

  const imgs = [images[offset % n], images[(offset + 1) % n]];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, width: "100%" }}>
      {imgs.map((img, i) => (
        <div key={i} style={{ position: "relative", paddingBottom: "133%", overflow: "hidden", borderRadius: fillet, transitionProperty: "opacity", transitionDuration: "0.7s", transitionTimingFunction: "ease" }}>
          <img src={img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════ COLLAGE 3 (1 big + 2 stacked) */
function Collage3({ images, fillet, isPreview, autoplayMs }: { images: string[]; fillet: string; accentColor: string; isPreview: boolean; autoplayMs: number }) {
  const [offset, setOffset] = useState(0);
  const n = images.length;
  useEffect(() => { if (isPreview || n <= 3) return; const id = setInterval(() => setOffset(p => (p + 3) % n), autoplayMs); return () => clearInterval(id); }, [n, autoplayMs, isPreview]);

  const imgs = [0, 1, 2].map(i => images[(offset + i) % n]);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", gap: 6, width: "100%", height: 320 }}>
      <div style={{ gridRow: "1 / 3", position: "relative", overflow: "hidden", borderRadius: fillet }}>
        <img src={imgs[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {[imgs[1], imgs[2]].map((img, i) => (
        <div key={i} style={{ position: "relative", overflow: "hidden", borderRadius: fillet }}>
          <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════ COLLAGE 4 (2x2 grid) */
function Collage4({ images, fillet, isPreview, autoplayMs }: { images: string[]; fillet: string; accentColor: string; isPreview: boolean; autoplayMs: number }) {
  const [offset, setOffset] = useState(0);
  const n = images.length;
  useEffect(() => { if (isPreview || n <= 4) return; const id = setInterval(() => setOffset(p => (p + 4) % n), autoplayMs); return () => clearInterval(id); }, [n, autoplayMs, isPreview]);

  const imgs = [0, 1, 2, 3].map(i => images[(offset + i) % n]);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 6, width: "100%", aspectRatio: "1" }}>
      {imgs.map((img, i) => (
        <div key={i} style={{ position: "relative", overflow: "hidden", borderRadius: fillet }}>
          <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════ FILMSTRIP */
function Filmstrip({ images, fillet, accentColor, isPreview, autoplayMs }: { images: string[]; fillet: string; accentColor: string; isPreview: boolean; autoplayMs: number }) {
  const [active, setActive] = useState(0);
  const n = images.length;
  const stripRef = useRef<HTMLDivElement>(null);
  const next = useCallback(() => setActive(p => (p + 1) % n), [n]);
  useEffect(() => { if (isPreview || n <= 1) return; const id = setInterval(next, autoplayMs); return () => clearInterval(id); }, [next, n, autoplayMs, isPreview]);

  return (
    <div style={{ width: "100%" }}>
      {/* Main image */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "62%", borderRadius: fillet, overflow: "hidden", marginBottom: 8 }}>
        {images.map((img, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: i === active ? 1 : 0, transitionProperty: "opacity", transitionDuration: "0.7s", transitionTimingFunction: "ease" }}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
      {/* Strip */}
      <div ref={stripRef} style={{ display: "flex", gap: 5, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}>
        {images.map((img, i) => (
          <div key={i} onClick={() => !isPreview && setActive(i)} style={{
            flexShrink: 0, width: 64, height: 48, borderRadius: fillet === "circle" ? "8px" : fillet,
            overflow: "hidden", cursor: isPreview ? "default" : "pointer",
            border: `2px solid ${i === active ? accentColor : "transparent"}`,
            transitionProperty: "border-color, opacity",
            transitionDuration: "0.3s",
            transitionTimingFunction: "ease",
            opacity: i === active ? 1 : 0.5,
          }}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════ MASONRY */
function Masonry({ images, fillet }: { images: string[]; fillet: string; accentColor: string; isPreview: boolean; autoplayMs: number }) {
  const cols = [
    images.filter((_, i) => i % 3 === 0),
    images.filter((_, i) => i % 3 === 1),
    images.filter((_, i) => i % 3 === 2),
  ];
  const heights = [[75, 55, 65], [55, 70, 50], [65, 60, 70]];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, width: "100%" }}>
      {cols.map((col, ci) => (
        <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {col.map((img, ri) => (
            <div key={ri} style={{ position: "relative", paddingBottom: `${heights[ci][ri % 3]}%`, overflow: "hidden", borderRadius: fillet }}>
              <img src={img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════ MAGAZINE */
function Magazine({ images, fillet, accentColor, isPreview, autoplayMs }: { images: string[]; fillet: string; accentColor: string; isPreview: boolean; autoplayMs: number }) {
  const [heroIdx, setHeroIdx] = useState(0);
  const n = images.length;
  useEffect(() => { if (isPreview || n <= 1) return; const id = setInterval(() => setHeroIdx(p => (p + 1) % n), autoplayMs); return () => clearInterval(id); }, [n, autoplayMs, isPreview]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      {/* Hero */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "56%", overflow: "hidden", borderRadius: fillet }}>
        {images.map((img, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: i === heroIdx ? 1 : 0, transitionProperty: "opacity", transitionDuration: "1s", transitionTimingFunction: "ease" }}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 50%)" }} />
        <div style={{ position: "absolute", bottom: 10, left: 12, width: 32, height: 3, background: accentColor, borderRadius: 2 }} />
      </div>
      {/* Thumbnail strip */}
      {n > 1 && (
        <div style={{ display: "flex", gap: 6 }}>
          {images.slice(0, 5).map((img, i) => (
            <div key={i} onClick={() => !isPreview && setHeroIdx(i)} style={{
              flex: 1, position: "relative", paddingBottom: "70%", overflow: "hidden",
              borderRadius: fillet === "circle" ? "8px" : fillet,
              cursor: isPreview ? "default" : "pointer",
              outline: i === heroIdx ? `2px solid ${accentColor}` : "none",
              outlineOffset: "2px",
              transitionProperty: "outline",
              transitionDuration: "0.3s",
              transitionTimingFunction: "ease",
            }}>
              <img src={img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === heroIdx ? 1 : 0.55 }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Shared UI helpers ── */
function navBtn(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute", [side]: 10, top: "50%",
    transform: "translateY(-50%)", zIndex: 10,
    background: "rgba(0,0,0,0.48)", color: "#fff",
    border: "none", borderRadius: "50%",
    width: 36, height: 36, fontSize: 20,
    cursor: "pointer", display: "flex",
    alignItems: "center", justifyContent: "center",
    backdropFilter: "blur(4px)", userSelect: "none",
  };
}
function Dots({ n, active, setActive, color }: { n: number; active: number; setActive: (i: number) => void; color: string }) {
  return (
    <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 5, zIndex: 10 }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} onClick={() => setActive(i)} style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 3, background: i === active ? color : "rgba(255,255,255,0.45)", cursor: "pointer", transitionProperty: "width, background", transitionDuration: "0.3s", transitionTimingFunction: "ease" }} />
      ))}
    </div>
  );
}
function Counter({ active, n }: { active: number; n: number }) {
  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10, padding: "3px 8px", background: "rgba(0,0,0,0.45)", borderRadius: 12, fontSize: 10, color: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)", fontFamily: "'Montserrat',sans-serif" }}>
      {active + 1} / {n}
    </div>
  );
}

/* ═══════════════════════════════════════════════ MAIN EXPORT */
export default function PhotoGallery({
  images,
  style = "slideshow",
  fillet = "soft",
  accentColor = "#c9a84c",
  isPreview = false,
  autoplayMs = 4500,
}: PhotoGalleryProps) {
  if (!images || images.length === 0) return null;

  const fr = FILLET_MAP[fillet];
  const props = { images, fillet: fr, accentColor, isPreview, autoplayMs };

  switch (style) {
    case "slideshow":       return <SlideshowFade  {...props} />;
    case "slideshow-slide": return <SlideshowSlide {...props} />;
    case "slideshow-zoom":  return <SlideshowZoom  {...props} />;
    case "polaroid":        return <PolaroidGallery {...props} />;
    case "collage-2":       return <Collage2        {...props} />;
    case "collage-3":       return <Collage3        {...props} />;
    case "collage-4":       return <Collage4        {...props} />;
    case "filmstrip":       return <Filmstrip       {...props} />;
    case "masonry":         return <Masonry         {...props} />;
    case "magazine":        return <Magazine        {...props} />;
    default:                return <SlideshowFade  {...props} />;
  }
}
