"use client";
import { useState, useEffect } from "react";

interface Props { brideName:string; groomName:string; accentColor:string; onOpen:()=>void; }

export default function ZoomRevealOpening({ brideName, groomName, accentColor, onOpen }: Props) {
  const [stage, setStage] = useState<"idle"|"zooming"|"done">("idle");
  const gold = accentColor;

  const open = () => {
    if (stage !== "idle") return;
    setStage("zooming");
    setTimeout(() => { setStage("done"); onOpen(); }, 1800);
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, overflow:"hidden", opacity:stage==="done"?0:1, pointerEvents:stage==="done"?"none":"all", transitionProperty: "opacity", transitionDuration: "0.6s", transitionTimingFunction: "ease", transitionDelay: "0.2s" }}>

      {/* Deep space background */}
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 50% 50%,#0a0a2e 0%,#030318 50%,#000 100%)` }}>
        {Array.from({length:80}).map((_,i) => (
          <div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, width:1+Math.random()*2, height:1+Math.random()*2, borderRadius:"50%", background:"#fff", opacity:0.1+Math.random()*0.6, animation:`twinkle ${1+Math.random()*3}s ease-in-out ${Math.random()*4}s infinite` }} />
        ))}
      </div>

      {/* The zooming content card */}
      <div onClick={open} style={{
        position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor: stage==="idle"?"pointer":"default",
        animation: stage==="zooming" ? "zoom-reveal-in 1.6s cubic-bezier(0.22,1,0.36,1) reverse both" : "none",
      }}>
        {/* Orbital rings */}
        {[200, 300, 420].map((r,i) => (
          <div key={i} style={{ position:"absolute", width:r, height:r, borderRadius:"50%", border:`1px solid ${gold}${["33","22","11"][i]}`, animation:`mandala-spin ${12+i*4}s linear ${i*2}s infinite`, pointerEvents:"none" }}>
            <div style={{ position:"absolute", top:-4, left:"50%", transform:"translateX(-50%)", width:8, height:8, borderRadius:"50%", background:gold, boxShadow:`0 0 8px ${gold}`, opacity:0.7 }} />
          </div>
        ))}

        {/* Central content */}
        <div style={{ textAlign:"center", position:"relative", zIndex:2 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:gold, boxShadow:`0 0 20px 8px ${gold}88`, margin:"0 auto 28px" }} />
          <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:72, color:gold, lineHeight:1, textShadow:`0 0 60px ${gold}88`, animation:"glow-pulse 2s ease-in-out infinite", marginBottom:4 }}>{brideName||"Bride"}</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, color:`${gold}88`, fontStyle:"italic", margin:"6px 0" }}>&amp;</p>
          <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:72, color:gold, lineHeight:1, textShadow:`0 0 60px ${gold}88`, animation:"glow-pulse 2s ease-in-out 0.5s infinite" }}>{groomName||"Groom"}</p>
          <div style={{ display:"flex", alignItems:"center", gap:12, margin:"24px auto 0", width:220 }}>
            <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${gold})`, opacity:0.4 }} />
            <span style={{ color:gold, fontSize:10, opacity:0.6 }}>✦</span>
            <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${gold},transparent)`, opacity:0.4 }} />
          </div>
        </div>

        {stage === "idle" && (
          <div style={{ marginTop:40, animation:"fade-up 1s ease 0.6s both" }}>
            <div style={{ width:48, height:48, borderRadius:"50%", border:`1.5px solid ${gold}55`, margin:"0 auto 10px", display:"flex", alignItems:"center", justifyContent:"center", animation:"heart-pulse 1.8s ease-in-out infinite" }}>
              <span style={{ fontSize:20 }}>🌌</span>
            </div>
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, letterSpacing:"0.4em", textTransform:"uppercase", color:`${gold}88`, textAlign:"center" }}>Tap to enter</p>
          </div>
        )}
      </div>
    </div>
  );
}
