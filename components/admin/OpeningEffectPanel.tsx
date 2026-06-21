"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Lazy-load effects so they don't bundle in SSR
const EffectRenderer = dynamic(() => import("@/components/effects/EffectRenderer"), { ssr: false });

interface OpeningEffectPanelProps {
  selectedEffect: string;
  onSelect: (effect: string) => void;
  accentColor?: string;
}

const EFFECTS = [
  {
    id: "hearts",
    name: "Floating Hearts",
    desc: "Colourful hearts rise gently from the bottom",
    icon: "♥",
    iconColor: "#ff6b8a",
    preview: "hearts continuously floating upward",
    tags: ["romantic", "classic"],
  },
  {
    id: "birds",
    name: "Flying Birds",
    desc: "Small M-shape birds glide across the screen",
    icon: "🐦",
    iconColor: "#555",
    preview: "birds flying left to right",
    tags: ["nature", "elegant"],
  },
  {
    id: "parrots",
    name: "Colourful Parrots",
    desc: "Vibrant tropical parrots fly across",
    icon: "🦜",
    iconColor: "#22c55e",
    preview: "parrots with flapping wings",
    tags: ["tropical", "festive", "vibrant"],
  },
  {
    id: "butterflies",
    name: "Butterflies",
    desc: "Delicate butterflies flutter across the page",
    icon: "🦋",
    iconColor: "#8b5cf6",
    preview: "butterflies with animated wings",
    tags: ["delicate", "nature"],
  },
  {
    id: "stars",
    name: "Rising Stars",
    desc: "Gold and silver stars float upward",
    icon: "✦",
    iconColor: "#f9c74f",
    preview: "stars and sparkles drifting up",
    tags: ["sparkle", "elegant", "night"],
  },
  {
    id: "rose-petals",
    name: "Rose Petals",
    desc: "Flower petals and blossoms fall gently",
    icon: "🌸",
    iconColor: "#f472b6",
    preview: "petals floating down from top",
    tags: ["romantic", "floral"],
  },
  {
    id: "confetti",
    name: "Confetti",
    desc: "Colourful celebration confetti rains down",
    icon: "🎊",
    iconColor: "#fbbf24",
    preview: "confetti pieces falling and spinning",
    tags: ["festive", "celebration", "fun"],
  },
  {
    id: "hearts+birds",
    name: "Hearts & Birds",
    desc: "Hearts floating up + birds flying across",
    icon: "♥🐦",
    iconColor: "#ff6b8a",
    preview: "combined hearts and birds",
    tags: ["combo", "romantic"],
  },
  {
    id: "hearts+parrots",
    name: "Hearts & Parrots",
    desc: "Hearts floating up + parrots flying through",
    icon: "♥🦜",
    iconColor: "#22c55e",
    preview: "combined hearts and parrots",
    tags: ["combo", "tropical", "festive"],
  },
  {
    id: "none",
    name: "No Effect",
    desc: "Clean opening — no background animation",
    icon: "○",
    iconColor: "#444",
    preview: "plain dark background",
    tags: ["minimal"],
  }
];

export default function OpeningEffectPanel({ selectedEffect, onSelect, accentColor = "#c9a84c" }: OpeningEffectPanelProps) {
  const [livePreview, setLivePreview] = useState<string | null>(null);
  const [previewActive, setPreviewActive] = useState(false);

  // Auto-dismiss preview after 4s
  useEffect(() => {
    if (!previewActive) return;
    const t = setTimeout(() => setPreviewActive(false), 4000);
    return () => clearTimeout(t);
  }, [previewActive, livePreview]);

  const activeEffect = livePreview && previewActive ? livePreview : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      <p style={{ color: "#555", fontSize: 12, lineHeight: 1.7, margin: 0 }}>
        Choose what plays behind the envelope when guests open the invitation. Hover to preview live for 4 seconds.
      </p>

      {/* Live preview window */}
      <div style={{
        position: "relative", height: 160, borderRadius: 14, overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 40%, #2a0838 0%, #0f0018 55%, #000 100%)",
        border: `1px solid ${accentColor}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Starfield bg */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            width: 2, height: 2, borderRadius: "50%", background: "#fff",
            opacity: 0.2 + Math.random() * 0.4,
            animation: `twinkle ${1.5 + Math.random() * 2}s ease-in-out ${Math.random() * 3}s infinite`,
          }} />
        ))}

        {/* Live effect inside window */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {activeEffect && <EffectRenderer effect={activeEffect} accentColor={accentColor} />}
        </div>

        {/* Label */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", pointerEvents: "none" }}>
          {activeEffect ? (
            <>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: accentColor, marginBottom: 4 }}>
                Live Preview
              </p>
              <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 26, color: accentColor, textShadow: `0 0 20px ${accentColor}66` }}>
                {EFFECTS.find(e => e.id === activeEffect)?.name}
              </p>
            </>
          ) : (
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#444", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Hover an effect to preview
            </p>
          )}
        </div>
      </div>

      {/* Effect cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {EFFECTS.map(effect => {
          const isSelected = selectedEffect === effect.id;

          return (
            <button
              key={effect.id}
              type="button"
              onClick={() => onSelect(effect.id)}
              onMouseEnter={() => { setLivePreview(effect.id); setPreviewActive(true); }}
              onMouseLeave={() => setPreviewActive(false)}
              style={{
                display: "grid", gridTemplateColumns: "52px 1fr auto",
                alignItems: "center", gap: 14, padding: "14px 16px",
                borderRadius: 12, cursor: "pointer", textAlign: "left",
                background: isSelected
                  ? `linear-gradient(135deg,${accentColor}18,${accentColor}08)`
                  : "#111118",
                border: isSelected ? `1.5px solid ${accentColor}55` : "1px solid #1a1a28",
                transitionProperty: "all", transitionDuration: "0.18s", transitionTimingFunction: "ease",
                boxShadow: isSelected ? `0 4px 20px ${accentColor}18` : "none",
              }}
              onFocus={e => { if (!isSelected) (e.currentTarget.style.borderColor = "#2a2a3a"); }}
              onBlur={e => { if (!isSelected) (e.currentTarget.style.borderColor = "#1a1a28"); }}
            >
              {/* Icon circle */}
              <div style={{
                width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                background: isSelected
                  ? `radial-gradient(circle at 30% 30%, ${effect.iconColor}44, ${effect.iconColor}11)`
                  : "rgba(255,255,255,0.03)",
                border: isSelected ? `1px solid ${effect.iconColor}44` : "1px solid #1e1e2e",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, color: effect.iconColor,
                transitionProperty: "all", transitionDuration: "0.18s", transitionTimingFunction: "ease",
              }}>
                {effect.icon}
              </div>

              {/* Text */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <p style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 500,
                    color: isSelected ? accentColor : "#ccc", margin: 0,
                  }}>{effect.name}</p>
                  {isSelected && (
                    <span style={{
                      fontSize: 9, padding: "2px 7px", borderRadius: 4,
                      background: `${accentColor}22`, color: accentColor,
                      letterSpacing: "0.15em", textTransform: "uppercase",
                      border: `1px solid ${accentColor}33`,
                    }}>Active</span>
                  )}
                </div>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#555", margin: "0 0 6px" }}>
                  {effect.desc}
                </p>
                {/* Tags */}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {effect.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 9, padding: "1px 6px", borderRadius: 4,
                      background: "#0d0d14", color: "#3a3a4a",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      border: "1px solid #1a1a28",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Checkmark */}
              <div style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                background: isSelected ? accentColor : "transparent",
                border: isSelected ? "none" : "1.5px solid #2a2a3a",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, color: "#0a0a0f", transitionProperty: "all", transitionDuration: "0.18s", transitionTimingFunction: "ease",
              }}>
                {isSelected && "✓"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
