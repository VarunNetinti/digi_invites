"use client";
import { useEffect, useState } from "react";

interface Parrot { id: number; y: number; size: number; dur: number; delay: number; flip: boolean; }

function ParrotSVG({ size, flip }: { size: number; flip: boolean }) {
  return (
    <svg width={size * 3.2} height={size * 2.4} viewBox="0 0 96 72"
      style={{ transform: flip ? "scaleX(-1)" : "none", display: "block" }}>
      {/* Body */}
      <ellipse cx="46" cy="44" rx="19" ry="14" fill="#16a34a" />
      {/* Head */}
      <circle cx="66" cy="26" r="13" fill="#15803d" />
      {/* Red forehead patch */}
      <path d="M57,14 Q66,8 75,16 Q70,23 63,20Z" fill="#ef4444" />
      {/* Beak */}
      <path d="M77,24 Q87,28 77,33 Q72,28 77,24Z" fill="#f59e0b" />
      {/* Eye */}
      <circle cx="70" cy="22" r="3.5" fill="#fff" />
      <circle cx="71" cy="22" r="1.8" fill="#0f172a" />
      <circle cx="71.5" cy="21.2" r="0.6" fill="#fff" />
      {/* Wing — flaps on animation */}
      <ellipse cx="38" cy="38" rx="22" ry="10" fill="#4ade80"
        style={{ animation: "wing-flap 0.38s ease-in-out infinite", transformOrigin: "56px 38px" }} />
      {/* Wing highlight */}
      <ellipse cx="35" cy="35" rx="12" ry="5" fill="#86efac" opacity="0.6"
        style={{ animation: "wing-flap 0.38s ease-in-out infinite", transformOrigin: "56px 38px" }} />
      {/* Tail feathers */}
      <path d="M27,52 Q10,66 6,78 Q18,62 29,58Z" fill="#15803d" />
      <path d="M29,54 Q12,64 9,74 Q20,62 31,60Z" fill="#f59e0b" />
      <path d="M31,53 Q16,60 14,70 Q24,60 33,58Z" fill="#22c55e" />
      {/* Belly */}
      <ellipse cx="48" cy="48" rx="11" ry="7" fill="#86efac" opacity="0.65" />
    </svg>
  );
}

const KEYFRAMES = `
@keyframes parrot-fly {
  0%   { transform: translateX(-100px) translateY(0) rotate(-4deg); opacity: 0; }
  8%   { opacity: 1; }
  35%  { transform: translateX(28vw) translateY(-55px) rotate(4deg); }
  55%  { transform: translateX(52vw) translateY(-15px) rotate(-6deg); }
  75%  { transform: translateX(75vw) translateY(-65px) rotate(5deg); }
  92%  { opacity: 1; }
  100% { transform: translateX(112vw) translateY(-35px) rotate(-3deg); opacity: 0; }
}
@keyframes wing-flap {
  0%, 100% { transform: scaleY(1) rotate(0deg); }
  50%       { transform: scaleY(-0.35) rotate(8deg); }
}`;

export default function ParrotsEffect({ density = 5, isPreview = false }: { accentColor?: string; density?: number; isPreview?: boolean }) {
  const [parrots, setParrots] = useState<Parrot[]>([]);
  const pos = isPreview ? "absolute" : "fixed";

  useEffect(() => {
    setParrots(Array.from({ length: density }, (_, i) => ({
      id: i,
      y: 6 + Math.random() * 55,
      size: 11 + Math.random() * 10,
      dur: 10 + Math.random() * 7,
      delay: i * (20 / density),
      flip: i % 2 === 0,
    })));
  }, [density]);

  return (
    <>
      <style>{KEYFRAMES}</style>
      {parrots.map(p => (
        <div key={p.id} style={{
          position: pos, top: `${p.y}%`, left: 0,
          zIndex: 998, pointerEvents: "none", userSelect: "none",
          animation: `parrot-fly ${p.dur}s linear ${p.delay}s infinite`,
        }}>
          <ParrotSVG size={p.size} flip={p.flip} />
        </div>
      ))}
    </>
  );
}
