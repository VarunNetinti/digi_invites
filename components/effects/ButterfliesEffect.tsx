"use client";
import { useEffect, useState } from "react";

interface Butterfly { id: number; y: number; size: number; dur: number; delay: number; color: string; }

function ButterflySVG({ size, color }: { size: number; color: string }) {
  const c2 = color + "99";
  return (
    <svg width={size * 3.6} height={size * 2.8} viewBox="0 0 90 70" style={{ display: "block" }}>
      {/* Upper left wing */}
      <ellipse cx="22" cy="22" rx="20" ry="15" fill={color} opacity="0.88"
        style={{ animation: "bfly-wing 0.42s ease-in-out infinite", transformOrigin: "44px 35px" }} />
      {/* Lower left wing */}
      <ellipse cx="18" cy="44" rx="15" ry="11" fill={c2}
        style={{ animation: "bfly-wing 0.42s ease-in-out 0.06s infinite", transformOrigin: "44px 35px" }} />
      {/* Upper right wing */}
      <ellipse cx="68" cy="22" rx="20" ry="15" fill={color} opacity="0.88"
        style={{ animation: "bfly-wing-r 0.42s ease-in-out infinite", transformOrigin: "46px 35px" }} />
      {/* Lower right wing */}
      <ellipse cx="72" cy="44" rx="15" ry="11" fill={c2}
        style={{ animation: "bfly-wing-r 0.42s ease-in-out 0.06s infinite", transformOrigin: "46px 35px" }} />
      {/* Body */}
      <ellipse cx="45" cy="34" rx="3.5" ry="16" fill="#1a0a2e" />
      <circle cx="45" cy="17" r="4" fill="#1a0a2e" />
      {/* Antennae */}
      <line x1="43" y1="15" x2="34" y2="4"  stroke="#1a0a2e" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="47" y1="15" x2="56" y2="4"  stroke="#1a0a2e" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="33" cy="3"  r="2.2" fill="#1a0a2e" />
      <circle cx="57" cy="3"  r="2.2" fill="#1a0a2e" />
      {/* Wing shimmer dots */}
      <circle cx="24" cy="20" r="4.5" fill="rgba(255,255,255,0.28)" />
      <circle cx="66" cy="20" r="4.5" fill="rgba(255,255,255,0.28)" />
      <circle cx="20" cy="40" r="3"   fill="rgba(255,255,255,0.18)" />
      <circle cx="70" cy="40" r="3"   fill="rgba(255,255,255,0.18)" />
    </svg>
  );
}

const KEYFRAMES = `
@keyframes bfly-wing {
  0%, 100% { transform: scaleX(1); }
  50%       { transform: scaleX(0.25); }
}
@keyframes bfly-wing-r {
  0%, 100% { transform: scaleX(-1); }
  50%       { transform: scaleX(-0.25); }
}
@keyframes butterfly-fly {
  0%   { transform: translate(-80px, 0) rotate(0deg);   opacity: 0; }
  10%  { opacity: 1; }
  28%  { transform: translate(22vw, -60px) rotate(12deg); }
  50%  { transform: translate(45vw, -18px) rotate(-8deg); }
  72%  { transform: translate(68vw, -75px) rotate(18deg); }
  90%  { opacity: 1; }
  100% { transform: translate(112vw, -28px) rotate(-4deg); opacity: 0; }
}`;

export default function ButterfliesEffect({ accentColor = "#c9a84c", density = 7, isPreview = false }: { accentColor?: string; density?: number; isPreview?: boolean }) {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const pos = isPreview ? "absolute" : "fixed";
  const palette = ["#f59e0b", "#ec4899", "#8b5cf6", accentColor, "#06b6d4", "#f97316", "#84cc16", "#e879f9"];

  useEffect(() => {
    setButterflies(Array.from({ length: density }, (_, i) => ({
      id: i,
      y: 5 + Math.random() * 65,
      size: 9 + Math.random() * 10,
      dur: 11 + Math.random() * 8,
      delay: i * (22 / density),
      color: palette[i % palette.length],
    })));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density]);

  return (
    <>
      <style>{KEYFRAMES}</style>
      {butterflies.map(b => (
        <div key={b.id} style={{
          position: pos, top: `${b.y}%`, left: 0,
          zIndex: 998, pointerEvents: "none", userSelect: "none",
          animation: `butterfly-fly ${b.dur}s ease-in-out ${b.delay}s infinite`,
        }}>
          <ButterflySVG size={b.size} color={b.color} />
        </div>
      ))}
    </>
  );
}
