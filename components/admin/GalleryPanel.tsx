"use client";
import { useState } from "react";
import type { GalleryStyle, Fillet } from "@/components/PhotoGallery";

interface SectionGallery {
  style: GalleryStyle;
  fillet: Fillet;
}
interface GalleryPanelProps {
  selected: GalleryStyle;
  onSelect: (s: GalleryStyle) => void;

  selectedFillet?: Fillet;
  onSelectFillet?: (f: Fillet) => void;

  hero?: SectionGallery;
  onHero?: (v: SectionGallery) => void;

  story?: SectionGallery;
  onStory?: (v: SectionGallery) => void;

  brideFamily?: SectionGallery;
  onBrideFamily?(v: SectionGallery): void;

  groomFamily?: SectionGallery;
  onGroomFamily?(v: SectionGallery): void;

  accentColor?: string;

  // ADD THIS
  sampleImages?: string[];
}
// ─── All 16 styles ────────────────────────────────────────────────────────
const STYLES: { id: GalleryStyle; label: string; emoji: string; desc: string; tag?: string }[] = [
  // Slideshow group
  { id:"slideshow",       label:"Crossfade",    emoji:"🎞",  desc:"Classic fade",           tag:"Slideshow" },
  { id:"slideshow-slide", label:"Slide",        emoji:"▶",   desc:"Slide left/right",       tag:"Slideshow" },
  { id:"slideshow-zoom",  label:"Ken Burns",    emoji:"🔍", desc:"Cinematic zoom",          tag:"Slideshow" },
  // Collage group
  { id:"collage-2",       label:"Duo",          emoji:"⬛⬛", desc:"Side by side",           tag:"Collage" },
  { id:"collage-3",       label:"Trio",         emoji:"🖼",  desc:"Hero + 2 accent",        tag:"Collage" },
  { id:"collage-4",       label:"Grid 2×2",     emoji:"⊞",  desc:"Four photo grid",        tag:"Collage" },
  // Creative layout group
  { id:"polaroid",        label:"Polaroid",     emoji:"📷", desc:"Stacked with rotation",  tag:"Creative" },
  { id:"filmstrip",       label:"Filmstrip",    emoji:"🎬", desc:"Main + thumbnail strip", tag:"Creative" },
  { id:"masonry",         label:"Masonry",      emoji:"🧱", desc:"Uneven 3-col grid",      tag:"Creative" },
  { id:"magazine",        label:"Magazine",     emoji:"📰", desc:"Editorial hero strip",   tag:"Creative" },
  // Organic / artistic group
  { id:"amoeba",          label:"Amoeba",       emoji:"🫧",  desc:"Morphing blob shapes",  tag:"Artistic" },
  { id:"hexagon",         label:"Hexagon",      emoji:"⬡",  desc:"Hex clip-path grid",    tag:"Artistic" },
  { id:"diamond",         label:"Diamond",      emoji:"💎", desc:"Rotated diamond grid",   tag:"Artistic" },
  { id:"circle-burst",    label:"Circle Burst", emoji:"🎯", desc:"Centre + orbiting ring", tag:"Artistic" },
  { id:"arch",            label:"Arch",         emoji:"🏛",  desc:"Portrait arch frame",   tag:"Artistic" },
  { id:"petal",           label:"Petal",        emoji:"🌸", desc:"Flower petal layout",    tag:"Artistic" },
];

// ─── SVG mini-previews ────────────────────────────────────────────────────
function Preview({ id, active, gold }: { id: GalleryStyle; active: boolean; gold: string }) {
  const bg  = active ? `rgba(201,168,76,0.14)` : "rgba(255,255,255,0.035)";
  const str = active ? `rgba(201,168,76,0.35)` : "rgba(255,255,255,0.09)";
  const acc = active ? gold : "rgba(255,255,255,0.22)";

  const map: Record<GalleryStyle, React.ReactNode> = {
    "slideshow": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        <rect x="4" y="4" width="72" height="42" rx="3" fill={bg} stroke={str} strokeWidth="1"/>
        <rect x="4" y="48" width="72" height="4" rx="2" fill="rgba(255,255,255,0.03)"/>
        <circle cx="26" cy="52" r="2.5" fill={gold} opacity="0.8"/>
        <circle cx="34" cy="52" r="1.8" fill={acc}/>
        <circle cx="41" cy="52" r="1.8" fill={acc}/>
        <text x="40" y="28" textAnchor="middle" fill={acc} fontSize="7" fontFamily="sans-serif">↔ fade</text>
      </svg>
    ),
    "slideshow-slide": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        <rect x="3" y="4" width="44" height="48" rx="3" fill={bg} stroke={str} strokeWidth="1"/>
        <rect x="51" y="8" width="26" height="40" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        <text x="26" y="30" textAnchor="middle" fill={acc} fontSize="14">→</text>
        <text x="64" y="32" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="10">›</text>
      </svg>
    ),
    "slideshow-zoom": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        <rect x="4" y="4" width="72" height="48" rx="3" fill={bg} stroke={str} strokeWidth="1"/>
        <circle cx="56" cy="24" r="9" fill="none" stroke={acc} strokeWidth="1" strokeDasharray="2,2"/>
        <circle cx="56" cy="24" r="5" fill={acc} opacity="0.2"/>
        <line x1="63" y1="31" x2="70" y2="38" stroke={acc} strokeWidth="1.5"/>
        <text x="20" y="46" fill={acc} fontSize="6" fontFamily="monospace">zoom ↗</text>
      </svg>
    ),
    "polaroid": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        {[{x:8,y:14,r:-8,o:.3},{x:18,y:8,r:5,o:.6},{x:26,y:4,r:-2,o:1}].map((p,i)=>(
          <g key={i} opacity={p.o}>
            <rect x={p.x} y={p.y} width="36" height="42" rx="1" fill="#eeeeee" transform={`rotate(${p.r},${p.x+18},${p.y+21})`}/>
            <rect x={p.x+3} y={p.y+3} width="30" height="28" rx="1" fill={i===2?bg:"rgba(120,130,160,0.25)"} transform={`rotate(${p.r},${p.x+18},${p.y+21})`}/>
          </g>
        ))}
      </svg>
    ),
    "collage-2": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        <rect x="3"  y="4" width="35" height="48" rx="3" fill={bg} stroke={str} strokeWidth="1"/>
        <rect x="42" y="4" width="35" height="48" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      </svg>
    ),
    "collage-3": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        <rect x="3"  y="4" width="44" height="48" rx="3" fill={bg} stroke={str} strokeWidth="1"/>
        <rect x="51" y="4" width="26" height="22" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <rect x="51" y="30" width="26" height="22" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      </svg>
    ),
    "collage-4": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        {[[3,4],[42,4],[3,32],[42,32]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="34" height="20" rx="3"
            fill={i===0?bg:"rgba(255,255,255,0.03)"} stroke={i===0?str:"rgba(255,255,255,0.07)"} strokeWidth="1"/>
        ))}
      </svg>
    ),
    "filmstrip": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        <rect x="3" y="3" width="74" height="34" rx="3" fill={bg} stroke={str} strokeWidth="1"/>
        {[3,21,39,57].map((x,i)=>(
          <rect key={i} x={x} y="41" width="16" height="12" rx="2"
            fill={i===0?bg:"rgba(255,255,255,0.03)"} stroke={i===0?str:"rgba(255,255,255,0.07)"} strokeWidth="1"/>
        ))}
      </svg>
    ),
    "masonry": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        <rect x="3"  y="3"  width="22" height="28" rx="3" fill={bg} stroke={str} strokeWidth="1"/>
        <rect x="3"  y="35" width="22" height="18" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <rect x="29" y="3"  width="22" height="18" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <rect x="29" y="25" width="22" height="28" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        <rect x="55" y="3"  width="22" height="24" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <rect x="55" y="31" width="22" height="22" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      </svg>
    ),
    "magazine": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        <rect x="3" y="3" width="74" height="36" rx="3" fill={bg} stroke={str} strokeWidth="1"/>
        <rect x="5" y="35" width="18" height="2" rx="1" fill={gold} opacity="0.6"/>
        {[3,19,35,51,67].map((x,i)=>(
          <rect key={i} x={x} y="43" width="11" height="10" rx="2"
            fill={i===0?bg:"rgba(255,255,255,0.03)"} stroke={i===0?str:"rgba(255,255,255,0.07)"} strokeWidth="1"/>
        ))}
      </svg>
    ),
    "amoeba": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        <path d="M20,28 C22,10 42,6 54,14 C66,22 72,38 62,48 C52,58 28,54 18,44 C8,34 18,46 20,28Z"
          fill={bg} stroke={str} strokeWidth="1"/>
        <path d="M44,28 C46,16 58,14 64,22 C70,30 66,42 58,46 C50,50 38,44 36,36 C34,28 42,40 44,28Z"
          fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.2)" strokeWidth="1"/>
        <text x="32" y="32" textAnchor="middle" fill={acc} fontSize="7" fontFamily="sans-serif">blob</text>
      </svg>
    ),
    "hexagon": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        {[
          {cx:22,cy:16,r:12},
          {cx:46,cy:16,r:11},
          {cx:12,cy:38,r:10},
          {cx:36,cy:40,r:12},
          {cx:60,cy:30,r:10},
        ].map((h,i)=>(
          <polygon key={i}
            points={`${h.cx},${h.cy-h.r} ${h.cx+h.r*.87},${h.cy-h.r*.5} ${h.cx+h.r*.87},${h.cy+h.r*.5} ${h.cx},${h.cy+h.r} ${h.cx-h.r*.87},${h.cy+h.r*.5} ${h.cx-h.r*.87},${h.cy-h.r*.5}`}
            fill={i===0?bg:"rgba(255,255,255,0.04)"} stroke={i===0?str:"rgba(255,255,255,0.08)"} strokeWidth="1"/>
        ))}
      </svg>
    ),
    "diamond": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        {[{cx:24,cy:16,s:14},{cx:56,cy:16,s:13},{cx:16,cy:40,s:12},{cx:44,cy:40,s:14}].map((d,i)=>(
          <polygon key={i}
            points={`${d.cx},${d.cy-d.s} ${d.cx+d.s},${d.cy} ${d.cx},${d.cy+d.s} ${d.cx-d.s},${d.cy}`}
            fill={i===0?bg:"rgba(255,255,255,0.04)"} stroke={i===0?str:"rgba(255,255,255,0.08)"} strokeWidth="1"/>
        ))}
      </svg>
    ),
    "circle-burst": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        <circle cx="40" cy="28" r="14" fill={bg} stroke={str} strokeWidth="1"/>
        {[0,72,144,216,288].map((a,i)=>{
          const rad = a*Math.PI/180;
          const cx = 40+26*Math.cos(rad), cy = 28+22*Math.sin(rad);
          return <g key={i}>
            <line x1="40" y1="28" x2={cx} y2={cy} stroke={`${gold}25`} strokeWidth="1" strokeDasharray="2,3"/>
            <circle cx={cx} cy={cy} r="7" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          </g>;
        })}
      </svg>
    ),
    "arch": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        <path d="M8,52 L8,22 Q8,4 26,4 Q44,4 44,22 L44,52Z" fill={bg} stroke={str} strokeWidth="1"/>
        <rect x="48" y="4"  width="28" height="22" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <rect x="48" y="30" width="28" height="22" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      </svg>
    ),
    "petal": (
      <svg viewBox="0 0 80 56" style={{width:"100%",height:"100%"}}>
        {[0,72,144,216,288].map((a,i)=>{
          const rad=a*Math.PI/180;
          const cx=40+18*Math.cos(rad-Math.PI/2), cy=28+16*Math.sin(rad-Math.PI/2);
          return <ellipse key={i} cx={cx} cy={cy} rx="9" ry="6"
            fill={i===0?bg:"rgba(255,255,255,0.04)"} stroke={i===0?str:"rgba(255,255,255,0.08)"} strokeWidth="1"
            transform={`rotate(${a},${cx},${cy})`}/>;
        })}
        <circle cx="40" cy="28" r="8" fill={`rgba(201,168,76,0.2)`} stroke={`rgba(201,168,76,0.4)`} strokeWidth="1"/>
      </svg>
    ),
  };
  return <>{map[id]}</>;
}

// ─── Fillet picker ────────────────────────────────────────────────────────
const FILLETS: { id: Fillet; label: string; radius: string }[] = [
  { id:"none",    label:"Sharp",   radius:"1px"  },
  { id:"soft",    label:"Soft",    radius:"6px"  },
  { id:"rounded", label:"Rounded", radius:"14px" },
  { id:"pill",    label:"Pill",    radius:"28px" },
  { id:"circle",  label:"Circle",  radius:"50%"  },
];

function FilletPicker({ value, onChange, gold }: { value: Fillet; onChange:(f:Fillet)=>void; gold:string }) {
  return (
    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:12 }}>
      {FILLETS.map(f => {
        const active = value === f.id;
        return (
          <button key={f.id} type="button" onClick={()=>onChange(f.id)}
            style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:"8px 10px",borderRadius:8,
              background:active?"rgba(201,168,76,0.09)":"rgba(255,255,255,0.02)",
              border:`1px solid ${active?gold:"rgba(255,255,255,0.07)"}`,cursor:"pointer",
              transitionProperty:"border-color,background",transitionDuration:"0.15s",transitionTimingFunction:"ease" }}>
            <div style={{ width:28,height:28,background:active?`rgba(201,168,76,0.18)`:"rgba(255,255,255,0.05)",
              border:`1.5px solid ${active?gold:"rgba(255,255,255,0.12)"}`,borderRadius:f.radius }} />
            <span style={{ fontSize:9,color:active?gold:"#666",whiteSpace:"nowrap",fontFamily:"'Montserrat',sans-serif" }}>{f.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Style grid ───────────────────────────────────────────────────────────
const TAGS = ["All","Slideshow","Collage","Creative","Artistic"];

function StyleGrid({ value, onChange, gold }: { value:GalleryStyle; onChange:(s:GalleryStyle)=>void; gold:string }) {
  const [tag, setTag] = useState("All");
  const visible = tag === "All" ? STYLES : STYLES.filter(s => s.tag === tag);
  return (
    <div>
      {/* Tag filter */}
      <div style={{ display:"flex",gap:5,marginBottom:10,flexWrap:"wrap" }}>
        {TAGS.map(t=>(
          <button key={t} type="button" onClick={()=>setTag(t)}
            style={{ padding:"4px 10px",borderRadius:20,fontSize:9,letterSpacing:"0.1em",
              background:tag===t?`rgba(201,168,76,0.12)`:"rgba(255,255,255,0.03)",
              border:`1px solid ${tag===t?gold:"rgba(255,255,255,0.07)"}`,
              color:tag===t?gold:"#666",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",
              transitionProperty:"border-color,background,color",transitionDuration:"0.15s",transitionTimingFunction:"ease" }}>
            {t}
          </button>
        ))}
      </div>
      {/* Grid */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:7 }}>
        {visible.map(s=>{
          const active = value === s.id;
          return (
            <button key={s.id} type="button" onClick={()=>onChange(s.id)}
              style={{ background:active?"rgba(201,168,76,0.07)":"rgba(255,255,255,0.02)",
                border:`1px solid ${active?gold:"rgba(255,255,255,0.07)"}`,
                borderRadius:10,padding:0,cursor:"pointer",textAlign:"left",overflow:"hidden",
                transitionProperty:"border-color,background",transitionDuration:"0.15s",transitionTimingFunction:"ease" }}>
              <div style={{ width:"100%",height:62,background:"#080812",padding:5,position:"relative" }}>
                <Preview id={s.id} active={active} gold={gold}/>
                {active && <div style={{ position:"absolute",top:4,right:4,width:14,height:14,borderRadius:"50%",
                  background:gold,display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <span style={{ color:"#000",fontSize:8,fontWeight:900,lineHeight:1 }}>✓</span>
                </div>}
              </div>
              <div style={{ padding:"6px 8px" }}>
                <div style={{ display:"flex",alignItems:"center",gap:4,marginBottom:1 }}>
                  <span style={{ fontSize:11 }}>{s.emoji}</span>
                  <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:10,
                    color:active?gold:"#ccc",fontWeight:active?700:400 }}>{s.label}</span>
                </div>
                <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:8,color:"#555",margin:0 }}>{s.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section config row ───────────────────────────────────────────────────
function SectionGalleryConfig({
  emoji, title, value, onChange, gold,
}: {
  emoji: string; title: string;
  value: SectionGallery; onChange:(v:SectionGallery)=>void; gold:string;
}) {
  const [open, setOpen] = useState(false);
  const curr = STYLES.find(s=>s.id===value.style);
  return (
    <div style={{ marginBottom:8 }}>
      <button type="button" onClick={()=>setOpen(o=>!o)}
        style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"10px 14px",borderRadius:10,background:"rgba(255,255,255,0.03)",
          border:"1px solid rgba(255,255,255,0.07)",cursor:"pointer",fontFamily:"'Montserrat',sans-serif" }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <span style={{ fontSize:16 }}>{emoji}</span>
          <div>
            <p style={{ color:"#ccc",fontSize:11,margin:0,fontWeight:500 }}>{title}</p>
            <p style={{ color:"#555",fontSize:9,margin:0 }}>{curr?.emoji} {curr?.label} · {value.fillet}</p>
          </div>
        </div>
        <span style={{ color:"#555",fontSize:12,transitionProperty:"transform",transitionDuration:"0.2s",transitionTimingFunction:"ease",
          transform:open?"rotate(180deg)":"none" }}>▾</span>
      </button>
      {open && (
        <div style={{ padding:"14px",background:"rgba(0,0,0,0.2)",borderRadius:"0 0 10px 10px",
          border:"1px solid rgba(255,255,255,0.05)",borderTop:"none",marginTop:-1 }}>
          <StyleGrid value={value.style} onChange={style=>onChange({...value,style})} gold={gold}/>
          <p style={{ fontFamily:"'Montserrat',sans-serif",fontSize:9,letterSpacing:"0.25em",
            textTransform:"uppercase",color:"#555",margin:"12px 0 0" }}>Corner Style</p>
          <FilletPicker value={value.fillet} onChange={fillet=>onChange({...value,fillet})} gold={gold}/>
        </div>
      )}
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────
export default function GalleryPanel({
  selected, onSelect,
  selectedFillet = "soft", onSelectFillet,
  hero, onHero, story, onStory,
  brideFamily, onBrideFamily,
  groomFamily, onGroomFamily,
  accentColor = "#c9a84c",
}: GalleryPanelProps) {
  const gold = accentColor;
  const lbl: React.CSSProperties = { display:"block",fontFamily:"'Montserrat',sans-serif",
    fontSize:9,letterSpacing:"0.3em",textTransform:"uppercase",color:"#555",marginBottom:10 };

  const [tab, setTab] = useState<"global"|"sections">("global");

  return (
    <div style={{ fontFamily:"'Montserrat',sans-serif" }}>

      {/* Tab switcher */}
      <div style={{ display:"flex",gap:4,marginBottom:16,background:"rgba(0,0,0,0.25)",
        padding:3,borderRadius:10,border:"1px solid rgba(255,255,255,0.06)" }}>
        {([["global","🌐 Default Style"],["sections","📂 Per Section"]] as const).map(([id,label])=>(
          <button key={id} type="button" onClick={()=>setTab(id)}
            style={{ flex:1,padding:"7px 4px",borderRadius:8,border:"none",cursor:"pointer",
              fontFamily:"'Montserrat',sans-serif",fontSize:10,letterSpacing:"0.08em",
              background:tab===id?`rgba(201,168,76,0.12)`:"transparent",
              color:tab===id?gold:"#666",
              transitionProperty:"background,color",transitionDuration:"0.15s",transitionTimingFunction:"ease" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "global" ? (
        <>
          <span style={lbl}>Gallery Layout</span>
          <StyleGrid value={selected} onChange={onSelect} gold={gold}/>
          {onSelectFillet && <>
            <span style={{ ...lbl, marginTop:16 }}>Corner Style</span>
            <FilletPicker value={selectedFillet} onChange={onSelectFillet} gold={gold}/>
          </>}
          <p style={{ fontSize:9,color:"#444",marginTop:10,lineHeight:1.6 }}>
            Default layout used for all image sections unless overridden per-section below.
          </p>
        </>
      ) : (
        <>
          <p style={{ fontSize:10,color:"#555",marginBottom:14,lineHeight:1.6 }}>
            Override the gallery layout and corner style for each image section individually.
          </p>
          {hero && onHero && (
            <SectionGalleryConfig emoji="🎆" title="Hero / Opening Images"
              value={hero} onChange={onHero} gold={gold}/>
          )}
          {story && onStory && (
            <SectionGalleryConfig emoji="📖" title="Love Story Images"
              value={story} onChange={onStory} gold={gold}/>
          )}
          {brideFamily && onBrideFamily && (
            <SectionGalleryConfig emoji="👩‍👧" title="Bride's Family Photos"
              value={brideFamily} onChange={onBrideFamily} gold={gold}/>
          )}
          {groomFamily && onGroomFamily && (
            <SectionGalleryConfig emoji="👨‍👦" title="Groom's Family Photos"
              value={groomFamily} onChange={onGroomFamily} gold={gold}/>
          )}
          <p style={{ fontSize:9,color:"#444",marginTop:8,lineHeight:1.6 }}>
            Sections without an override use the Default Style set above.
          </p>
        </>
      )}
    </div>
  );
}
