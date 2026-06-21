"use client";
import { useState } from "react";

interface Props { brideName:string; groomName:string; accentColor:string; onOpen:()=>void; }

export default function CurtainOpening({ brideName, groomName, accentColor, onOpen }: Props) {
  const [stage, setStage] = useState<"idle"|"opening"|"done">("idle");

  const open = () => {
    if (stage !== "idle") return;
    setStage("opening");
    setTimeout(() => { setStage("done"); onOpen(); }, 1800);
  };

  const gold = accentColor;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, overflow:"hidden", opacity: stage==="done"?0:1, pointerEvents:stage==="done"?"none":"all", transitionProperty: "opacity", transitionDuration: "0.5s", transitionTimingFunction: "ease", transitionDelay: "0.3s" }}>

      {/* ── Left curtain ── */}
      <div style={{
        position:"absolute", top:0, left:0, bottom:0, width:"50%", zIndex:2,
        background:`linear-gradient(90deg,#1a0a2e 0%,#2d1444 60%,#3d1a5e 100%)`,
        transform: stage==="opening" ? "translateX(-100%)" : "translateX(0)",
        transitionProperty: "transform", transitionDuration: "1.4s", transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)", transitionDelay: "0.1s",
        boxShadow: stage==="idle" ? "8px 0 40px rgba(0,0,0,0.8)" : "none",
      }}>
        {/* Curtain fabric folds */}
        {[0.15,0.35,0.55,0.75,0.9].map((x,i) => (
          <div key={i} style={{ position:"absolute", top:0, bottom:0, left:`${x*100}%`, width:2, background:`linear-gradient(180deg,transparent,${gold}22,transparent)`, opacity:0.4 }} />
        ))}
        {/* Curtain top rod */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:12, background:`linear-gradient(90deg,#5a3010,${gold},#3d1a5e)`, zIndex:3 }} />
        {/* Tassel */}
        {[20,50,80].map(x => (
          <div key={x} style={{ position:"absolute", top:10, left:`${x}%`, display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:gold, boxShadow:`0 0 6px ${gold}` }} />
            <div style={{ width:1.5, height:30, background:`linear-gradient(180deg,${gold},transparent)` }} />
          </div>
        ))}
        {/* Sheen overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,rgba(255,255,255,0.05) 0%,transparent 40%)", pointerEvents:"none" }} />
      </div>

      {/* ── Right curtain ── */}
      <div style={{
        position:"absolute", top:0, right:0, bottom:0, width:"50%", zIndex:2,
        background:`linear-gradient(270deg,#1a0a2e 0%,#2d1444 60%,#3d1a5e 100%)`,
        transform: stage==="opening" ? "translateX(100%)" : "translateX(0)",
        transitionProperty: "transform", transitionDuration: "1.4s", transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)", transitionDelay: "0.1s",
        boxShadow: stage==="idle" ? "-8px 0 40px rgba(0,0,0,0.8)" : "none",
      }}>
        {[0.1,0.25,0.45,0.65,0.85].map((x,i) => (
          <div key={i} style={{ position:"absolute", top:0, bottom:0, left:`${x*100}%`, width:2, background:`linear-gradient(180deg,transparent,${gold}22,transparent)`, opacity:0.4 }} />
        ))}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:12, background:`linear-gradient(90deg,#3d1a5e,${gold},#5a3010)`, zIndex:3 }} />
        {[20,50,80].map(x => (
          <div key={x} style={{ position:"absolute", top:10, left:`${x}%`, display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:gold, boxShadow:`0 0 6px ${gold}` }} />
            <div style={{ width:1.5, height:30, background:`linear-gradient(180deg,${gold},transparent)` }} />
          </div>
        ))}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(75deg,transparent 40%,rgba(255,255,255,0.05) 100%)", pointerEvents:"none" }} />
      </div>

      {/* ── Center stage content ── */}
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:1, background:`radial-gradient(ellipse at 50% 40%,#2d1444,#0f0520 70%,#000)` }}>
        <div style={{ position:"absolute", inset:0, opacity:0.03, backgroundImage:`radial-gradient(${gold} 1px,transparent 1px)`, backgroundSize:"28px 28px" }} />
        <div style={{ textAlign:"center", position:"relative" }}>
          <p style={{ fontFamily:"'Lato',sans-serif", fontSize:9, letterSpacing:"0.7em", textTransform:"uppercase", color:`${gold}66`, marginBottom:20 }}>Now Presenting</p>
          <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:64, color:gold, lineHeight:1, textShadow:`0 0 60px ${gold}66`, animation:"glow-pulse 2.5s ease-in-out infinite" }}>{brideName || "Bride"}</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, color:`${gold}88`, fontStyle:"italic", margin:"8px 0" }}>&amp;</p>
          <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:64, color:gold, lineHeight:1, textShadow:`0 0 60px ${gold}66`, animation:"glow-pulse 2.5s ease-in-out 0.5s infinite" }}>{groomName || "Groom"}</p>
        </div>

        {stage === "idle" && (
          <div onClick={open} style={{ marginTop:48, cursor:"pointer", textAlign:"center", animation:"fade-up 1s ease 0.5s both" }}>
            <div style={{ width:50, height:50, borderRadius:"50%", border:`1.5px solid ${gold}44`, margin:"0 auto 12px", display:"flex", alignItems:"center", justifyContent:"center", animation:"heart-pulse 1.8s ease-in-out infinite" }}>
              <span style={{ fontSize:22 }}>🎭</span>
            </div>
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, letterSpacing:"0.4em", textTransform:"uppercase", color:`${gold}88` }}>Tap to open curtains</p>
          </div>
        )}
      </div>
    </div>
  );
}
