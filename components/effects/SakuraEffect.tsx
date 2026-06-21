"use client";
import { useEffect, useState } from "react";

interface S { id:number; x:number; size:number; dur:number; delay:number; type:number; }

function Petal({ size, type, color }: { size:number; type:number; color:string }) {
  const c2 = color+"99";
  if (type === 0) return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <ellipse cx="20" cy="10" rx="10" ry="14" fill={color} opacity="0.85" transform="rotate(0 20 20)" />
      <ellipse cx="20" cy="10" rx="10" ry="14" fill={c2} opacity="0.6" transform="rotate(72 20 20)" />
      <ellipse cx="20" cy="10" rx="10" ry="14" fill={color} opacity="0.75" transform="rotate(144 20 20)" />
      <ellipse cx="20" cy="10" rx="10" ry="14" fill={c2} opacity="0.65" transform="rotate(216 20 20)" />
      <ellipse cx="20" cy="10" rx="10" ry="14" fill={color} opacity="0.8" transform="rotate(288 20 20)" />
      <circle cx="20" cy="20" r="4" fill="#fff" opacity="0.9" />
    </svg>
  );
  if (type === 1) return (
    <svg width={size*0.7} height={size*0.7} viewBox="0 0 30 30">
      <path d="M15,2 Q22,8 28,15 Q22,22 15,28 Q8,22 2,15 Q8,8 15,2Z" fill={color} opacity="0.8" />
    </svg>
  );
  return <span style={{ color, fontSize:size, filter:`drop-shadow(0 0 3px ${color}88)` }}>🌸</span>;
}

export default function SakuraEffect({ accentColor="#ffb7c5", density=18, isPreview=false }: { accentColor?:string; density?:number; isPreview?:boolean }) {
  const [petals, setPetals] = useState<S[]>([]);
  const pos = isPreview ? "absolute" : "fixed";
  const colors = ["#ffb7c5","#ff9eb5","#ffc8d8","#ffafc5","#ffd6e7","#ff85a1",accentColor];

  useEffect(() => {
    setPetals(Array.from({ length: density }, (_,i) => ({
      id:i, x:Math.random()*94, size:14+Math.random()*16,
      dur:5+Math.random()*6, delay:Math.random()*14,
      type:Math.floor(Math.random()*3),
    })));
  }, [density]);

  return (
    <>
      {petals.map(p => (
        <div key={p.id} style={{
          position:pos, left:`${p.x}%`, top:-20,
          pointerEvents:"none", zIndex:998, userSelect:"none",
          animation:`sakura-drift ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }}>
          <Petal size={p.size} type={p.type} color={colors[p.id % colors.length]} />
        </div>
      ))}
    </>
  );
}
