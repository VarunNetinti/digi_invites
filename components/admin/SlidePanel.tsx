"use client";
import { useEffect, useRef } from "react";

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon: string;
  accentColor?: string;
  children: React.ReactNode;
  width?: number;
}

export default function SlidePanel({
  open, onClose, title, subtitle, icon, accentColor = "#c9a84c", children, width = 520,
}: SlidePanelProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
        opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
        transitionProperty: "opacity", transitionDuration: "0.3s", transitionTimingFunction: "ease",
      }} />

      {/* Panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: width,
        maxWidth: "95vw", zIndex: 201,
        background: "linear-gradient(180deg,#0d0d18 0%,#0a0a14 100%)",
        borderLeft: `1px solid ${accentColor}22`,
        boxShadow: `-32px 0 80px rgba(0,0,0,0.8), -1px 0 0 ${accentColor}11`,
        transform: open ? "translateX(0)" : "translateX(105%)",
        transitionProperty: "transform, 1, 0.36, 1)", transitionDuration: "0.4s, 0.3s, 0.3s, 0.3s", transitionTimingFunction: "cubic-bezier(0.22, ease, ease, ease",
        display: "flex", flexDirection: "column",
      }}>
        {/* Top accent bar */}
        <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, flexShrink: 0 }} />

        {/* Header */}
        <div style={{
          padding: "18px 22px", flexShrink: 0,
          borderBottom: `1px solid ${accentColor}14`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(255,255,255,0.018)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12, flexShrink: 0,
              background: `radial-gradient(circle at 30% 30%, ${accentColor}30, ${accentColor}0d)`,
              border: `1px solid ${accentColor}30`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            }}>{icon}</div>
            <div>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", margin: 0 }}>{title}</p>
              {subtitle && <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, color: "#555", marginTop: 2, letterSpacing: "0.2em", textTransform: "uppercase" }}>{subtitle}</p>}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 34, height: 34, borderRadius: 9, border: "1px solid #1e1e2e",
            background: "#111118", color: "#555", cursor: "pointer", fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center", transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease",
          }}
          onMouseEnter={e => { (e.currentTarget.style.background = "#1e1e2e"); (e.currentTarget.style.color = "#fff"); }}
          onMouseLeave={e => { (e.currentTarget.style.background = "#111118"); (e.currentTarget.style.color = "#555"); }}
          >✕</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px", scrollbarWidth: "thin", scrollbarColor: `${accentColor}33 transparent` }}>
          {children}
        </div>
      </div>
    </>
  );
}
