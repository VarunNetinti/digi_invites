"use client";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import dynamic from "next/dynamic";
import { Invitation } from "@/lib/types";
import { useState } from "react";

const MobilePreview = dynamic(() => import("@/components/MobilePreview"), { ssr: false });

interface TemplatePanelProps {
  selectedId: string;
  onSelect: (id: string) => void;
  previewInvitation: Invitation;
}

export default function TemplatePanel({ selectedId, onSelect, previewInvitation }: TemplatePanelProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const gold = "#c9a84c";

  const livePreview: Invitation = {
    ...previewInvitation,
    templateId: previewId || selectedId || TEMPLATE_REGISTRY[0].id,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ color: "#555", fontSize: 12, lineHeight: 1.7, margin: 0 }}>
        Hover a template to preview it live. Click to select.
      </p>

      {/* Live mini-preview strip */}
      {(previewId || selectedId) && (
        <div style={{
          borderRadius: 14, overflow: "hidden", border: `1px solid ${gold}22`,
          background: "#080810", padding: "16px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        }}>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: gold, margin: 0 }}>
            {previewId
              ? `Previewing · ${TEMPLATE_REGISTRY.find(t => t.id === previewId)?.name}`
              : `Selected · ${TEMPLATE_REGISTRY.find(t => t.id === selectedId)?.name}`}
          </p>
          <div style={{ transform: "scale(0.68)", transformOrigin: "top center", width: 390, marginBottom: -140 }}>
            <MobilePreview invitation={livePreview} />
          </div>
        </div>
      )}

      {/* Template grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {TEMPLATE_REGISTRY.map((t, i) => {
          const isSelected = selectedId === t.id;
          const isHovered = hoveredId === t.id;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => { onSelect(t.id); setPreviewId(null); }}
              onMouseEnter={() => { setHoveredId(t.id); setPreviewId(t.id); }}
              onMouseLeave={() => { setHoveredId(null); setPreviewId(null); }}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 14,
                alignItems: "center",
                padding: "14px 16px",
                borderRadius: 12,
                background: isSelected
                  ? `linear-gradient(135deg, ${gold}18, ${gold}08)`
                  : isHovered
                  ? "rgba(255,255,255,0.04)"
                  : "#111118",
                border: isSelected
                  ? `1.5px solid ${gold}55`
                  : isHovered
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid #1a1a28",
                cursor: "pointer",
                textAlign: "left",
                transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease",
                transform: isHovered ? "translateX(2px)" : "none",
              }}
            >
              {/* Number + emoji */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, minWidth: 36 }}>
                <span style={{ fontSize: 22 }}>{t.emoji}</span>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, color: "#333", letterSpacing: "0.1em" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Info */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 500, color: isSelected ? gold : "#ddd", margin: 0 }}>
                    {t.name}
                  </p>
                  {isSelected && (
                    <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, background: `${gold}22`, color: gold, letterSpacing: "0.15em", textTransform: "uppercase", border: `1px solid ${gold}33` }}>
                      Selected
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#555", margin: 0 }}>{t.desc}</p>
                {/* Color swatches */}
                <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                  {t.colors.map((c, ci) => (
                    <div key={ci} style={{
                      width: 16, height: 16, borderRadius: "50%", background: c,
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: isHovered || isSelected ? `0 0 6px ${c}66` : "none",
                      transitionProperty: "box-shadow", transitionDuration: "0.2s", transitionTimingFunction: "ease",
                    }} />
                  ))}
                </div>
              </div>

              {/* Tick */}
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: isSelected ? gold : "transparent",
                border: isSelected ? "none" : "1.5px solid #2a2a3a",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, color: "#0a0a0f",
                transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease",
                flexShrink: 0,
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
