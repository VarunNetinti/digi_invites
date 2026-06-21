"use client";
import { useEffect, useState } from "react";

interface G { id:number; x:number; size:number; dur:number; delay:number; shape:string; }

export default function GoldDustEffect({ accentColor="#c9a84c", density=30, isPreview=false }: { accentColor?:string; density?:number; isPreview?:boolean }) {
  const [g, setG] = useState<G[]>([]);
  const shapes = ["✦","✧","⭒","⋆","✺","✹","✸","★","◆","❋"];
  const pos = isPreview ? "absolute" : "fixed";

  useEffect(() => {
    setG(Array.from({ length: density }, (_,i) => ({
      id:i, x:Math.random()*98, size:4+Math.random()*16,
      dur:3+Math.random()*4, delay:Math.random()*10,
      shape:shapes[Math.floor(Math.random()*shapes.length)],
    })));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density]);

  return (
    <>
      {g.map(p => (
        <div key={p.id} style={{
          position:pos, left:`${p.x}%`, bottom:-10,
          fontSize:p.size, color:accentColor,
          pointerEvents:"none", zIndex:998, userSelect:"none",
          filter:`drop-shadow(0 0 ${p.size/2}px ${accentColor}) drop-shadow(0 0 ${p.size}px ${accentColor}88)`,
          animation:`gold-dust ${p.dur}s ease-out ${p.delay}s infinite`,
          textShadow:`0 0 ${p.size}px ${accentColor}`,
        }}>{p.shape}</div>
      ))}
    </>
  );
}
