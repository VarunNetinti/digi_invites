"use client";
import { useEffect, useState } from "react";

interface F { id:number; x:number; y:number; size:number; dur:number; delay:number; color:string; }

export default function FirefliesEffect({ accentColor="#c9a84c", density=20, isPreview=false }: { accentColor?:string; density?:number; isPreview?:boolean }) {
  const [flies, setFlies] = useState<F[]>([]);
  const colors = [accentColor,"#fffacd","#fff8b0","#ffd700","#e8d5a3","#fffbe6","#f0e68c"];
  const pos = isPreview ? "absolute" : "fixed";

  useEffect(() => {
    setFlies(Array.from({ length: density }, (_,i) => ({
      id:i, x:5+Math.random()*90, y:5+Math.random()*90,
      size:4+Math.random()*8,
      dur:3+Math.random()*4, delay:Math.random()*8,
      color:colors[Math.floor(Math.random()*colors.length)],
    })));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density]);

  return (
    <>
      {flies.map(f => (
        <div key={f.id} style={{
          position:pos, left:`${f.x}%`, top:`${f.y}%`,
          width:f.size, height:f.size, borderRadius:"50%",
          background:f.color,
          boxShadow:`0 0 ${f.size*2}px ${f.size}px ${f.color}, 0 0 ${f.size*4}px ${f.color}88`,
          pointerEvents:"none", zIndex:998,
          animation:`firefly-glow ${f.dur}s ease-in-out ${f.delay}s infinite`,
        }} />
      ))}
    </>
  );
}
