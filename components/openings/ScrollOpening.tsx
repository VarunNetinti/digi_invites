"use client";
import { useState } from "react";

interface Props { brideName:string; groomName:string; accentColor:string; onOpen:()=>void; }

export default function ScrollOpening({ brideName, groomName, accentColor, onOpen }: Props) {
  const [stage, setStage] = useState<"idle"|"unrolling"|"done">("idle");

  const open = () => {
    if (stage !== "idle") return;
    setStage("unrolling");
    setTimeout(() => { setStage("done"); onOpen(); }, 2000);
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, background:"linear-gradient(135deg,#1a0a00,#2d1600,#1a0a00)", display:"flex", alignItems:"center", justifyContent:"center", opacity: stage==="done" ? 0 : 1, pointerEvents: stage==="done" ? "none" : "all", transitionProperty: "opacity", transitionDuration: "0.6s", transitionTimingFunction: "ease", transitionDelay: "0.2s", overflow:"hidden" }}>

      {/* Background parchment texture */}
      <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"repeating-linear-gradient(0deg,#c9a84c 0,#c9a84c 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#c9a84c 0,#c9a84c 1px,transparent 1px,transparent 40px)" }} />

      {/* Floating dust motes */}
      {Array.from({length:12}).map((_,i) => (
        <div key={i} style={{ position:"absolute", left:`${10+i*7}%`, top:`${20+Math.sin(i)*30}%`, width:3, height:3, borderRadius:"50%", background:accentColor, opacity:0.3, animation:`twinkle ${2+i*0.3}s ease-in-out ${i*0.4}s infinite` }} />
      ))}

      <div onClick={open} style={{ position:"relative", cursor: stage==="idle" ? "pointer" : "default", display:"flex", flexDirection:"column", alignItems:"center" }}>

        {/* Top rod */}
        <div style={{ width:300, height:18, borderRadius:9, background:`linear-gradient(90deg,#5a3010,${accentColor},#8b5020,${accentColor},#5a3010)`, boxShadow:`0 4px 16px rgba(0,0,0,0.6), 0 0 20px ${accentColor}44`, position:"relative", zIndex:3, marginBottom:-2 }}>
          {[15,50,250,285].map(x => <div key={x} style={{ position:"absolute", top:"50%", left:x, transform:"translate(-50%,-50%)", width:16, height:16, borderRadius:"50%", background:`radial-gradient(circle at 40% 35%,#ffd700,#8b5020)`, boxShadow:`0 2px 6px rgba(0,0,0,0.5)` }} />)}
        </div>

        {/* Scroll body */}
        <div style={{
          width:300, overflow:"hidden",
          transformOrigin:"top",
          animation: stage === "unrolling" ? "scroll-unroll 1.6s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
          maxHeight: stage === "idle" ? 20 : undefined,
        }}>
          <div style={{ background:"linear-gradient(180deg,#f5e6c8,#faf0d8,#f5e6c8)", padding:"32px 28px", minHeight:280, textAlign:"center", position:"relative", boxShadow:"0 8px 32px rgba(0,0,0,0.4), inset 0 0 60px rgba(139,80,32,0.1)" }}>
            {/* Scroll edges */}
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:18, background:"linear-gradient(90deg,#d4a853,#f5e6c8)", opacity:0.6 }} />
            <div style={{ position:"absolute", right:0, top:0, bottom:0, width:18, background:"linear-gradient(270deg,#d4a853,#f5e6c8)", opacity:0.6 }} />
            {/* Horizontal rule lines */}
            {[80,120,160,200].map(t => <div key={t} style={{ position:"absolute", left:30, right:30, top:t, height:1, background:accentColor, opacity:0.15 }} />)}
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:9, letterSpacing:"0.5em", textTransform:"uppercase", color:"#7a5c2e", marginBottom:16 }}>A Wedding Proclamation</p>
            <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:48, color:"#3d2000", lineHeight:1.1, marginBottom:8, textShadow:`0 1px 0 rgba(255,255,255,0.5)` }}>{brideName || "Bride"}</p>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:"#7a5c2e", fontStyle:"italic", margin:"8px 0" }}>&amp;</p>
            <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:48, color:"#3d2000", lineHeight:1.1, textShadow:`0 1px 0 rgba(255,255,255,0.5)` }}>{groomName || "Groom"}</p>
            <div style={{ height:1, background:`linear-gradient(90deg,transparent,${accentColor},transparent)`, margin:"20px 24px 16px" }} />
            <p style={{ fontFamily:"'EB Garamond',serif", fontSize:13, color:"#5a3e28", fontStyle:"italic", lineHeight:1.8 }}>request the honour of your presence<br/>at their wedding celebration</p>
            <div style={{ marginTop:20, fontSize:20 }}>✦</div>
          </div>
        </div>

        {/* Bottom rod */}
        <div style={{ width:300, height:18, borderRadius:9, background:`linear-gradient(90deg,#5a3010,${accentColor},#8b5020,${accentColor},#5a3010)`, boxShadow:`0 4px 16px rgba(0,0,0,0.6), 0 0 20px ${accentColor}44`, marginTop:-2 }}>
          {[15,50,250,285].map(x => <div key={x} style={{ position:"absolute", top:"50%", left:x, transform:"translate(-50%,-50%)", width:16, height:16, borderRadius:"50%", background:`radial-gradient(circle at 40% 35%,#ffd700,#8b5020)`, boxShadow:`0 2px 6px rgba(0,0,0,0.5)` }} />)}
        </div>

        {stage === "idle" && (
          <div style={{ marginTop:32, textAlign:"center", animation:"fade-up 1s ease 0.5s both" }}>
            <div style={{ width:42, height:42, borderRadius:"50%", border:`1.5px solid ${accentColor}55`, margin:"0 auto 10px", display:"flex", alignItems:"center", justifyContent:"center", animation:"heart-pulse 1.8s ease-in-out infinite" }}>
              <span style={{ fontSize:18 }}>📜</span>
            </div>
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, letterSpacing:"0.4em", textTransform:"uppercase", color:`${accentColor}99` }}>Tap to unroll</p>
          </div>
        )}
      </div>
    </div>
  );
}
