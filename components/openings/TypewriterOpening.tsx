"use client";
import { useState, useEffect } from "react";

interface Props { brideName:string; groomName:string; accentColor:string; onOpen:()=>void; }

export default function TypewriterOpening({ brideName, groomName, accentColor, onOpen }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing"|"pause"|"done">("typing");
  const gold = accentColor;

  const fullText = `Dear Beloved Guest,\n\nWith hearts full of joy,\nwe invite you to witness\nthe union of\n\n${brideName || "Bride"}\n&\n${groomName || "Groom"}\n\nPlease join us...`;

  useEffect(() => {
    let i = 0;
    const speed = 38;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayed(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setPhase("pause");
        setTimeout(() => { setPhase("done"); onOpen(); }, 1400);
      }
    }, speed);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, background:`linear-gradient(135deg,#0a0a0f,#111128)`, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", opacity:phase==="done"?0:1, pointerEvents:phase==="done"?"none":"all", transitionProperty: "opacity", transitionDuration: "0.8s", transitionTimingFunction: "ease" }}>

      {/* Paper texture overlay */}
      <div style={{ position:"absolute", inset:0, opacity:0.015, backgroundImage:"linear-gradient(#c9a84c 1px,transparent 1px)", backgroundSize:"28px 28px" }} />

      {/* Typewriter screen */}
      <div style={{ width:"min(520px,88vw)", background:"rgba(10,10,15,0.8)", border:`1px solid ${gold}22`, borderRadius:12, padding:"36px 40px", position:"relative", boxShadow:`0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px ${gold}11, inset 0 1px 0 rgba(255,255,255,0.05)` }}>

        {/* Corner ornaments */}
        {["top:12px;left:14px","top:12px;right:14px","bottom:12px;left:14px","bottom:12px;right:14px"].map((pos,i) => (
          <div key={i} style={{ position:"absolute", ...(Object.fromEntries(pos.split(";").map(p=>p.split(":")))) as React.CSSProperties, color:gold, fontSize:10, opacity:0.4 }}>✦</div>
        ))}

        {/* Text output */}
        <div style={{ fontFamily:"'Courier New',monospace", fontSize:15, lineHeight:1.9, color:"#e8d5a3", whiteSpace:"pre-line", minHeight:240 }}>
          {displayed.split("\n").map((line, i) => {
            const isBrideLine = line === (brideName || "Bride");
            const isGroomLine = line === (groomName || "Groom");
            const isAmpersand = line === "&";
            return (
              <div key={i} style={{
                fontFamily: (isBrideLine || isGroomLine) ? "'Great Vibes',cursive" : isAmpersand ? "'Cormorant Garamond',serif" : "'Courier New',monospace",
                fontSize: (isBrideLine || isGroomLine) ? 36 : isAmpersand ? 22 : 15,
                color: (isBrideLine || isGroomLine) ? gold : isAmpersand ? `${gold}88` : "#e8d5a3",
                textShadow: (isBrideLine || isGroomLine) ? `0 0 20px ${gold}66` : "none",
                textAlign: (isBrideLine || isGroomLine || isAmpersand) ? "center" : "left",
                lineHeight: (isBrideLine || isGroomLine) ? 1.2 : 1.9,
                marginTop: isBrideLine ? 4 : 0,
              }}>{line || " "}</div>
            );
          })}
          {/* Blinking cursor */}
          {phase === "typing" && (
            <span style={{ display:"inline-block", width:2, height:"1.1em", background:gold, marginLeft:1, verticalAlign:"text-bottom", animation:"blink-cursor 0.7s step-end infinite", borderRight:`2px solid ${gold}` }} />
          )}
        </div>
      </div>
    </div>
  );
}
