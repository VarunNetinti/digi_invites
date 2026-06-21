"use client";

/**
 * OpeningFormatPreview — non-interactive mini snapshot of each opening style,
 * clipped inside the phone frame (uses position:absolute, not fixed).
 * Shows as an overlay on top of the template preview at zIndex 25.
 */

interface Props {
  format: string;
  brideName: string;
  groomName: string;
  accentColor: string;
}

const gold = (ac: string) => ac || "#c9a84c";

export default function OpeningFormatPreview({ format, brideName, groomName, accentColor }: Props) {
  const g = gold(accentColor);
  const bride = brideName || "Bride";
  const groom = groomName || "Groom";

  /* ── shared styles ── */
  const bg: React.CSSProperties = { position: "absolute", inset: 0, zIndex: 25, overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" };
  const label: React.CSSProperties = { fontFamily: "'Lato',sans-serif", fontSize: 8, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 10 };
  const scriptName: React.CSSProperties = { fontFamily: "'Great Vibes',cursive", lineHeight: 1.1 };

  if (format === "letter") {
    return (
      <div style={{ ...bg, background: "radial-gradient(ellipse at 50% 40%,#2a0838,#0f0018 70%,#000)" }}>
        {/* Starfield */}
        {Array.from({length:16}).map((_,i)=><div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, width:1.5, height:1.5, borderRadius:"50%", background:"#fff", opacity:0.3+Math.random()*0.4, animation:`twinkle ${1.5+Math.random()*2}s ease-in-out ${Math.random()*3}s infinite` }}/>)}
        {/* Letter pouch — matches WeddingEnvelope.tsx design */}
        <div style={{ position:"relative", width:120, height:84, borderRadius:10,
          background:"linear-gradient(160deg,#f5e8c4 0%,#e8d08c 40%,#c9a840 70%,#b8922e 100%)",
          boxShadow:`0 10px 28px rgba(0,0,0,0.6), 0 0 0 1px ${g}66, inset 0 1px 0 rgba(255,255,255,0.5)` }}>
          {/* Top rim */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:9, borderRadius:"10px 10px 0 0",
            background:"linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,248,220,0.15))",
            borderBottom:`1px solid ${g}66` }}/>
          {/* Side seams */}
          <div style={{ position:"absolute", left:7, top:9, bottom:7, width:1, background:"rgba(0,0,0,0.12)" }}/>
          <div style={{ position:"absolute", right:7, top:9, bottom:7, width:1, background:"rgba(0,0,0,0.12)" }}/>
          {/* Ribbon + seal across mouth */}
          <div style={{ position:"absolute", top:5, left:"10%", right:"10%", height:5, borderRadius:3,
            background:`linear-gradient(90deg,transparent,${g},${g}cc,${g},transparent)`,
            boxShadow:`0 0 8px ${g}88` }}/>
          <div style={{ position:"absolute", top:"22%", left:"50%", transform:"translateX(-50%)",
            width:16, height:16, borderRadius:"50%",
            background:"radial-gradient(circle at 35% 32%,#e63946,#9d0208)",
            boxShadow:"0 2px 6px rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:3 }}>
            <span style={{ fontFamily:"'Great Vibes',cursive", fontSize:7, color:"#fff" }}>{bride[0]}</span>
          </div>
          {/* Letter peek — small dark sliver visible at the mouth */}
          <div style={{ position:"absolute", top:9, left:"14%", right:"14%", height:10,
            background:"linear-gradient(160deg,#1a0f35,#0a0520)", borderRadius:"3px 3px 0 0",
            boxShadow:`0 0 0 1px ${g}33` }}/>
        </div>
        <p style={{ ...label, color:`${g}77`, marginTop:14 }}>Letter Pouch</p>
      </div>
    );
  }

  if (format === "scroll") {
    return (
      <div style={{ ...bg, background:"linear-gradient(135deg,#1a0a00,#2d1600)" }}>
        <div style={{ width:130, background:"linear-gradient(180deg,#f5e6c8,#faf0d8)", padding:"16px 14px", textAlign:"center", position:"relative", boxShadow:"0 6px 20px rgba(0,0,0,0.5)" }}>
          <div style={{ position:"absolute", top:-6, left:0, right:0, height:12, borderRadius:"50%", background:"linear-gradient(90deg,#5a3010,#c9a84c,#5a3010)", boxShadow:"0 2px 8px rgba(0,0,0,0.5)" }} />
          <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:22, color:"#3d2000", lineHeight:1.1 }}>{bride}</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:"#7a5c2e", fontStyle:"italic" }}>&amp;</p>
          <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:22, color:"#3d2000", lineHeight:1.1 }}>{groom}</p>
          <div style={{ height:1, background:g, opacity:0.2, margin:"8px 0 6px" }} />
          <p style={{ fontFamily:"'EB Garamond',serif", fontSize:8, color:"#5a3e28", fontStyle:"italic" }}>Wedding Invitation</p>
          <div style={{ position:"absolute", bottom:-6, left:0, right:0, height:12, borderRadius:"50%", background:"linear-gradient(90deg,#5a3010,#c9a84c,#5a3010)", boxShadow:"0 -2px 8px rgba(0,0,0,0.5)" }} />
        </div>
        <p style={{ ...label, color:`${g}77`, marginTop:20 }}>Royal Scroll</p>
      </div>
    );
  }

  if (format === "curtain") {
    return (
      <div style={{ ...bg, background:"radial-gradient(ellipse at 50% 40%,#1a0832,#0f0520 70%,#000)" }}>
        {/* Left curtain */}
        <div style={{ position:"absolute", top:0, left:0, bottom:0, width:"42%", background:"linear-gradient(90deg,#1a0a2e,#2d1444)", borderRight:`1px solid ${g}33`, boxShadow:"4px 0 20px rgba(0,0,0,0.6)" }}>
          {[0.2,0.5,0.8].map((x,i)=><div key={i} style={{ position:"absolute", top:0, bottom:0, left:`${x*100}%`, width:1.5, background:`linear-gradient(180deg,transparent,${g}33,transparent)`, opacity:0.5 }} />)}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:8, background:`linear-gradient(90deg,#5a3010,${g})` }} />
          {[20,50,80].map(x=><div key={x} style={{ position:"absolute", top:6, left:`${x}%`, width:6, height:6, borderRadius:"50%", background:g, boxShadow:`0 0 4px ${g}` }} />)}
        </div>
        {/* Right curtain */}
        <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"42%", background:"linear-gradient(270deg,#1a0a2e,#2d1444)", borderLeft:`1px solid ${g}33`, boxShadow:"-4px 0 20px rgba(0,0,0,0.6)" }}>
          {[0.2,0.5,0.8].map((x,i)=><div key={i} style={{ position:"absolute", top:0, bottom:0, left:`${x*100}%`, width:1.5, background:`linear-gradient(180deg,transparent,${g}33,transparent)`, opacity:0.5 }} />)}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:8, background:`linear-gradient(90deg,${g},#5a3010)` }} />
          {[20,50,80].map(x=><div key={x} style={{ position:"absolute", top:6, left:`${x}%`, width:6, height:6, borderRadius:"50%", background:g, boxShadow:`0 0 4px ${g}` }} />)}
        </div>
        {/* Center */}
        <div style={{ textAlign:"center", position:"relative", zIndex:1 }}>
          <p style={{ fontFamily:"'Lato',sans-serif", fontSize:7, letterSpacing:"0.5em", textTransform:"uppercase", color:`${g}55`, marginBottom:8 }}>Now Presenting</p>
          <p style={{ ...scriptName, fontSize:24, color:g, textShadow:`0 0 20px ${g}66` }}>{bride}</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:`${g}88`, fontStyle:"italic" }}>&amp;</p>
          <p style={{ ...scriptName, fontSize:24, color:g, textShadow:`0 0 20px ${g}66` }}>{groom}</p>
        </div>
        <p style={{ ...label, color:`${g}77`, position:"absolute", bottom:16 }}>Stage Curtains</p>
      </div>
    );
  }

  if (format === "book") {
    return (
      <div style={{ ...bg, background:"radial-gradient(ellipse at 50% 50%,#1a0a0a,#0a0005)" }}>
        <div style={{ display:"flex", gap:3, perspective:600 }}>
          {["left","right"].map((side,idx)=>(
            <div key={side} style={{ width:88, height:120, background:`linear-gradient(${idx===0?"135deg":"225deg"},#1a0832,#2d1250)`, border:`1px solid ${g}33`, borderRadius:idx===0?"3px 0 0 3px":"0 3px 3px 0", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:10, position:"relative", boxShadow: idx===0 ? "4px 0 12px rgba(0,0,0,0.4)" : "-4px 0 12px rgba(0,0,0,0.4)" }}>
              <div style={{ position:"absolute", inset:4, border:`0.5px solid ${g}18`, borderRadius:1 }} />
              <p style={{ ...scriptName, fontSize:18, color:g, textAlign:"center", lineHeight:1.1 }}>{idx===0?bride:groom}</p>
              <div style={{ width:32, height:0.5, background:g, opacity:0.3, margin:"6px 0" }} />
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:6, letterSpacing:"0.3em", color:`${g}55`, textTransform:"uppercase" }}>{idx===0?"Bride":"Groom"}</p>
            </div>
          ))}
          {/* Spine */}
          <div style={{ position:"absolute", left:"50%", top:0, transform:"translateX(-50%)", width:6, height:120, background:`linear-gradient(90deg,#2a1400,${g}66,#2a1400)`, zIndex:2 }} />
        </div>
        <p style={{ ...label, color:`${g}77`, marginTop:20 }}>Storybook</p>
      </div>
    );
  }

  if (format === "gate") {
    return (
      <div style={{ ...bg, background:"radial-gradient(ellipse at 50% 50%,#1a0832,#0a0a14 70%,#000)" }}>
        {/* Left gate */}
        <div style={{ position:"absolute", top:0, left:0, bottom:0, width:"45%", background:"linear-gradient(90deg,#0a0a0f,#111128)", borderRight:`1px solid ${g}22`, overflow:"hidden" }}>
          {Array.from({length:5}).map((_,i)=>(
            <div key={i} style={{ position:"absolute", top:0, bottom:0, left:`${12+i*16}%`, width:2.5, background:`linear-gradient(180deg,${g}66,${g}22,${g}66)`, opacity:0.4 }}>
              {[25,50,75].map(y=><div key={y} style={{ position:"absolute", top:`${y}%`, left:-3, width:8, height:8, borderRadius:"50%", background:`radial-gradient(circle at 35% 30%,${g},#5a3010)` }} />)}
            </div>
          ))}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,transparent,${g},transparent)` }} />
        </div>
        {/* Right gate */}
        <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"45%", background:"linear-gradient(270deg,#0a0a0f,#111128)", borderLeft:`1px solid ${g}22`, overflow:"hidden" }}>
          {Array.from({length:5}).map((_,i)=>(
            <div key={i} style={{ position:"absolute", top:0, bottom:0, left:`${12+i*16}%`, width:2.5, background:`linear-gradient(180deg,${g}66,${g}22,${g}66)`, opacity:0.4 }}>
              {[25,50,75].map(y=><div key={y} style={{ position:"absolute", top:`${y}%`, left:-3, width:8, height:8, borderRadius:"50%", background:`radial-gradient(circle at 35% 30%,${g},#5a3010)` }} />)}
            </div>
          ))}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,transparent,${g},transparent)` }} />
        </div>
        {/* Center names */}
        <div style={{ textAlign:"center", zIndex:1 }}>
          <p style={{ ...scriptName, fontSize:22, color:g, textShadow:`0 0 16px ${g}66` }}>{bride}</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:`${g}77`, fontStyle:"italic" }}>&amp;</p>
          <p style={{ ...scriptName, fontSize:22, color:g, textShadow:`0 0 16px ${g}66` }}>{groom}</p>
          {/* Key icon */}
          <div style={{ width:24, height:24, borderRadius:"50%", background:`radial-gradient(circle at 35% 30%,${g},#5a3010)`, margin:"8px auto 0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11 }}>🔑</div>
        </div>
        <p style={{ ...label, color:`${g}77`, position:"absolute", bottom:14 }}>Grand Gates</p>
      </div>
    );
  }

  if (format === "cinematic") {
    return (
      <div style={{ ...bg, background:"#000" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"14%", background:"#111", borderBottom:"1px solid #222" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"14%", background:"#111", borderTop:"1px solid #222" }} />
        <div style={{ textAlign:"center", zIndex:1 }}>
          <p style={{ fontFamily:"'Lato',sans-serif", fontSize:7, letterSpacing:"0.6em", textTransform:"uppercase", color:"#555", marginBottom:10 }}>A WEDDING FILM</p>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontStyle:"italic", color:"#fff", lineHeight:1.1, textShadow:`0 0 20px ${g}44` }}>{bride}</p>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:12, color:`${g}77`, fontStyle:"italic" }}>&amp;</p>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontStyle:"italic", color:"#fff", lineHeight:1.1, textShadow:`0 0 20px ${g}44` }}>{groom}</p>
        </div>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 50%,transparent 30%,rgba(0,0,0,0.6) 100%)", pointerEvents:"none" }} />
        <p style={{ ...label, color:"#555", position:"absolute", bottom:20 }}>Cinematic Film</p>
      </div>
    );
  }

  if (format === "typewriter") {
    const preview = `Dear Guest,\n\n${bride}\n&\n${groom}`;
    return (
      <div style={{ ...bg, background:"linear-gradient(135deg,#0a0a0f,#111128)" }}>
        <div style={{ width:"80%", background:"rgba(10,10,15,0.9)", border:`1px solid ${g}22`, borderRadius:8, padding:"14px 16px", position:"relative" }}>
          {["top:8px;left:10px","top:8px;right:10px","bottom:8px;left:10px","bottom:8px;right:10px"].map((p,i)=>(
            <div key={i} style={{ position:"absolute", ...(Object.fromEntries(p.split(";").map(s=>s.split(":")))) as React.CSSProperties, fontSize:7, color:g, opacity:0.4 }}>✦</div>
          ))}
          {preview.split("\n").map((line,i)=>(
            <div key={i} style={{
              fontFamily: (line===bride||line===groom) ? "'Great Vibes',cursive" : line==="&" ? "'Cormorant Garamond',serif" : "'Courier New',monospace",
              fontSize: (line===bride||line===groom) ? 20 : line==="&" ? 12 : 9,
              color: (line===bride||line===groom) ? g : line==="&" ? `${g}88` : "#e8d5a3",
              textAlign: (line===bride||line===groom||line==="&") ? "center" : "left",
              lineHeight: (line===bride||line===groom) ? 1.2 : 1.7,
            }}>{line||" "}</div>
          ))}
          <span style={{ display:"inline-block", width:1.5, height:"0.9em", background:g, animation:"blink-cursor 0.7s step-end infinite" }} />
        </div>
        <p style={{ ...label, color:`${g}77`, marginTop:16 }}>Typewriter Letter</p>
      </div>
    );
  }

  if (format === "zoom-reveal") {
    return (
      <div style={{ ...bg, background:"radial-gradient(ellipse at 50% 50%,#0a0a2e,#030318 50%,#000)" }}>
        {Array.from({length:20}).map((_,i)=><div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, width:1.5, height:1.5, borderRadius:"50%", background:"#fff", opacity:0.1+Math.random()*0.5, animation:`twinkle ${1+Math.random()*2}s ease-in-out ${Math.random()*4}s infinite` }}/>)}
        {[120,180,240].map((r,i)=>(
          <div key={i} style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:r, height:r, borderRadius:"50%", border:`0.5px solid ${g}${["33","22","11"][i]}`, animation:`mandala-spin ${12+i*4}s linear ${i*2}s infinite` }}>
            <div style={{ position:"absolute", top:-3, left:"50%", transform:"translateX(-50%)", width:6, height:6, borderRadius:"50%", background:g, boxShadow:`0 0 6px ${g}`, opacity:0.7 }} />
          </div>
        ))}
        <div style={{ textAlign:"center", zIndex:1, position:"relative" }}>
          <p style={{ ...scriptName, fontSize:26, color:g, textShadow:`0 0 30px ${g}88`, animation:"glow-pulse 2s ease-in-out infinite" }}>{bride}</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:`${g}77`, fontStyle:"italic" }}>&amp;</p>
          <p style={{ ...scriptName, fontSize:26, color:g, textShadow:`0 0 30px ${g}88`, animation:"glow-pulse 2s ease-in-out 0.5s infinite" }}>{groom}</p>
        </div>
        <p style={{ ...label, color:`${g}77`, position:"absolute", bottom:16 }}>Space Zoom</p>
      </div>
    );
  }

  if (format === "rise-up") {
    return (
      <div style={{ ...bg, background:"linear-gradient(180deg,#000 0%,#0a0518 40%,#1a0832 100%)" }}>
        {Array.from({length:12}).map((_,i)=><div key={i} style={{ position:"absolute", left:`${Math.random()*100}%`, top:`${Math.random()*80}%`, width:2, height:2, borderRadius:"50%", background:g, opacity:0.15+Math.random()*0.25, animation:`twinkle ${2+i*0.3}s ease-in-out ${i*0.4}s infinite` }}/>)}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:`linear-gradient(180deg,transparent,${g}06,${g}12)`, borderTop:`1.5px solid ${g}44`, padding:"24px 16px 32px", textAlign:"center" }}>
          <div style={{ position:"absolute", top:0, left:"25%", right:"25%", height:1.5, background:`linear-gradient(90deg,transparent,${g},transparent)` }} />
          <p style={{ ...scriptName, fontSize:26, color:g, textShadow:`0 0 20px ${g}66`, animation:"glow-pulse 2.5s ease-in-out infinite" }}>{bride}</p>
          <div style={{ display:"flex", alignItems:"center", gap:8, margin:"4px 0" }}>
            <div style={{ flex:1, height:0.5, background:`linear-gradient(90deg,transparent,${g})`, opacity:0.4 }} />
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:`${g}88`, fontStyle:"italic" }}>&amp;</span>
            <div style={{ flex:1, height:0.5, background:`linear-gradient(90deg,${g},transparent)`, opacity:0.4 }} />
          </div>
          <p style={{ ...scriptName, fontSize:26, color:g, textShadow:`0 0 20px ${g}66`, animation:"glow-pulse 2.5s ease-in-out 0.4s infinite" }}>{groom}</p>
        </div>
        <p style={{ ...label, color:`${g}55`, position:"absolute", top:20 }}>Rise from Below</p>
      </div>
    );
  }

  return null;
}
