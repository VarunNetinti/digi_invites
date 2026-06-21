"use client";
import { useEffect, useState } from "react";

interface Petal { id: number; x: number; size: number; dur: number; delay: number; emoji: string; }

export default function RosePetalsEffect({ density = 16 }: { density?: number; isPreview?: boolean }) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const emojis = ["🌸","🌺","🌹","🌼","💐","🏵️","🌷"];

  useEffect(() => {
    setPetals(Array.from({ length: density }, (_, i) => ({
      id: i, x: Math.random() * 96,
      size: 12 + Math.random() * 16,
      dur: 5 + Math.random() * 6,
      delay: Math.random() * 12,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    })));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density]);

  return (
    <>
      {petals.map(p => (
        <div key={p.id} style={{
          position: pos, left: `${p.x}%`, top: -20,
          fontSize: p.size, userSelect: "none", pointerEvents: "none", zIndex: 998,
          animation: `rose-fall ${p.dur}s linear ${p.delay}s infinite`,
        }}>{p.emoji}</div>
      ))}
    </>
  );
}
