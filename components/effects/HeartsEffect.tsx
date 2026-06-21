"use client";
import { useEffect, useState } from "react";

interface P { id: number; x: number; size: number; dur: number; delay: number; color: string; shape: string; blur: boolean; }

export default function HeartsEffect({ accentColor="#c9a84c", density=22, isPreview=false }: { accentColor?:string; density?:number; isPreview?:boolean }) {
  const [p, setP] = useState<P[]>([]);
  const colors = ["#ff6b8a","#ff4d6d","#c9184a","#ff8fa3",accentColor,"#ffb3c1","#fff0f5","#ffd6e0","#ffafc5"];
  const shapes = ["♥","❤","💕","💗","💖","💝","♡","🤍","💞"];

  useEffect(() => {
    setP(Array.from({ length: density }, (_,i) => ({
      id:i, x:2+Math.random()*96, size:8+Math.random()*28,
      dur:4+Math.random()*7, delay:Math.random()*12,
      color:colors[Math.floor(Math.random()*colors.length)],
      shape:shapes[Math.floor(Math.random()*shapes.length)],
      blur: Math.random()>0.6,
    })));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density]);

  const pos = isPreview ? "absolute" : "fixed";

  return (
    <>
      {p.map(h => (
        <div key={h.id} style={{
          position: pos, left:`${h.x}%`, bottom:-30,
          fontSize:h.size, color:h.color,
          userSelect:"none", pointerEvents:"none", zIndex:998,
          filter: h.blur ? `blur(1.5px) drop-shadow(0 0 6px ${h.color})` : `drop-shadow(0 0 4px ${h.color}99)`,
          animation:`heart-float ${h.dur}s ease-in ${h.delay}s infinite, heart-sway ${h.dur*0.65}s ease-in-out ${h.delay}s infinite`,
        }}>{h.shape}</div>
      ))}
    </>
  );
}
