"use client";
import { useEffect, useState } from "react";

interface Piece { id: number; x: number; size: number; dur: number; delay: number; color: string; shape: string; }

export default function ConfettiEffect({ accentColor = "#c9a84c", density = 24 }: { accentColor?: string; density?: number; isPreview?: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const colors = [accentColor,"#ff6b8a","#4ade80","#60a5fa","#fbbf24","#f472b6","#34d399","#a78bfa"];
  const shapes = ["■","▲","●","◆","▮","▯","❋","✿"];

  useEffect(() => {
    setPieces(Array.from({ length: density }, (_, i) => ({
      id: i, x: Math.random() * 96,
      size: 6 + Math.random() * 10,
      dur: 4 + Math.random() * 4,
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    })));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density]);

  return (
    <>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: pos, left: `${p.x}%`, top: -10,
          fontSize: p.size, color: p.color, userSelect: "none", pointerEvents: "none", zIndex: 998,
          animation: `confetti-fall ${p.dur}s linear ${p.delay}s infinite`,
        }}>{p.shape}</div>
      ))}
    </>
  );
}
