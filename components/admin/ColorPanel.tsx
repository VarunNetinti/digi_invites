"use client";
import { useState } from "react";

interface ColorPanelProps {
  selectedColor: string;
  onSelect: (color: string) => void;
}

const PALETTES = [
  {
    name: "Royal Gold", group: "Elegant",
    colors: [
      { hex: "#c9a84c", label: "Classic Gold" },
      { hex: "#e8d5a3", label: "Champagne" },
      { hex: "#b8860b", label: "Dark Goldenrod" },
      { hex: "#ffd700", label: "Pure Gold" },
      { hex: "#d4af37", label: "Metallic Gold" },
      { hex: "#f0c040", label: "Satin Gold" },
    ],
  },
  {
    name: "Rose & Blush", group: "Romantic",
    colors: [
      { hex: "#c17b7b", label: "Dusty Rose" },
      { hex: "#e8a0a0", label: "Blush Pink" },
      { hex: "#ff6b8a", label: "Hot Rose" },
      { hex: "#8b3a52", label: "Deep Rose" },
      { hex: "#d4748c", label: "Tea Rose" },
      { hex: "#ffb3c1", label: "Baby Pink" },
    ],
  },
  {
    name: "Emerald & Sage", group: "Nature",
    colors: [
      { hex: "#4a5e3a", label: "Sage Green" },
      { hex: "#2d6a4f", label: "Forest" },
      { hex: "#1a4a2e", label: "Emerald" },
      { hex: "#b87333", label: "Copper" },
      { hex: "#8b6914", label: "Bronze" },
      { hex: "#c8d8a0", label: "Mint" },
    ],
  },
  {
    name: "Royal Navy", group: "Classic",
    colors: [
      { hex: "#0d1b3e", label: "Navy" },
      { hex: "#1a2a5e", label: "Royal Blue" },
      { hex: "#667799", label: "Slate Blue" },
      { hex: "#8899bb", label: "Steel Blue" },
      { hex: "#c8d8f0", label: "Powder Blue" },
      { hex: "#4a3568", label: "Indigo" },
    ],
  },
  {
    name: "Crimson & Ruby", group: "Bold",
    colors: [
      { hex: "#c0392b", label: "Crimson" },
      { hex: "#9d0208", label: "Deep Red" },
      { hex: "#e63946", label: "Scarlet" },
      { hex: "#dc322f", label: "Ruby" },
      { hex: "#b5451b", label: "Terracotta" },
      { hex: "#ff6b35", label: "Coral" },
    ],
  },
  {
    name: "Lavender & Violet", group: "Dreamy",
    colors: [
      { hex: "#6b4f92", label: "Violet" },
      { hex: "#9b59b6", label: "Amethyst" },
      { hex: "#c8b4e8", label: "Lavender" },
      { hex: "#a78bfa", label: "Soft Purple" },
      { hex: "#7c3aed", label: "Deep Violet" },
      { hex: "#e8d5f0", label: "Lilac" },
    ],
  },
  {
    name: "Midnight & Silver", group: "Luxe",
    colors: [
      { hex: "#c0c0c0", label: "Silver" },
      { hex: "#e8e8e8", label: "Platinum" },
      { hex: "#a8a8a8", label: "Chrome" },
      { hex: "#ffffff", label: "White" },
      { hex: "#2c2c2c", label: "Charcoal" },
      { hex: "#0d0d0d", label: "Onyx" },
    ],
  },
];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function contrastColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum > 140 ? "#0a0a0f" : "#ffffff";
}

export default function ColorPanel({ selectedColor, onSelect }: ColorPanelProps) {
  const [customHex, setCustomHex] = useState(selectedColor || "#c9a84c");
  const [copiedHex, setCopiedHex] = useState("");

  const handleCustomInput = (val: string) => {
    setCustomHex(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) onSelect(val);
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(""), 1500);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Current selection hero */}
      <div style={{
        borderRadius: 16, overflow: "hidden", border: "1px solid #1e1e2e",
      }}>
        <div style={{
          height: 80,
          background: selectedColor || "#c9a84c",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
          transitionProperty: "background", transitionDuration: "0.35s", transitionTimingFunction: "ease",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.15,
            backgroundImage: "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%)",
            backgroundSize: "8px 8px",
          }} />
          <div style={{ textAlign: "center", position: "relative" }}>
            <p style={{
              fontFamily: "'Great Vibes',cursive", fontSize: 28,
              color: contrastColor(selectedColor || "#c9a84c"),
              textShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }}>Bride &amp; Groom</p>
          </div>
        </div>
        <div style={{
          padding: "12px 16px",
          background: "#111118",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#888", margin: "0 0 2px" }}>Selected accent color</p>
            <p style={{ fontFamily: "monospace", fontSize: 14, color: selectedColor || "#c9a84c", margin: 0 }}>
              {(selectedColor || "#c9a84c").toUpperCase()}
            </p>
          </div>
          <button
            onClick={() => copyHex(selectedColor || "#c9a84c")}
            style={{
              padding: "6px 12px", borderRadius: 8, fontSize: 11,
              background: "rgba(255,255,255,0.05)", border: "1px solid #2a2a3a",
              color: copiedHex === selectedColor ? "#4ade80" : "#888",
              cursor: "pointer", fontFamily: "'Montserrat',sans-serif",
              transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease",
            }}
          >
            {copiedHex === selectedColor ? "Copied!" : "Copy hex"}
          </button>
        </div>
      </div>

      {/* Custom hex input */}
      <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 12, padding: "14px 16px" }}>
        <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#555", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 10 }}>Custom Color</p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Native color picker */}
          <div style={{ position: "relative", width: 44, height: 44, borderRadius: 10, overflow: "hidden", border: "1px solid #2a2a3a", flexShrink: 0 }}>
            <input
              type="color"
              value={customHex.startsWith("#") && customHex.length === 7 ? customHex : "#c9a84c"}
              onChange={e => { setCustomHex(e.target.value); onSelect(e.target.value); }}
              style={{ position: "absolute", inset: -4, width: "calc(100% + 8px)", height: "calc(100% + 8px)", cursor: "pointer", opacity: 0, zIndex: 2 }}
            />
            <div style={{ width: "100%", height: "100%", background: customHex, borderRadius: 9 }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 1 }}>
              <span style={{ fontSize: 14 }}>🎨</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <input
              value={customHex}
              onChange={e => handleCustomInput(e.target.value)}
              placeholder="#c9a84c"
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 9,
                background: "#0d0d14", border: "1px solid #2a2a3a",
                color: "#fff", fontSize: 14, fontFamily: "monospace",
                outline: "none", boxSizing: "border-box",
              }}
            />
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#444", marginTop: 4 }}>Enter any valid hex code</p>
          </div>
        </div>
      </div>

      {/* Palettes */}
      {PALETTES.map(palette => (
        <div key={palette.name}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#666", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>{palette.name}</p>
            <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, background: "#1a1a28", color: "#444", letterSpacing: "0.15em", textTransform: "uppercase" }}>{palette.group}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {palette.colors.map(c => {
              const isSelected = selectedColor === c.hex;
              return (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => { onSelect(c.hex); setCustomHex(c.hex); }}
                  style={{
                    borderRadius: 10, overflow: "hidden",
                    border: isSelected ? `2px solid ${c.hex}` : "1px solid #1e1e2e",
                    cursor: "pointer", background: "transparent", padding: 0,
                    boxShadow: isSelected ? `0 0 16px ${c.hex}55` : "none",
                    transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease",
                    transform: isSelected ? "scale(1.04)" : "scale(1)",
                  }}
                  onMouseEnter={e => { if (!isSelected) (e.currentTarget.style.transform = "scale(1.03)"); }}
                  onMouseLeave={e => { if (!isSelected) (e.currentTarget.style.transform = "scale(1)"); }}
                >
                  {/* Color swatch */}
                  <div style={{ height: 44, background: c.hex, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {isSelected && (
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        background: contrastColor(c.hex) === "#fff" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, color: contrastColor(c.hex) === "#fff" ? "#000" : "#fff",
                      }}>✓</div>
                    )}
                  </div>
                  {/* Label */}
                  <div style={{ padding: "7px 8px", background: "#111118", textAlign: "left" }}>
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#888", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.label}</p>
                    <p style={{ fontFamily: "monospace", fontSize: 9, color: "#444", margin: "1px 0 0" }}>{c.hex.toUpperCase()}</p>
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
