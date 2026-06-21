"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Invitation } from "@/lib/types";

const OpeningFormatRenderer = dynamic(() => import("@/components/openings/OpeningFormatRenderer"), { ssr: false });
const EffectRenderer         = dynamic(() => import("@/components/effects/EffectRenderer"), { ssr: false });

interface InvitationWrapperProps {
  invitation: Invitation;
  children: React.ReactNode;
}

export default function InvitationWrapper({ invitation, children }: InvitationWrapperProps) {
  const [showContent, setShowContent]   = useState(false);
  const [fullyVisible, setFullyVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const accentColor    = invitation.accentColor    || "#c9a84c";
  const openingEffect  = invitation.openingEffect  || "hearts";
  const openingFormat  = invitation.openingFormat  || "letter";

  const handleOpen = () => {
    setTimeout(() => setShowContent(true), 100);
    setTimeout(() => setFullyVisible(true), 600);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 700);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Opening format intro */}
      {!fullyVisible && (
        <OpeningFormatRenderer
          format={openingFormat}
          brideName={invitation.brideName}
          groomName={invitation.groomName}
          accentColor={accentColor}
          openingEffect={openingEffect}
          invitation={invitation}
          onOpen={handleOpen}
        />
      )}

      {/* Persistent ambient effect */}
      {fullyVisible && openingEffect !== "none" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, pointerEvents: "none" }}>
          <EffectRenderer effect={openingEffect} accentColor={accentColor} />
        </div>
      )}

      {/* Invitation content */}
      <div
        ref={contentRef}
        style={{
          opacity: fullyVisible ? 1 : 0,
          transform: fullyVisible ? "scale(1)" : "scale(1.08)",
          transitionProperty: fullyVisible ? "opacity, transform" : "none",
          transitionDuration: fullyVisible ? "1.1s, 1.3s" : "0s",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
          transformOrigin: "top center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
