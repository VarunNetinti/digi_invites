"use client";
import { useState } from "react";

interface FontPanelProps {
  selectedFont: string;
  onSelect: (font: string) => void;
  sampleText?: string;
}

const FONT_GROUPS = [
  {
    group: "Calligraphy Scripts",
    desc: "Flowing, romantic — perfect for couple names",
    icon: "✒️",
    fonts: [
      { value: "Great Vibes",    label: "Great Vibes",    style: { fontFamily: "'Great Vibes',cursive" },    size: 30, note: "Classic · Default" },
      { value: "Sacramento",     label: "Sacramento",     style: { fontFamily: "'Sacramento',cursive" },     size: 30, note: "Elegant & slim" },
      { value: "Dancing Script", label: "Dancing Script", style: { fontFamily: "'Dancing Script',cursive" }, size: 26, note: "Playful loops" },
      { value: "Parisienne",     label: "Parisienne",     style: { fontFamily: "'Parisienne',cursive" },     size: 26, note: "French romance" },
      { value: "Alex Brush",     label: "Alex Brush",     style: { fontFamily: "'Alex Brush',cursive" },     size: 28, note: "Fine brushstroke" },
      { value: "Allura",         label: "Allura",         style: { fontFamily: "'Allura',cursive" },         size: 28, note: "Fluid & graceful" },
      { value: "Tangerine",      label: "Tangerine",      style: { fontFamily: "'Tangerine',cursive" },      size: 34, note: "Light & airy" },
      { value: "Pinyon Script",  label: "Pinyon Script",  style: { fontFamily: "'Pinyon Script',cursive" },  size: 26, note: "Ink pen style" },
    ],
  },
  {
    group: "Elegant Serifs",
    desc: "Refined, editorial — for titles and headings",
    icon: "📰",
    fonts: [
      { value: "Playfair Display",   label: "Playfair Display",   style: { fontFamily: "'Playfair Display',serif" },   size: 22, note: "Editorial & modern" },
      { value: "Cormorant Garamond", label: "Cormorant Garamond", style: { fontFamily: "'Cormorant Garamond',serif" }, size: 22, note: "Refined italic" },
      { value: "Bodoni Moda",        label: "Bodoni Moda",        style: { fontFamily: "'Bodoni Moda',serif" },        size: 21, note: "High contrast luxury" },
      { value: "Lora",               label: "Lora",               style: { fontFamily: "'Lora',serif" },               size: 21, note: "Warm & readable" },
      { value: "Libre Baskerville",  label: "Libre Baskerville",  style: { fontFamily: "'Libre Baskerville',serif" },  size: 19, note: "Classic book serif" },
      { value: "Spectral",           label: "Spectral",           style: { fontFamily: "'Spectral',serif" },           size: 21, note: "Crisp & literary" },
      { value: "EB Garamond",        label: "EB Garamond",        style: { fontFamily: "'EB Garamond',serif" },        size: 21, note: "Old-world book" },
      { value: "Cinzel",             label: "CINZEL",             style: { fontFamily: "'Cinzel',serif" },             size: 18, note: "Engraved stone caps" },
    ],
  },
  {
    group: "Modern Sans-Serif",
    desc: "Clean, contemporary — minimal luxury",
    icon: "⬛",
    fonts: [
      { value: "Raleway",      label: "Raleway",      style: { fontFamily: "'Raleway',sans-serif" },      size: 20, note: "Geometric & clean" },
      { value: "Josefin Sans", label: "Josefin Sans", style: { fontFamily: "'Josefin Sans',sans-serif" }, size: 19, note: "Minimal luxury" },
      { value: "Montserrat",   label: "Montserrat",   style: { fontFamily: "'Montserrat',sans-serif" },   size: 19, note: "Contemporary bold" },
      { value: "Lato",         label: "Lato",         style: { fontFamily: "'Lato',sans-serif" },         size: 20, note: "Friendly & versatile" },
    ],
  },
];

export default function FontPanel({ selectedFont, onSelect, sampleText }: FontPanelProps) {
  const [preview, setPreview] = useState(sampleText || "Priya & Rahul");
  const [hoveredFont, setHoveredFont] = useState<string | null>(null);
  const gold = "#c9a84c";

  const activeFont = hoveredFont || selectedFont || "Great Vibes";
  const activeFontEntry = FONT_GROUPS.flatMap(g => g.fonts).find(f => f.value === activeFont);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Live preview card */}
      <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 14, overflow: "hidden" }}>
        {/* Preview text display */}
        <div style={{
          background: "linear-gradient(135deg,#0f0520,#1a0a2e)",
          padding: "28px 20px",
          textAlign: "center",
          minHeight: 100,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 6,
          position: "relative",
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(${gold} 1px,transparent 1px)`, backgroundSize: "24px 24px" }} />
          <p style={{
            ...(activeFontEntry?.style ?? { fontFamily: "'Great Vibes',cursive" }),
            fontSize: activeFontEntry?.size ?? 30,
            color: gold,
            textShadow: `0 0 40px ${gold}55`,
            margin: 0,
            lineHeight: 1.2,
            transitionProperty: "all", transitionDuration: "0.25s", transitionTimingFunction: "ease",
            position: "relative",
          }}>
            {preview}
          </p>
          {hoveredFont && hoveredFont !== selectedFont && (
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "#555", letterSpacing: "0.2em", textTransform: "uppercase", position: "relative" }}>
              Previewing — click to select
            </p>
          )}
        </div>
        {/* Preview text input */}
        <div style={{ padding: "10px 14px", borderTop: "1px solid #1a1a28" }}>
          <input
            value={preview}
            onChange={e => setPreview(e.target.value)}
            placeholder="Type your names to preview..."
            style={{
              width: "100%", padding: "8px 12px", borderRadius: 8,
              background: "#0d0d14", border: "1px solid #2a2a3a",
              color: "#ccc", fontSize: 13, outline: "none",
              fontFamily: "'Montserrat',sans-serif",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Font groups */}
      {FONT_GROUPS.map(group => (
        <div key={group.group}>
          {/* Group header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 16 }}>{group.icon}</span>
            <div>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, fontWeight: 600, color: "#aaa", margin: 0, letterSpacing: "0.15em", textTransform: "uppercase" }}>{group.group}</p>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#444", margin: 0 }}>{group.desc}</p>
            </div>
          </div>

          {/* Font cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
            {group.fonts.map(f => {
              const isSelected = selectedFont === f.value;
              const isHovered = hoveredFont === f.value;

              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => onSelect(f.value)}
                  onMouseEnter={() => setHoveredFont(f.value)}
                  onMouseLeave={() => setHoveredFont(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: isSelected
                      ? `linear-gradient(135deg, ${gold}18, ${gold}08)`
                      : isHovered
                      ? "rgba(255,255,255,0.03)"
                      : "#111118",
                    border: isSelected
                      ? `1.5px solid ${gold}44`
                      : "1px solid #1a1a28",
                    cursor: "pointer",
                    textAlign: "left",
                    transitionProperty: "all", transitionDuration: "0.18s", transitionTimingFunction: "ease",
                  }}
                >
                  <div>
                    <span style={{
                      ...f.style,
                      fontSize: Math.min(f.size, 26),
                      color: isSelected ? gold : isHovered ? "#e8d5a3" : "#aaa",
                      display: "block",
                      lineHeight: 1.3,
                      marginBottom: 2,
                      transitionProperty: "color", transitionDuration: "0.18s", transitionTimingFunction: "ease",
                    }}>
                      {f.label}
                    </span>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#444" }}>
                      {f.note}
                    </span>
                  </div>

                  {/* Selection indicator */}
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    background: isSelected ? gold : "transparent",
                    border: isSelected ? "none" : "1.5px solid #2a2a3a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: "#0a0a0f",
                    transitionProperty: "all", transitionDuration: "0.18s", transitionTimingFunction: "ease",
                  }}>
                    {isSelected && "✓"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
