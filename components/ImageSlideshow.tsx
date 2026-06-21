"use client";
import { useState, useEffect, useCallback } from "react";

interface ImageSlideshowProps {
  urls: string[];
  aspectRatio?: string;        // e.g. "4/3", "1/1", "16/9"
  autoplayMs?: number;         // ms between slides, default 5000
  isPreview?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  borderRadius?: number;
  overlayGradient?: string;    // optional CSS gradient overlay
  objectFit?: "cover" | "contain";
  filterStyle?: string;        // e.g. "grayscale(15%)"
}

export default function ImageSlideshow({
  urls,
  aspectRatio = "4/3",
  autoplayMs = 5000,
  isPreview = false,
  showArrows = true,
  showDots = true,
  borderRadius = 0,
  overlayGradient,
  objectFit = "cover",
  filterStyle,
}: ImageSlideshowProps) {
  const [active, setActive] = useState(0);
  const total = urls.length;

  const next = useCallback(() => setActive(p => (p + 1) % total), [total]);
  const prev = useCallback(() => setActive(p => (p - 1 + total) % total), [total]);

  // Auto-advance every autoplayMs — disabled in preview to avoid jank
  useEffect(() => {
    if (isPreview || total <= 1) return;
    const t = setInterval(next, autoplayMs);
    return () => clearInterval(t);
  }, [next, total, autoplayMs, isPreview]);

  if (!urls || total === 0) return null;

  // Single image — no controls needed
  if (total === 1) {
    return (
      <div style={{ position: "relative", aspectRatio, borderRadius, overflow: "hidden" }}>
        <img src={urls[0]} alt="Photo" style={{ width: "100%", height: "100%", objectFit, filter: filterStyle }} />
        {overlayGradient && <div style={{ position: "absolute", inset: 0, background: overlayGradient, pointerEvents: "none" }} />}
      </div>
    );
  }

  return (
    <div style={{ position: "relative", aspectRatio, borderRadius, overflow: "hidden" }}>
      {/* Slides */}
      {urls.map((url, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === active ? 1 : 0, transitionProperty: "opacity", transitionDuration: "0.8s", transitionTimingFunction: "ease", zIndex: i === active ? 1 : 0 }}>
          <img src={url} alt={`Photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit, filter: filterStyle }} />
        </div>
      ))}

      {/* Gradient overlay */}
      {overlayGradient && <div style={{ position: "absolute", inset: 0, background: overlayGradient, pointerEvents: "none", zIndex: 2 }} />}

      {/* Arrows — hidden in preview */}
      {showArrows && !isPreview && (
        <>
          <button
            onClick={prev}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(0,0,0,0.45)", color: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}
          >‹</button>
          <button
            onClick={next}
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(0,0,0,0.45)", color: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}
          >›</button>
        </>
      )}

      {/* Dots */}
      {showDots && total > 1 && (
        <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 5, zIndex: 10 }}>
          {urls.map((_, i) => (
            <button
              key={i}
              onClick={() => !isPreview && setActive(i)}
              style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 3, background: i === active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)", border: "none", cursor: isPreview ? "default" : "pointer", transitionProperty: "all", transitionDuration: "0.3s", transitionTimingFunction: "ease", padding: 0 }}
            />
          ))}
        </div>
      )}

      {/* Slide counter badge */}
      {!isPreview && total > 1 && (
        <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10, padding: "3px 8px", background: "rgba(0,0,0,0.45)", borderRadius: 12, fontSize: 10, color: "rgba(255,255,255,0.8)", backdropFilter: "blur(4px)", fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.05em" }}>
          {active + 1} / {total}
        </div>
      )}
    </div>
  );
}
