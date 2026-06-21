"use client";
import { useState, useRef, useEffect } from "react";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { Invitation } from "@/lib/types";

/* ── shared colour/font/effect data ─────────────────────────────── */

const PALETTES = [
  { name: "Royal Gold",        colors: [{ hex: "#c9a84c", label: "Classic Gold" },{ hex: "#e8d5a3", label: "Champagne" },{ hex: "#b8860b", label: "Goldenrod" },{ hex: "#ffd700", label: "Pure Gold" },{ hex: "#d4af37", label: "Metallic" },{ hex: "#f0c040", label: "Satin Gold" }] },
  { name: "Rose & Blush",      colors: [{ hex: "#c17b7b", label: "Dusty Rose" },{ hex: "#e8a0a0", label: "Blush" },{ hex: "#ff6b8a", label: "Hot Rose" },{ hex: "#8b3a52", label: "Deep Rose" },{ hex: "#d4748c", label: "Tea Rose" },{ hex: "#ffb3c1", label: "Baby Pink" }] },
  { name: "Emerald & Sage",    colors: [{ hex: "#4a5e3a", label: "Sage" },{ hex: "#2d6a4f", label: "Forest" },{ hex: "#1a4a2e", label: "Emerald" },{ hex: "#b87333", label: "Copper" },{ hex: "#8b6914", label: "Bronze" },{ hex: "#c8d8a0", label: "Mint" }] },
  { name: "Royal Navy",        colors: [{ hex: "#0d1b3e", label: "Navy" },{ hex: "#1a2a5e", label: "Royal Blue" },{ hex: "#667799", label: "Slate" },{ hex: "#8899bb", label: "Steel" },{ hex: "#c8d8f0", label: "Powder" },{ hex: "#4a3568", label: "Indigo" }] },
  { name: "Crimson & Ruby",    colors: [{ hex: "#c0392b", label: "Crimson" },{ hex: "#9d0208", label: "Deep Red" },{ hex: "#e63946", label: "Scarlet" },{ hex: "#dc322f", label: "Ruby" },{ hex: "#b5451b", label: "Terracotta" },{ hex: "#ff6b35", label: "Coral" }] },
  { name: "Lavender & Violet", colors: [{ hex: "#6b4f92", label: "Violet" },{ hex: "#9b59b6", label: "Amethyst" },{ hex: "#c8b4e8", label: "Lavender" },{ hex: "#a78bfa", label: "Soft Purple" },{ hex: "#7c3aed", label: "Deep Violet" },{ hex: "#e8d5f0", label: "Lilac" }] },
  { name: "Silver & Chrome",   colors: [{ hex: "#c0c0c0", label: "Silver" },{ hex: "#e8e8e8", label: "Platinum" },{ hex: "#a8a8a8", label: "Chrome" },{ hex: "#ffffff", label: "White" },{ hex: "#2c2c2c", label: "Charcoal" },{ hex: "#0d0d0d", label: "Onyx" }] },
];

const FONT_GROUPS = [
  { group: "Scripts", fonts: [
    { value: "Great Vibes",    label: "Great Vibes",    family: "'Great Vibes',cursive",    size: 28 },
    { value: "Sacramento",     label: "Sacramento",     family: "'Sacramento',cursive",     size: 28 },
    { value: "Dancing Script", label: "Dancing Script", family: "'Dancing Script',cursive", size: 24 },
    { value: "Parisienne",     label: "Parisienne",     family: "'Parisienne',cursive",     size: 24 },
    { value: "Alex Brush",     label: "Alex Brush",     family: "'Alex Brush',cursive",     size: 26 },
    { value: "Allura",         label: "Allura",         family: "'Allura',cursive",         size: 26 },
    { value: "Tangerine",      label: "Tangerine",      family: "'Tangerine',cursive",      size: 32 },
    { value: "Pinyon Script",  label: "Pinyon Script",  family: "'Pinyon Script',cursive",  size: 24 },
  ]},
  { group: "Serifs", fonts: [
    { value: "Playfair Display",   label: "Playfair Display",   family: "'Playfair Display',serif",   size: 20 },
    { value: "Cormorant Garamond", label: "Cormorant Garamond", family: "'Cormorant Garamond',serif", size: 20 },
    { value: "Bodoni Moda",        label: "Bodoni Moda",        family: "'Bodoni Moda',serif",        size: 19 },
    { value: "Lora",               label: "Lora",               family: "'Lora',serif",               size: 19 },
    { value: "EB Garamond",        label: "EB Garamond",        family: "'EB Garamond',serif",        size: 19 },
    { value: "Cinzel",             label: "CINZEL",             family: "'Cinzel',serif",             size: 17 },
  ]},
  { group: "Sans", fonts: [
    { value: "Raleway",      label: "Raleway",      family: "'Raleway',sans-serif",      size: 18 },
    { value: "Josefin Sans", label: "Josefin Sans", family: "'Josefin Sans',sans-serif", size: 18 },
    { value: "Montserrat",   label: "Montserrat",   family: "'Montserrat',sans-serif",   size: 18 },
    { value: "Lato",         label: "Lato",         family: "'Lato',sans-serif",         size: 18 },
  ]},
];

const FORMATS = [
  { id:"letter",      label:"Letter Envelope",   icon:"💌", desc:"Classic wax-seal envelope that opens with a zoom" },
  { id:"scroll",      label:"Royal Scroll",       icon:"📜", desc:"Parchment scroll unrolls to reveal the invitation" },
  { id:"curtain",     label:"Stage Curtains",     icon:"🎭", desc:"Velvet curtains part dramatically left & right" },
  { id:"book",        label:"Storybook",          icon:"📖", desc:"A wedding book opens its pages" },
  { id:"gate",        label:"Grand Gates",        icon:"🚪", desc:"Ornate gold gates swing open with a key" },
  { id:"cinematic",   label:"Cinematic Film",     icon:"🎬", desc:"Letterbox bars reveal a title card like a movie" },
  { id:"typewriter",  label:"Typewriter Letter",  icon:"⌨️", desc:"A heartfelt letter types out character by character" },
  { id:"zoom-reveal", label:"Space Zoom",         icon:"🌌", desc:"Zoom in through a starfield to the names" },
  { id:"rise-up",     label:"Rise from Below",    icon:"⬆️", desc:"The invitation panel rises up from the bottom" },
];

const EFFECTS = [
  { id: "hearts",          label: "Floating Hearts",     icon: "♥",  color: "#ff6b8a" },
  { id: "fireflies",       label: "Fireflies",           icon: "✨",  color: "#ffd700" },
  { id: "gold-dust",       label: "Gold Dust",           icon: "✦",  color: "#c9a84c" },
  { id: "sakura",          label: "Sakura Blossoms",     icon: "🌸", color: "#ffb7c5" },
  { id: "fireworks",       label: "Fireworks",           icon: "🎆", color: "#60a5fa" },
  { id: "shooting-stars",  label: "Shooting Stars",      icon: "💫", color: "#e8d5a3" },
  { id: "balloons",        label: "Balloons",            icon: "🎈", color: "#ff6b8a" },
  { id: "mandala",         label: "Mandalas",            icon: "🔮", color: "#a78bfa" },
  { id: "butterflies",     label: "Butterflies",         icon: "🦋", color: "#8b5cf6" },
  { id: "parrots",         label: "Parrots",             icon: "🦜", color: "#22c55e" },
  { id: "birds",           label: "Flying Birds",        icon: "🐦", color: "#888"    },
  { id: "stars",           label: "Rising Stars",        icon: "⭐", color: "#f9c74f" },
  { id: "rose-petals",     label: "Rose Petals",         icon: "🌹", color: "#f472b6" },
  { id: "confetti",        label: "Confetti Rain",       icon: "🎊", color: "#fbbf24" },
  { id: "sakura+fireflies",label: "Sakura + Fireflies",  icon: "🌸✨",color: "#ffb7c5"},
  { id: "gold+mandala",    label: "Gold + Mandalas",     icon: "✦🔮",color: "#c9a84c"},
  { id: "fireworks+hearts",label: "Fireworks + Hearts",  icon: "🎆♥",color: "#ff6b8a"},
  { id: "hearts+parrots",  label: "Hearts + Parrots",    icon: "♥🦜",color: "#22c55e"},
  { id: "none",            label: "No Effect",           icon: "○",  color: "#444"   },
];

/* ── Props ───────────────────────────────────────────────────────── */
interface QuickToolbarProps {
  selectedTemplateId: string;
  onSelectTemplate: (id: string) => void;

  selectedColor: string;
  onSelectColor: (color: string) => void;

  selectedFont: string;
  onSelectFont: (font: string) => void;

  selectedEffect: string;
  onSelectEffect: (effect: string) => void;

  // ADD THESE
  selectedFormat?: string;
  onSelectFormat?: (format: string) => void;

  selectedGalleryStyle?: string;
  onSelectGalleryStyle?: (s: string) => void;

  selectedGalleryFillet?: string;
  onSelectGalleryFillet?: (f: string) => void;

  previewInvitation: Invitation;
  onHoverTemplate?: (id: string | null) => void;

  brideName: string;
  groomName: string;
}

type DropKey = "template" | "color" | "font" | "effect" | "format" | "gallery" | null;

/* ── Shared dropdown wrapper ─────────────────────────────────────── */
function Dropdown({ open, children }: { open: boolean; children?: React.ReactNode }) {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 300,
      width: 320,
      background: "linear-gradient(180deg,#0e0e1a,#0a0a12)",
      border: "1px solid rgba(201,168,76,0.18)",
      borderRadius: 14,
      boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(201,168,76,0.1)",
      overflow: "hidden",
      maxHeight: open ? "72vh" : 0,
      opacity: open ? 1 : 0,
      transform: open ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.98)",
      transitionProperty: "max-height, 1, 0.36, 1), opacity, transform", transitionDuration: "0.35s, 0.3s, 0.3s, 0.3s, 0.25s, 0.3s", transitionTimingFunction: "cubic-bezier(0.22, ease, ease, ease, ease, ease",
      pointerEvents: open ? "all" : "none",
    }}>
      <div style={{ overflowY: "auto", maxHeight: "72vh", scrollbarWidth: "thin", scrollbarColor: "#c9a84c33 transparent" }}>
        {children}
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function QuickToolbar({
  selectedTemplateId, onSelectTemplate,
  selectedColor, onSelectColor,
  selectedFont, onSelectFont,
  selectedEffect, onSelectEffect,
  selectedFormat, onSelectFormat,
  selectedGalleryStyle, onSelectGalleryStyle,
  selectedGalleryFillet, onSelectGalleryFillet,
  onHoverTemplate,
  brideName, groomName,
}: QuickToolbarProps) {
  const [open, setOpen] = useState<DropKey>(null);
  const [customHex, setCustomHex] = useState(selectedColor || "#c9a84c");
  const [fontPreview] = useState(brideName && groomName ? `${brideName} & ${groomName}` : "Bride & Groom");
  const toolbarRef = useRef<HTMLDivElement>(null);
  const gold = "#c9a84c";

  /* Close dropdown on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        setOpen(null);
        onHoverTemplate?.(null);
      }
    };
    const escHandler = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); onHoverTemplate?.(null); } };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escHandler);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("keydown", escHandler); };
  }, [open, onHoverTemplate]);

  const toggle = (key: DropKey) => {
    setOpen(p => p === key ? null : key);
    if (key !== "template") onHoverTemplate?.(null);
  };

  const selectedTemplate  = TEMPLATE_REGISTRY.find(t => t.id === selectedTemplateId);
  const selectedEffectObj = EFFECTS.find(e => e.id === (selectedEffect || "hearts"));
  const selectedFormatObj = FORMATS.find(f => f.id === (selectedFormat || "letter"));
  const allFonts          = FONT_GROUPS.flatMap(g => g.fonts);
  const selectedFontObj   = allFonts.find(f => f.value === selectedFont);

  /* ── Button pill ── */
  const Pill = ({ keyName, label, children }: { keyName: DropKey; label: string; children: React.ReactNode }) => {
    const isOpen = open === keyName;
    return (
      <div style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => toggle(keyName)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "9px 14px", borderRadius: 10, cursor: "pointer",
            background: isOpen ? `${gold}18` : "rgba(255,255,255,0.03)",
            border: isOpen ? `1.5px solid ${gold}55` : "1px solid rgba(255,255,255,0.07)",
            transitionProperty: "all", transitionDuration: "0.18s", transitionTimingFunction: "ease",
            boxShadow: isOpen ? `0 2px 16px ${gold}18` : "none",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { if (!isOpen) { (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"); (e.currentTarget.style.background = "rgba(255,255,255,0.05)"); }}}
          onMouseLeave={e => { if (!isOpen) { (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"); (e.currentTarget.style.background = "rgba(255,255,255,0.03)"); }}}
        >
          {children}
          <span style={{ color: isOpen ? gold : "#444", fontSize: 8, marginLeft: 2, transitionProperty: "transform, color", transitionDuration: "0.2s, 0.2s", transitionTimingFunction: "ease, ease", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
        </button>
        {/* The dropdown content is rendered by the caller */}
        <Dropdown open={isOpen}>{/* placeholder — content passed below */}</Dropdown>
      </div>
    );
  };

  return (
    <div ref={toolbarRef} style={{ display: "flex", gap: 6, flexWrap: "wrap", position: "relative" }}>

      {/* ── TEMPLATE button + dropdown ── */}
      <div style={{ position: "relative" }}>
        <button type="button" onClick={() => toggle("template")} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 14px", borderRadius:10, cursor:"pointer", background: open==="template" ? `${gold}18` : "rgba(255,255,255,0.03)", border: open==="template" ? `1.5px solid ${gold}55` : "1px solid rgba(255,255,255,0.07)", transitionProperty: "all", transitionDuration: "0.18s", transitionTimingFunction: "ease" }}
          onMouseEnter={e=>{ if(open!=="template"){(e.currentTarget.style.background="rgba(255,255,255,0.05)");(e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"); }}}
          onMouseLeave={e=>{ if(open!=="template"){(e.currentTarget.style.background="rgba(255,255,255,0.03)");(e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"); }}}>
          <span style={{ fontSize: 9, letterSpacing:"0.25em", textTransform:"uppercase", color: open==="template" ? gold : "#555", display:"block", marginBottom:1, fontFamily:"'Montserrat',sans-serif" }}>Template</span>
          <span style={{ fontSize:12, color: open==="template" ? "#fff" : "#888", fontFamily:"'Montserrat',sans-serif", maxWidth:120, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {selectedTemplate ? `${selectedTemplate.emoji} ${selectedTemplate.name}` : "Not selected"}
          </span>
          <span style={{ color: open==="template" ? gold : "#444", fontSize:8, transitionProperty: "transform", transitionDuration: "0.2s", transitionTimingFunction: "ease", display:"inline-block", transform: open==="template" ? "rotate(180deg)" : "none" }}>▼</span>
        </button>

        <Dropdown open={open === "template"}>
          <div style={{ padding:"14px 14px 10px" }}>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:gold, margin:"0 0 10px" }}>
              {TEMPLATE_REGISTRY.length} Templates · Hover to preview in live viewer
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {TEMPLATE_REGISTRY.map((t, i) => {
                const isSel = selectedTemplateId === t.id;
                return (
                  <button key={t.id} type="button"
                    onClick={() => { onSelectTemplate(t.id); setOpen(null); onHoverTemplate?.(null); }}
                    onMouseEnter={() => onHoverTemplate?.(t.id)}
                    onMouseLeave={() => onHoverTemplate?.(selectedTemplateId || null)}
                    style={{ display:"grid", gridTemplateColumns:"32px 1fr 18px", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:8, cursor:"pointer", textAlign:"left", background: isSel ? `${gold}18` : "transparent", border: isSel ? `1px solid ${gold}44` : "1px solid transparent", transitionProperty: "all", transitionDuration: "0.15s", transitionTimingFunction: "ease" }}
                    onFocus={e => (e.currentTarget.style.background = isSel ? `${gold}18` : "rgba(255,255,255,0.04)")}
                    onBlur={e => (e.currentTarget.style.background = isSel ? `${gold}18` : "transparent")}
                  >
                    <span style={{ fontSize:18, lineHeight:1 }}>{t.emoji}</span>
                    <div>
                      <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, fontWeight:500, color: isSel ? gold : "#ccc", margin:"0 0 2px" }}>{t.name}</p>
                      <div style={{ display:"flex", gap:3 }}>
                        {t.colors.map((c, ci) => <div key={ci} style={{ width:10, height:10, borderRadius:"50%", background:c, border:"1px solid rgba(255,255,255,0.08)" }} />)}
                      </div>
                    </div>
                    {isSel && <span style={{ fontSize:9, color:gold }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </Dropdown>
      </div>

      {/* ── COLOR button + dropdown ── */}
      <div style={{ position: "relative" }}>
        <button type="button" onClick={() => toggle("color")} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 14px", borderRadius:10, cursor:"pointer", background: open==="color" ? `${gold}18` : "rgba(255,255,255,0.03)", border: open==="color" ? `1.5px solid ${gold}55` : "1px solid rgba(255,255,255,0.07)", transitionProperty: "all", transitionDuration: "0.18s", transitionTimingFunction: "ease" }}
          onMouseEnter={e=>{ if(open!=="color"){(e.currentTarget.style.background="rgba(255,255,255,0.05)");(e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"); }}}
          onMouseLeave={e=>{ if(open!=="color"){(e.currentTarget.style.background="rgba(255,255,255,0.03)");(e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"); }}}>
          <div style={{ width:10, height:10, borderRadius:"50%", background: selectedColor || gold, boxShadow:`0 0 5px ${selectedColor || gold}`, flexShrink:0 }} />
          <div>
            <span style={{ fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color: open==="color" ? gold : "#555", display:"block", fontFamily:"'Montserrat',sans-serif" }}>Color</span>
            <span style={{ fontFamily:"monospace", fontSize:11, color: selectedColor || gold }}>{(selectedColor || gold).toUpperCase()}</span>
          </div>
          <span style={{ color: open==="color" ? gold : "#444", fontSize:8, display:"inline-block", transform: open==="color" ? "rotate(180deg)" : "none", transitionProperty: "transform", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}>▼</span>
        </button>

        <Dropdown open={open === "color"}>
          <div style={{ padding:"14px 14px 10px" }}>
            {/* Live swatch */}
            <div style={{ height:52, borderRadius:10, background: selectedColor || gold, marginBottom:10, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, opacity:0.12, backgroundImage:"linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%)", backgroundSize:"8px 8px" }} />
              <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:22, color: selectedColor && parseInt(selectedColor.slice(1),16) > 0x888888 ? "#000" : "#fff", position:"relative" }}>Bride &amp; Groom</p>
            </div>
            {/* Custom hex */}
            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
              <div style={{ position:"relative", width:36, height:36, borderRadius:8, overflow:"hidden", border:"1px solid #2a2a3a", flexShrink:0 }}>
                <input type="color" value={customHex.length===7 ? customHex : "#c9a84c"} onChange={e => { setCustomHex(e.target.value); onSelectColor(e.target.value); }} style={{ position:"absolute", inset:-4, width:"calc(100%+8px)", height:"calc(100%+8px)", cursor:"pointer", opacity:0, zIndex:2 }} />
                <div style={{ width:"100%", height:"100%", background: customHex, borderRadius:7 }} />
              </div>
              <input value={customHex} onChange={e => { setCustomHex(e.target.value); if(/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) onSelectColor(e.target.value); }} placeholder="#c9a84c" style={{ flex:1, padding:"7px 10px", borderRadius:8, background:"#0d0d14", border:"1px solid #2a2a3a", color:"#fff", fontSize:13, fontFamily:"monospace", outline:"none" }} />
            </div>
            {/* Palettes */}
            {PALETTES.map(pal => (
              <div key={pal.name} style={{ marginBottom:12 }}>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"#555", marginBottom:6 }}>{pal.name}</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:5 }}>
                  {pal.colors.map(c => (
                    <button key={c.hex} type="button" title={c.label} onClick={() => { onSelectColor(c.hex); setCustomHex(c.hex); }}
                      style={{ height:28, borderRadius:6, background:c.hex, border: selectedColor===c.hex ? `2px solid #fff` : "1px solid rgba(255,255,255,0.08)", cursor:"pointer", transitionProperty: "all", transitionDuration: "0.15s", transitionTimingFunction: "ease", transform: selectedColor===c.hex ? "scale(1.12)" : "scale(1)", boxShadow: selectedColor===c.hex ? `0 0 10px ${c.hex}88` : "none" }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Dropdown>
      </div>

      {/* ── FONT button + dropdown ── */}
      <div style={{ position: "relative" }}>
        <button type="button" onClick={() => toggle("font")} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 14px", borderRadius:10, cursor:"pointer", background: open==="font" ? `${gold}18` : "rgba(255,255,255,0.03)", border: open==="font" ? `1.5px solid ${gold}55` : "1px solid rgba(255,255,255,0.07)", transitionProperty: "all", transitionDuration: "0.18s", transitionTimingFunction: "ease" }}
          onMouseEnter={e=>{ if(open!=="font"){(e.currentTarget.style.background="rgba(255,255,255,0.05)");(e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"); }}}
          onMouseLeave={e=>{ if(open!=="font"){(e.currentTarget.style.background="rgba(255,255,255,0.03)");(e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"); }}}>
          <div>
            <span style={{ fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color: open==="font" ? gold : "#555", display:"block", fontFamily:"'Montserrat',sans-serif" }}>Font</span>
            <span style={{ fontFamily: selectedFontObj ? selectedFontObj.family : "'Great Vibes',cursive", fontSize: Math.min((selectedFontObj?.size ?? 26), 20), color: open==="font" ? "#fff" : "#888", display:"block", maxWidth:120, overflow:"hidden", whiteSpace:"nowrap" }}>
              {selectedFont || "Great Vibes"}
            </span>
          </div>
          <span style={{ color: open==="font" ? gold : "#444", fontSize:8, display:"inline-block", transform: open==="font" ? "rotate(180deg)" : "none", transitionProperty: "transform", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}>▼</span>
        </button>

        <Dropdown open={open === "font"}>
          <div style={{ padding:"14px 14px 10px" }}>
            {/* Live preview */}
            <div style={{ background:"linear-gradient(135deg,#0f0520,#1a0a2e)", borderRadius:10, padding:"14px 12px", marginBottom:12, textAlign:"center" }}>
              <p style={{ fontFamily: selectedFontObj ? selectedFontObj.family : "'Great Vibes',cursive", fontSize: Math.min(selectedFontObj?.size ?? 28, 28), color: gold, margin:0, lineHeight:1.2, textShadow:`0 0 20px ${gold}55` }}>
                {fontPreview}
              </p>
            </div>
            {/* Font groups */}
            {FONT_GROUPS.map(group => (
              <div key={group.group} style={{ marginBottom:12 }}>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color:"#444", marginBottom:6 }}>{group.group}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                  {group.fonts.map(f => {
                    const isSel = selectedFont === f.value;
                    return (
                      <button key={f.value} type="button" onClick={() => onSelectFont(f.value)}
                        style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 10px", borderRadius:8, cursor:"pointer", background: isSel ? `${gold}18` : "transparent", border: isSel ? `1px solid ${gold}44` : "1px solid transparent", transitionProperty: "all", transitionDuration: "0.15s", transitionTimingFunction: "ease", textAlign:"left" }}
                        onMouseEnter={e=>{ if(!isSel)(e.currentTarget.style.background="rgba(255,255,255,0.04)"); }}
                        onMouseLeave={e=>{ if(!isSel)(e.currentTarget.style.background="transparent"); }}>
                        <span style={{ fontFamily:f.family, fontSize: Math.min(f.size,22), color: isSel ? gold : "#aaa", display:"block", lineHeight:1.2 }}>{f.label}</span>
                        {isSel && <span style={{ fontSize:9, color:gold, flexShrink:0 }}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Dropdown>
      </div>

      {/* ── FORMAT button + dropdown ── */}
      <div style={{ position: "relative" }}>
        <button type="button" onClick={() => toggle("format")} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 14px", borderRadius:10, cursor:"pointer", background: open==="format" ? `${gold}18` : "rgba(255,255,255,0.03)", border: open==="format" ? `1.5px solid ${gold}55` : "1px solid rgba(255,255,255,0.07)", transitionProperty: "all", transitionDuration: "0.18s", transitionTimingFunction: "ease" }}
          onMouseEnter={e=>{ if(open!=="format"){(e.currentTarget.style.background="rgba(255,255,255,0.05)");(e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"); }}}
          onMouseLeave={e=>{ if(open!=="format"){(e.currentTarget.style.background="rgba(255,255,255,0.03)");(e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"); }}}>
          <span style={{ fontSize:16 }}>{selectedFormatObj?.icon ?? "💌"}</span>
          <div>
            <span style={{ fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color: open==="format" ? gold : "#555", display:"block", fontFamily:"'Montserrat',sans-serif" }}>Opening</span>
            <span style={{ fontSize:11, color: open==="format" ? "#fff" : "#888", fontFamily:"'Montserrat',sans-serif", maxWidth:110, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", display:"block" }}>{selectedFormatObj?.label ?? "Letter Envelope"}</span>
          </div>
          <span style={{ color: open==="format" ? gold : "#444", fontSize:8, display:"inline-block", transform: open==="format" ? "rotate(180deg)" : "none", transitionProperty: "transform", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}>▼</span>
        </button>

        <Dropdown open={open === "format"}>
          <div style={{ padding:"14px 14px 10px" }}>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:gold, margin:"0 0 10px" }}>Opening Animation Style</p>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {FORMATS.map(fmt => {
                const isSel = (selectedFormat || "letter") === fmt.id;
                return (
                  <button key={fmt.id} type="button" onClick={() => { onSelectFormat?.(fmt.id); setOpen(null); }}
                    style={{ display:"grid", gridTemplateColumns:"36px 1fr 18px", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:8, cursor:"pointer", textAlign:"left", background: isSel ? `${gold}14` : "transparent", border: isSel ? `1px solid ${gold}33` : "1px solid transparent", transitionProperty: "all", transitionDuration: "0.15s", transitionTimingFunction: "ease" }}
                    onMouseEnter={e=>{ if(!isSel)(e.currentTarget.style.background="rgba(255,255,255,0.04)"); }}
                    onMouseLeave={e=>{ if(!isSel)(e.currentTarget.style.background="transparent"); }}>
                    <span style={{ fontSize:20, textAlign:"center" }}>{fmt.icon}</span>
                    <div>
                      <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, fontWeight:500, color: isSel ? gold : "#ccc", margin:"0 0 2px" }}>{fmt.label}</p>
                      <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:"#555", margin:0 }}>{fmt.desc}</p>
                    </div>
                    {isSel && <span style={{ fontSize:9, color:gold }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </Dropdown>
      </div>

      {/* ── EFFECT button + dropdown ── */}
      <div style={{ position: "relative" }}>
        <button type="button" onClick={() => toggle("effect")} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 14px", borderRadius:10, cursor:"pointer", background: open==="effect" ? `${gold}18` : "rgba(255,255,255,0.03)", border: open==="effect" ? `1.5px solid ${gold}55` : "1px solid rgba(255,255,255,0.07)", transitionProperty: "all", transitionDuration: "0.18s", transitionTimingFunction: "ease" }}
          onMouseEnter={e=>{ if(open!=="effect"){(e.currentTarget.style.background="rgba(255,255,255,0.05)");(e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"); }}}
          onMouseLeave={e=>{ if(open!=="effect"){(e.currentTarget.style.background="rgba(255,255,255,0.03)");(e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"); }}}>
          <span style={{ fontSize:16 }}>{selectedEffectObj?.icon ?? "♥"}</span>
          <div>
            <span style={{ fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color: open==="effect" ? gold : "#555", display:"block", fontFamily:"'Montserrat',sans-serif" }}>Effect</span>
            <span style={{ fontSize:11, color: open==="effect" ? "#fff" : "#888", fontFamily:"'Montserrat',sans-serif" }}>{selectedEffectObj?.label ?? "Hearts"}</span>
          </div>
          <span style={{ color: open==="effect" ? gold : "#444", fontSize:8, display:"inline-block", transform: open==="effect" ? "rotate(180deg)" : "none", transitionProperty: "transform", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}>▼</span>
        </button>

        <Dropdown open={open === "effect"}>
          <div style={{ padding:"14px 14px 10px" }}>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:gold, margin:"0 0 10px" }}>Opening Animation</p>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {EFFECTS.map(ef => {
                const isSel = (selectedEffect || "hearts") === ef.id;
                return (
                  <button key={ef.id} type="button" onClick={() => { onSelectEffect(ef.id); setOpen(null); }}
                    style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:8, cursor:"pointer", textAlign:"left", background: isSel ? `${gold}14` : "transparent", border: isSel ? `1px solid ${gold}33` : "1px solid transparent", transitionProperty: "all", transitionDuration: "0.15s", transitionTimingFunction: "ease" }}
                    onMouseEnter={e=>{ if(!isSel)(e.currentTarget.style.background="rgba(255,255,255,0.04)"); }}
                    onMouseLeave={e=>{ if(!isSel)(e.currentTarget.style.background="transparent"); }}>
                    <div style={{ width:34, height:34, borderRadius:8, flexShrink:0, background:`${ef.color}18`, border:`1px solid ${ef.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:ef.color }}>
                      {ef.icon}
                    </div>
                    <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, color: isSel ? gold : "#bbb", margin:0, flex:1 }}>{ef.label}</p>
                    {isSel && <span style={{ fontSize:9, color:gold }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </Dropdown>
      </div>

      {/* ── Gallery Layout ── */}
      {onSelectGalleryStyle && (
        <div style={{ position:"relative" }}>
          <button type="button" onClick={() => toggle("gallery")}
            style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 14px", borderRadius:10, cursor:"pointer",
              background: open==="gallery" ? `${gold}18` : "rgba(255,255,255,0.03)",
              border: open==="gallery" ? `1.5px solid ${gold}55` : "1px solid rgba(255,255,255,0.07)",
              transitionProperty:"background,border-color", transitionDuration:"0.18s", transitionTimingFunction:"ease" }}
            onMouseEnter={e=>{ if(open!=="gallery"){(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(255,255,255,0.14)"; }}}
            onMouseLeave={e=>{ if(open!=="gallery"){(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.03)"; (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(255,255,255,0.07)"; }}}>
            <span style={{ fontSize:16 }}>🖼</span>
            <div>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:9, letterSpacing:"0.25em", textTransform:"uppercase", color:"#666", margin:0 }}>Gallery</p>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:11, color: open==="gallery" ? gold : "#ccc", margin:0 }}>
                {selectedGalleryStyle || "Slideshow"}
              </p>
            </div>
            <span style={{ color:"#555", fontSize:10, marginLeft:4 }}>▾</span>
          </button>
          <Dropdown open={open==="gallery"}>
            <div style={{ padding:"16px 16px 20px" }}>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", color:"#555", marginBottom:12 }}>Gallery Layout</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
                {[
                  {id:"slideshow",label:"Fade",emoji:"🎞"},
                  {id:"slideshow-slide",label:"Slide",emoji:"▶"},
                  {id:"slideshow-zoom",label:"Zoom",emoji:"🔍"},
                  {id:"polaroid",label:"Polaroid",emoji:"📷"},
                  {id:"collage-2",label:"Duo",emoji:"⬛⬛"},
                  {id:"collage-3",label:"Trio",emoji:"🖼"},
                  {id:"collage-4",label:"Grid",emoji:"⊞"},
                  {id:"filmstrip",label:"Film",emoji:"🎬"},
                  {id:"masonry",label:"Masonry",emoji:"🧱"},
                  {id:"magazine",label:"Magazine",emoji:"📰"},
                  {id:"amoeba",label:"Amoeba",emoji:"🫧"},
                  {id:"hexagon",label:"Hexagon",emoji:"⬡"},
                  {id:"diamond",label:"Diamond",emoji:"💎"},
                  {id:"circle-burst",label:"Burst",emoji:"🎯"},
                  {id:"arch",label:"Arch",emoji:"🏛"},
                  {id:"petal",label:"Petal",emoji:"🌸"},
                ].map(s => {
                  const active = (selectedGalleryStyle||"slideshow") === s.id;
                  return (
                    <button key={s.id} type="button"
                      onClick={() => { onSelectGalleryStyle!(s.id); setOpen(null); }}
                      style={{ padding:"8px 4px", borderRadius:8, border:`1px solid ${active?gold:"rgba(255,255,255,0.07)"}`,
                        background:active?`rgba(201,168,76,0.1)`:"rgba(255,255,255,0.02)",
                        cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                      <span style={{ fontSize:16 }}>{s.emoji}</span>
                      <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:8, color:active?gold:"#888", textAlign:"center" }}>{s.label}</span>
                    </button>
                  );
                })}
              </div>
              {onSelectGalleryFillet && (
                <>
                  <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", color:"#555", margin:"14px 0 8px" }}>Corner Style</p>
                  <div style={{ display:"flex", gap:6 }}>
                    {[{id:"none",label:"Sharp",r:"1px"},{id:"soft",label:"Soft",r:"6px"},{id:"rounded",label:"Round",r:"14px"},{id:"pill",label:"Pill",r:"28px"},{id:"circle",label:"Circle",r:"50%"}].map(f=>{
                      const active = (selectedGalleryFillet||"soft") === f.id;
                      return (
                        <button key={f.id} type="button" onClick={() => onSelectGalleryFillet!(f.id)}
                          style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:5, padding:"7px 4px",
                            borderRadius:8, border:`1px solid ${active?gold:"rgba(255,255,255,0.07)"}`,
                            background:active?`rgba(201,168,76,0.09)`:"rgba(255,255,255,0.02)", cursor:"pointer" }}>
                          <div style={{ width:24,height:24, background:active?`rgba(201,168,76,0.18)`:"rgba(255,255,255,0.05)",
                            border:`1.5px solid ${active?gold:"rgba(255,255,255,0.12)"}`, borderRadius:f.r }} />
                          <span style={{ fontFamily:"'Montserrat',sans-serif",fontSize:8,color:active?gold:"#666" }}>{f.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </Dropdown>
        </div>
      )}

    </div>
  );
}
