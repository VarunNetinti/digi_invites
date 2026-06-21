"use client";
import { useEffect, useState } from "react";

interface Star { id: number; x: number; size: number; dur: number; delay: number; color: string; shape: string; }

export default function StarsEffect({ accentColor = "#c9a84c", density = 20 }: { accentColor?: string; density?: number; isPreview?: boolean }) {
  const [stars, setStars] = useState<Star[]>([]);
  const colors = [accentColor,"#fff","#e8d5a3","#ffd700","#f9c74f","#fffbe6","#c8d8f0"];
  const shapes = ["✦","✧","★","⭐","✨","💫","⚡"];

  useEffect(() => {
    setStars(Array.from({ length: density }, (_, i) => ({
      id: i, x: Math.random() * 98,
      size: 8 + Math.random() * 18,
      dur: 4 + Math.random() * 5,
      delay: Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    })));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density]);

  return (
    <>
      {stars.map(s => (
        <div key={s.id} style={{
          position: pos, left: `${s.x}%`, bottom: -20,
          fontSize: s.size, color: s.color, userSelect: "none", pointerEvents: "none", zIndex: 998,
          animation: `star-drift ${s.dur}s ease-out ${s.delay}s infinite`,
          textShadow: `0 0 8px ${s.color}`,
        }}>{s.shape}</div>
      ))}
    </>
  );
}
