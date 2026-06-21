"use client";
import { useEffect, useState } from "react";

interface Bird { id: number; y: number; size: number; dur: number; delay: number; }

function MBird({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size * 3} height={size * 1.5} viewBox="0 0 60 24" fill="none">
      {/* Two wings forming M shape — top wing flaps */}
      <path d="M2,18 Q10,4 18,12 Q26,20 30,12 Q34,4 42,12 Q50,20 58,10"
        stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"
        style={{ animation: "bird-wing 0.35s ease-in-out infinite", transformOrigin: "30px 12px" }}
      />
    </svg>
  );
}

const KEYFRAMES = `
@keyframes bird-fly {
  0%   { transform: translateX(-120px) translateY(0px); opacity: 0; }
  5%   { opacity: 1; }
  100% { transform: translateX(110vw) translateY(-40px); opacity: 0; }
}
@keyframes bird-wing {
  0%, 100% { transform: scaleY(1); }
  50%       { transform: scaleY(-0.5); }
}`;

export default function BirdsEffect({ accentColor = "#c9a84c", density = 8, isPreview = false }: { accentColor?: string; density?: number; isPreview?: boolean }) {
  const [birds, setBirds] = useState<Bird[]>([]);
  const pos = isPreview ? "absolute" : "fixed";
  const colors = ["#c9a84c", "#e8d5a3", accentColor, "#fff", "#aaa", "#d4af37"];

  useEffect(() => {
    setBirds(Array.from({ length: density }, (_, i) => ({
      id: i,
      y: 5 + Math.random() * 60,
      size: 7 + Math.random() * 8,
      dur: 7 + Math.random() * 6,
      delay: i * (16 / density),
    })));
  }, [density]);

  return (
    <>
      <style>{KEYFRAMES}</style>
      {birds.map(b => (
        <div key={b.id} style={{
          position: pos, top: `${b.y}%`, left: 0,
          zIndex: 998, pointerEvents: "none", userSelect: "none",
          animation: `bird-fly ${b.dur}s linear ${b.delay}s infinite`,
        }}>
          <MBird size={b.size} color={colors[b.id % colors.length]} />
        </div>
      ))}
    </>
  );
}
