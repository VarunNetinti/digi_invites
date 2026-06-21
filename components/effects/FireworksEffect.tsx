"use client";
import { useEffect, useState } from "react";

interface Burst { id:number; x:number; y:number; color:string; size:number; delay:number; }
interface Spark { dx:number; dy:number; }

const DIRS = 12;
function genSparks(): Spark[] {
  return Array.from({ length: DIRS }, (_, i) => {
    const angle = (i / DIRS) * Math.PI * 2;
    const r = 40 + Math.random() * 40;
    return { dx: Math.cos(angle) * r, dy: Math.sin(angle) * r };
  });
}

function FireworkBurst({ x, y, color, size, delay }: Burst) {
  const sparks = genSparks();
  return (
    <div style={{ position:"absolute", left:`${x}%`, top:`${y}%`, zIndex:998, pointerEvents:"none" }}>
      {sparks.map((s,i) => (
        <div key={i} style={{
          position:"absolute", left:0, top:0,
          width: size, height: size, borderRadius:"50%",
          background: color,
          boxShadow:`0 0 ${size*2}px ${color}`,
          animationDelay:`${delay}s`,
          // use CSS variables for direction
          ["--fx" as string]:`${s.dx}px`,
          ["--fy" as string]:`${s.dy}px`,
          animation:`firework-burst ${0.8+Math.random()*0.4}s ease-out ${delay + i*0.03}s infinite`,
        }} />
      ))}
      {/* Central flash */}
      <div style={{
        position:"absolute", left:-10, top:-10,
        width:20, height:20, borderRadius:"50%",
        background:`radial-gradient(circle, #fff 0%, ${color} 60%, transparent 100%)`,
        animation:`lotus-bloom 1.2s ease-out ${delay}s infinite`,
        zIndex:999,
      }} />
    </div>
  );
}

export default function FireworksEffect({ accentColor="#c9a84c", density=6, isPreview=false }: { accentColor?:string; density?:number; isPreview?:boolean }) {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const colors = [accentColor,"#ff6b8a","#60a5fa","#4ade80","#fbbf24","#a78bfa","#f472b6","#34d399","#ff8fa3"];

  useEffect(() => {
    setBursts(Array.from({ length: density }, (_,i) => ({
      id:i, x:10+Math.random()*80, y:10+Math.random()*60,
      color:colors[i%colors.length], size:3+Math.random()*4,
      delay: Math.random()*3,
    })));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density]);

  const container = isPreview ? "absolute" : "fixed";
  return (
    <div style={{ position:container, inset:0, pointerEvents:"none", zIndex:997, overflow:"hidden" }}>
      {bursts.map(b => <FireworkBurst key={b.id} {...b} />)}
    </div>
  );
}
