"use client";
import { Invitation } from "@/lib/types";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";

const EffectRenderer          = dynamic(() => import("@/components/effects/EffectRenderer"), { ssr: false });
const OpeningFormatPreview    = dynamic(() => import("@/components/openings/OpeningFormatPreview"), { ssr: false });

// Dynamic imports for ALL templates — add new ones in templateRegistry.ts only
const templateComponents: Record<string, ReturnType<typeof dynamic>> = {
  template1:  dynamic(() => import("./templates/Template1"),  { ssr: false }),
  template2:  dynamic(() => import("./templates/Template2"),  { ssr: false }),
  template3:  dynamic(() => import("./templates/Template3"),  { ssr: false }),
  template4:  dynamic(() => import("./templates/Template4"),  { ssr: false }),
  template5:  dynamic(() => import("./templates/Template5"),  { ssr: false }),
  template6:  dynamic(() => import("./templates/Template6"),  { ssr: false }),
  template7:  dynamic(() => import("./templates/Template7"),  { ssr: false }),
  template8:  dynamic(() => import("./templates/Template8"),  { ssr: false }),
  template9:  dynamic(() => import("./templates/Template9"),  { ssr: false }),
  template10: dynamic(() => import("./templates/Template10"), { ssr: false }),
  template11: dynamic(() => import("./templates/Template11"), { ssr: false }),
  template12: dynamic(() => import("./templates/Template12"), { ssr: false }),
  template13: dynamic(() => import("./templates/Template13"), { ssr: false }),
  template14: dynamic(() => import("./templates/Template14"), { ssr: false }),
  template15: dynamic(() => import("./templates/Template15"), { ssr: false }),
};

// Build name map from registry — no duplication
const TEMPLATE_NAME_MAP = Object.fromEntries(
  TEMPLATE_REGISTRY.map((t) => [t.id, t.name])
);

interface MobilePreviewProps {
  invitation: Invitation;
}

function TemplateContent({ invitation }: { invitation: Invitation }) {
  const Component = templateComponents[invitation.templateId];

  if (!Component) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, gap: 12, fontFamily: "'Cormorant Garamond',serif" }}>
        <div style={{ fontSize: 48 }}>💍</div>
        <p style={{ color: "#c9a84c", fontSize: 22, fontFamily: "'Great Vibes',cursive" }}>Select a Template</p>
        <p style={{ color: "#666", fontSize: 12, textAlign: "center", padding: "0 32px" }}>
          Choose one of the {TEMPLATE_REGISTRY.length} beautiful templates to see your invitation come alive
        </p>
      </div>
    );
  }

  return <Component invitation={invitation} isPreview />;
}

export default function MobilePreview({ invitation }: MobilePreviewProps) {
  const [, setScrollTop] = useState(0);
  const [showOpening, setShowOpening] = useState(true);
  const hasTemplate   = !!invitation.templateId && !!templateComponents[invitation.templateId];
  const templateName  = TEMPLATE_NAME_MAP[invitation.templateId] || "";
  const openingFormat = invitation.openingFormat || "letter";
  const hasOpening    = openingFormat !== "none";

  // Auto-show opening preview whenever format changes
  useEffect(() => { setShowOpening(true); }, [openingFormat]);

  // Reset to show opening overlay whenever format/template changes
  // (key on the outer div handles this via re-mount not needed —
  //  we just always show it on top; user can dismiss by clicking the X)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      {/* Label row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: hasTemplate ? "#4ade80" : "#666", boxShadow: hasTemplate ? "0 0 8px #4ade80" : "none" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: hasTemplate ? "#4ade80" : "#555", fontFamily: "'Montserrat',sans-serif" }}>
            {hasTemplate ? `Live Preview · ${templateName}` : "Live Preview"}
          </span>
        </div>
        {/* Toggle opening preview */}
        {hasOpening && (
          <button
            type="button"
            onClick={() => setShowOpening(p => !p)}
            style={{ padding: "3px 10px", borderRadius: 8, background: showOpening ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${showOpening ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.1)"}`, cursor: "pointer", fontSize: 9, color: showOpening ? "#c9a84c" : "#555", fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease" }}
          >
            {showOpening ? "👁 Opening" : "📄 Template"}
          </button>
        )}
      </div>

      {/* Phone frame */}
      <div style={{
        width: 280,
        height: 580,
        borderRadius: 40,
        background: "#111",
        boxShadow: "0 0 0 2px #333, 0 0 0 4px #111, 0 32px 64px rgba(0,0,0,0.6), inset 0 0 0 1px #222",
        position: "relative",
        flexShrink: 0,
        overflow: "hidden",
      }}>
        {/* Notch */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 100, height: 28, background: "#111", borderRadius: "0 0 20px 20px", zIndex: 30, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #2a2a2a" }} />
          <div style={{ width: 40, height: 6, borderRadius: 3, background: "#1a1a1a" }} />
        </div>

        {/* Status bar */}
        <div style={{ position: "absolute", top: 8, left: 20, right: 20, display: "flex", justifyContent: "space-between", zIndex: 20, pointerEvents: "none" }}>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif" }}>9:41</span>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[1,2,3,4].map(i => <div key={i} style={{ width: 3, height: 3 + i * 2, background: "rgba(255,255,255,0.5)", borderRadius: 1 }} />)}
            </div>
            <div style={{ width: 14, height: 8, borderRadius: 2, border: "1px solid rgba(255,255,255,0.4)", position: "relative" }}>
              <div style={{ position: "absolute", left: 1, top: 1, bottom: 1, right: 4, background: "rgba(255,255,255,0.5)", borderRadius: 1 }} />
              <div style={{ position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)", width: 3, height: 5, background: "rgba(255,255,255,0.3)", borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{
          position: "absolute",
          inset: 6,
          borderRadius: 34,
          overflow: "hidden",
          background: "#0a0a0a",
        }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "none",
            }}
            className="hide-scrollbar"
            onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
          >
            <div style={{ transformOrigin: "top left", transform: "scale(0.718)", width: "139.3%", minHeight: "100%" }}>
              <TemplateContent invitation={invitation} />
            </div>
          </div>

          {/* Effect overlay — clipped inside the phone screen */}
          {invitation.openingEffect && invitation.openingEffect !== "none" && !showOpening && (
            <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", overflow: "hidden" }}>
              <EffectRenderer
                effect={invitation.openingEffect}
                accentColor={invitation.accentColor || "#c9a84c"}
                isPreview={true}
              />
            </div>
          )}

          {/* Opening format preview — shown on top, toggled by label button */}
          {hasOpening && showOpening && (
            <OpeningFormatPreview
              format={openingFormat}
              brideName={invitation.brideName || "Bride"}
              groomName={invitation.groomName || "Groom"}
              accentColor={invitation.accentColor || "#c9a84c"}
            />
          )}

          {/* Top fade */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 32, background: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)", pointerEvents: "none", zIndex: 30 }} />
          {/* Bottom fade */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 32, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)", pointerEvents: "none", zIndex: 30 }} />
        </div>

        {/* Side buttons */}
        <div style={{ position: "absolute", left: -3, top: 80, width: 3, height: 28, background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 116, width: 3, height: 40, background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 164, width: 3, height: 40, background: "#333", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: -3, top: 100, width: 3, height: 60, background: "#333", borderRadius: "0 2px 2px 0" }} />

        {/* Home indicator */}
        <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", width: 80, height: 4, background: "rgba(255,255,255,0.3)", borderRadius: 2, zIndex: 20 }} />
      </div>

      {/* Hint */}
      <p style={{ fontSize: 10, color: "#444", fontFamily: "'Montserrat',sans-serif", letterSpacing: "0.2em" }}>
        {showOpening && hasOpening ? "👁 Opening preview" : "↕ scroll inside preview"}
      </p>
    </div>
  );
}
