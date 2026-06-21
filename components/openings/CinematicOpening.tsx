"use client";
import { useState, useEffect } from "react";

interface Props { brideName:string; groomName:string; accentColor:string; onOpen:()=>void; }

export default function CinematicOpening({ brideName, groomName, accentColor, onOpen }: Props) {
  const [stage, setStage] = useState<"bars"|"title"|"opening"|"done">("bars");
  const gold = accentColor;

  useEffect(() => {
    // Auto-sequence: bars slide in → title fades → content appears
    const t1 = setTimeout(() => setStage("title"), 800);
    const t2 = setTimeout(() => setStage("opening"), 3200);
    const t3 = setTimeout(() => { setStage("done"); onOpen(); }, 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, background:"#000", overflow:"hidden", opacity:stage==="done"?0:1, pointerEvents:stage==="done"?"none":"all", transitionProperty: "opacity", transitionDuration: "0.8s", transitionTimingFunction: "ease" }}>

      {/* Film grain texture */}
      <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize:"200px 200px" }} />

      {/* Main content */}
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>

        {/* Film sprocket holes */}
        {["top","bottom"].map(pos => (
          <div key={pos} style={{ position:"absolute", [pos]:0, left:0, right:0, height:48, background:"#111", display:"flex", alignItems:"center", paddingLeft:8, gap:12, zIndex:2 }}>
            {Array.from({length:24}).map((_,i) => (
              <div key={i} style={{ width:18, height:14, borderRadius:3, border:"2px solid #333", flexShrink:0 }} />
            ))}
          </div>
        ))}

        {/* Title card */}
        {(stage === "title" || stage === "opening") && (
          <div style={{ textAlign:"center", animation: stage==="opening" ? "fade-in 0.3s ease reverse" : "cinema-content 0.8s ease both" }}>
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, letterSpacing:"0.8em", textTransform:"uppercase", color:"#888", marginBottom:24 }}>A WEDDING FILM</p>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:64, fontStyle:"italic", color:"#fff", lineHeight:1.1, marginBottom:8, textShadow:`0 0 40px ${gold}44` }}>
              {brideName || "Bride"}
            </p>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:`${gold}88`, fontStyle:"italic" }}>&amp;</p>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:64, fontStyle:"italic", color:"#fff", lineHeight:1.1, textShadow:`0 0 40px ${gold}44` }}>
              {groomName || "Groom"}
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:16, margin:"24px auto 0", width:320 }}>
              <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,#555)" }} />
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:9, letterSpacing:"0.4em", color:"#555" }}>THEIR STORY</p>
              <div style={{ flex:1, height:1, background:"linear-gradient(90deg,#555,transparent)" }} />
            </div>
          </div>
        )}
      </div>

      {/* Cinematic top bar */}
      <div style={{
        position:"absolute", top:0, left:0, right:0,
        height:"13vh", background:"#000", zIndex:10,
        transform: stage==="opening"||stage==="done" ? "translateY(-100%)" : "translateY(0)",
        transitionProperty: "transform", transitionDuration: "1s", transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)",
      }} />

      {/* Cinematic bottom bar */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0,
        height:"13vh", background:"#000", zIndex:10,
        transform: stage==="opening"||stage==="done" ? "translateY(100%)" : "translateY(0)",
        transitionProperty: "transform", transitionDuration: "1s", transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)",
      }} />

      {/* Spotlight vignette */}
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)`, pointerEvents:"none", zIndex:1 }} />
    </div>
  );
}
