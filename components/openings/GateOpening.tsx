"use client";
import { useState } from "react";

interface Props { brideName:string; groomName:string; accentColor:string; onOpen:()=>void; }

export default function GateOpening({ brideName, groomName, accentColor, onOpen }: Props) {
  const [stage, setStage] = useState<"idle"|"opening"|"done">("idle");

  const open = () => {
    if (stage !== "idle") return;
    setStage("opening");
    setTimeout(() => { setStage("done"); onOpen(); }, 1800);
  };

  const gold = accentColor;

  const GateDoor = ({ side }: { side:"left"|"right" }) => {
    const isLeft = side==="left";
    return (
      <div style={{
        position:"absolute", top:0, bottom:0, width:"50%",
        [isLeft?"left":"right"]: 0,
        transformOrigin: isLeft?"right":"left",
        transformStyle:"preserve-3d",
        animation: stage==="opening" ? `${isLeft?"gate-left":"gate-right"} 1.5s cubic-bezier(0.4,0,0.2,1) forwards` : "none",
        background: `linear-gradient(${isLeft?"90deg":"270deg"},#0a0a0f,#111128)`,
        borderRight: isLeft ? `1px solid ${gold}33` : "none",
        borderLeft: !isLeft ? `1px solid ${gold}33` : "none",
        boxShadow: isLeft ? `4px 0 30px rgba(0,0,0,0.8)` : `-4px 0 30px rgba(0,0,0,0.8)`,
        overflow:"hidden",
      }}>
        {/* Gate bars pattern */}
        {Array.from({length:6}).map((_,i) => (
          <div key={i} style={{
            position:"absolute", top:0, bottom:0,
            left: isLeft ? `${10+i*15}%` : `${10+i*15}%`,
            width:3,
            background:`linear-gradient(180deg,${gold}88,${gold}22,${gold}88)`,
            opacity:0.35,
          }}>
            {/* Decorative knobs on bars */}
            {[20,50,80].map(y => <div key={y} style={{ position:"absolute", top:`${y}%`, left:-4, width:11, height:11, borderRadius:"50%", background:`radial-gradient(circle at 35% 30%,${gold},#5a3010)`, boxShadow:`0 0 4px ${gold}66` }} />)}
          </div>
        ))}
        {/* Top arch ornament */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:`linear-gradient(90deg,transparent,${gold},transparent)` }} />
        {/* Corner ornament */}
        <div style={{ position:"absolute", [isLeft?"right":"left"]:0, top:0, bottom:0, width:4, background:`linear-gradient(180deg,${gold}44,${gold}22,${gold}44)` }} />
        <div style={{ position:"absolute", inset:0, background: isLeft ? "linear-gradient(90deg,transparent,rgba(255,255,255,0.02))" : "linear-gradient(270deg,transparent,rgba(255,255,255,0.02))", pointerEvents:"none" }} />
      </div>
    );
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, overflow:"hidden", opacity:stage==="done"?0:1, pointerEvents:stage==="done"?"none":"all", transitionProperty: "opacity", transitionDuration: "0.5s", transitionTimingFunction: "ease", transitionDelay: "0.4s" }}>

      {/* Background */}
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 50% 40%,#1a0832,#0a0a14 70%,#000)` }}>
        {Array.from({length:30}).map((_,i) => <div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, width:2, height:2, borderRadius:"50%", background:"#fff", opacity:0.15+Math.random()*0.3, animation:`twinkle ${1.5+Math.random()*2}s ease-in-out ${Math.random()*3}s infinite` }} />)}
      </div>

      {/* Center text between gates */}
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:0 }}>
        <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:56, color:gold, textShadow:`0 0 40px ${gold}66`, animation:"glow-pulse 2.5s ease-in-out infinite", lineHeight:1.1 }}>{brideName || "Bride"}</p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:`${gold}88`, fontStyle:"italic", margin:"6px 0" }}>&amp;</p>
        <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:56, color:gold, textShadow:`0 0 40px ${gold}66`, animation:"glow-pulse 2.5s ease-in-out 0.4s infinite", lineHeight:1.1 }}>{groomName || "Groom"}</p>
      </div>

      {/* Gate doors */}
      <div style={{ position:"absolute", inset:0, perspective:1200 }}>
        <GateDoor side="left" />
        <GateDoor side="right" />
      </div>

      {/* Center lock / click target */}
      {stage === "idle" && (
        <div onClick={open} style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", zIndex:10, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          <div style={{ width:52, height:52, borderRadius:"50%", background:`radial-gradient(circle at 35% 30%,${gold},#5a3010)`, boxShadow:`0 0 20px ${gold}88, 0 4px 12px rgba(0,0,0,0.6)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, animation:"heart-pulse 2s ease-in-out infinite" }}>🔑</div>
          <p style={{ fontFamily:"'Lato',sans-serif", fontSize:9, letterSpacing:"0.4em", textTransform:"uppercase", color:`${gold}88`, whiteSpace:"nowrap" }}>Tap to enter</p>
        </div>
      )}
    </div>
  );
}
