"use client";
import { useState } from "react";

interface Props { brideName:string; groomName:string; accentColor:string; onOpen:()=>void; }

export default function BookOpening({ brideName, groomName, accentColor, onOpen }: Props) {
  const [stage, setStage] = useState<"idle"|"opening"|"done">("idle");

  const open = () => {
    if (stage !== "idle") return;
    setStage("opening");
    setTimeout(() => { setStage("done"); onOpen(); }, 2000);
  };

  const gold = accentColor;
  const w = 240;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, background:`radial-gradient(ellipse at 50% 50%,#1a0a0a,#0a0005 80%)`, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", opacity:stage==="done"?0:1, pointerEvents:stage==="done"?"none":"all", transitionProperty: "opacity", transitionDuration: "0.6s", transitionTimingFunction: "ease", transitionDelay: "0.2s" }}>

      {/* Ambient glow */}
      <div style={{ position:"absolute", width:400, height:300, borderRadius:"50%", background:`radial-gradient(ellipse,${gold}18,transparent 70%)`, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />

      {/* Book container */}
      <div style={{ position:"relative", width:w*2+8, height:320, perspective:1000, cursor: stage==="idle"?"pointer":"default" }} onClick={open}>

        {/* Book spine */}
        <div style={{ position:"absolute", left:w, top:0, width:8, bottom:0, background:`linear-gradient(90deg,#2a1400,${gold}66,#2a1400)`, zIndex:5, boxShadow:`0 0 12px ${gold}44` }} />

        {/* ── Left page (opens left) ── */}
        <div style={{
          position:"absolute", left:0, top:0, width:w, height:320,
          transformOrigin:"right center", transformStyle:"preserve-3d",
          animation: stage==="opening" ? "book-left 1.6s cubic-bezier(0.4,0,0.2,1) forwards" : "none",
        }}>
          {/* Front face */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", background:"linear-gradient(135deg,#1a0832,#2d1250,#1a0832)", border:`1px solid ${gold}33`, borderRight:"none", borderRadius:"4px 0 0 4px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:20 }}>
            <div style={{ position:"absolute", inset:6, border:`1px solid ${gold}22`, borderRadius:2, pointerEvents:"none" }} />
            <div style={{ position:"absolute", inset:12, border:`0.5px solid ${gold}11`, borderRadius:1, pointerEvents:"none" }} />
            <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:36, color:gold, textAlign:"center", lineHeight:1.2 }}>{brideName || "Bride"}</p>
            <div style={{ width:60, height:1, background:gold, opacity:0.3, margin:"12px 0" }} />
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:8, letterSpacing:"0.4em", textTransform:"uppercase", color:`${gold}66` }}>Wedding</p>
          </div>
          {/* Back face */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", transform:"rotateY(180deg)", background:`linear-gradient(135deg,${gold}08,${gold}04)`, border:`1px solid ${gold}22` }} />
        </div>

        {/* ── Right page (opens right) ── */}
        <div style={{
          position:"absolute", right:0, top:0, width:w, height:320,
          transformOrigin:"left center", transformStyle:"preserve-3d",
          animation: stage==="opening" ? "book-right 1.6s cubic-bezier(0.4,0,0.2,1) forwards" : "none",
        }}>
          {/* Front face */}
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", background:"linear-gradient(225deg,#1a0832,#2d1250,#1a0832)", border:`1px solid ${gold}33`, borderLeft:"none", borderRadius:"0 4px 4px 0", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:20 }}>
            <div style={{ position:"absolute", inset:6, border:`1px solid ${gold}22`, borderRadius:2, pointerEvents:"none" }} />
            <div style={{ position:"absolute", inset:12, border:`0.5px solid ${gold}11`, borderRadius:1, pointerEvents:"none" }} />
            <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:36, color:gold, textAlign:"center", lineHeight:1.2 }}>{groomName || "Groom"}</p>
            <div style={{ width:60, height:1, background:gold, opacity:0.3, margin:"12px 0" }} />
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:8, letterSpacing:"0.4em", textTransform:"uppercase", color:`${gold}66` }}>Invitation</p>
          </div>
          <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", transform:"rotateY(-180deg)", background:`linear-gradient(225deg,${gold}08,${gold}04)`, border:`1px solid ${gold}22` }} />
        </div>

        {/* Tap hint */}
        {stage === "idle" && (
          <div style={{ position:"absolute", bottom:-56, left:"50%", transform:"translateX(-50%)", textAlign:"center", animation:"fade-up 1s ease 0.5s both", whiteSpace:"nowrap" }}>
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, letterSpacing:"0.4em", textTransform:"uppercase", color:`${gold}77` }}>📖 Tap to open</p>
          </div>
        )}
      </div>
    </div>
  );
}
