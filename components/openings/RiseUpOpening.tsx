"use client";
import { useState } from "react";

interface Props { brideName:string; groomName:string; accentColor:string; onOpen:()=>void; }

export default function RiseUpOpening({ brideName, groomName, accentColor, onOpen }: Props) {
  const [stage, setStage] = useState<"idle"|"rising"|"done">("idle");
  const gold = accentColor;

  const open = () => {
    if (stage !== "idle") return;
    setStage("rising");
    setTimeout(() => { setStage("done"); onOpen(); }, 1800);
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, overflow:"hidden", opacity:stage==="done"?0:1, pointerEvents:stage==="done"?"none":"all", transitionProperty: "opacity", transitionDuration: "0.5s", transitionTimingFunction: "ease", transitionDelay: "0.3s" }}>

      {/* Background */}
      <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg,#000 0%,#0a0518 40%,#1a0832 100%)` }}>
        {Array.from({length:25}).map((_,i) => (
          <div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, width:2, height:2, borderRadius:"50%", background:gold, opacity:0.1+Math.random()*0.3, animation:`twinkle ${2+Math.random()*2}s ease-in-out ${Math.random()*4}s infinite` }} />
        ))}
      </div>

      {/* The rising panel */}
      <div style={{
        position:"absolute", left:0, right:0, bottom:0, zIndex:2,
        animation: stage==="rising" ? "rise-up-reveal 1.5s cubic-bezier(0.22,1,0.36,1) reverse both" : "none",
        cursor: stage==="idle"?"pointer":"default",
      }} onClick={open}>
        <div style={{ background:`linear-gradient(180deg,transparent 0%,${gold}08 20%,${gold}14 100%)`, borderTop:`2px solid ${gold}44`, padding:"48px 0 80px", display:"flex", flexDirection:"column", alignItems:"center", gap:16, position:"relative", backdropFilter:"blur(8px)" }}>

          {/* Glow line */}
          <div style={{ position:"absolute", top:0, left:"20%", right:"20%", height:2, background:`linear-gradient(90deg,transparent,${gold},transparent)` }} />

          <p style={{ fontFamily:"'Lato',sans-serif", fontSize:9, letterSpacing:"0.6em", textTransform:"uppercase", color:`${gold}66` }}>Wedding Invitation</p>
          <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:64, color:gold, lineHeight:1, textShadow:`0 0 40px ${gold}66`, animation:"glow-pulse 2.5s ease-in-out infinite" }}>{brideName||"Bride"}</p>
          <div style={{ display:"flex", alignItems:"center", gap:16, width:200 }}>
            <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${gold})`, opacity:0.4 }} />
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, color:`${gold}88`, fontStyle:"italic" }}>&amp;</span>
            <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${gold},transparent)`, opacity:0.4 }} />
          </div>
          <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:64, color:gold, lineHeight:1, textShadow:`0 0 40px ${gold}66`, animation:"glow-pulse 2.5s ease-in-out 0.4s infinite" }}>{groomName||"Groom"}</p>

          {stage === "idle" && (
            <div style={{ marginTop:12, textAlign:"center", animation:"float 2s ease-in-out infinite" }}>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, letterSpacing:"0.4em", textTransform:"uppercase", color:`${gold}88` }}>↑  Tap to reveal  ↑</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
