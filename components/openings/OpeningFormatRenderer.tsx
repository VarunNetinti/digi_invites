"use client";
import WeddingEnvelope    from "@/components/WeddingEnvelope";
import ScrollOpening      from "./ScrollOpening";
import CurtainOpening     from "./CurtainOpening";
import BookOpening        from "./BookOpening";
import GateOpening        from "./GateOpening";
import CinematicOpening   from "./CinematicOpening";
import TypewriterOpening  from "./TypewriterOpening";
import ZoomRevealOpening  from "./ZoomRevealOpening";
import RiseUpOpening      from "./RiseUpOpening";
import { Invitation }     from "@/lib/types";

interface Props {
  format: string;
  brideName: string;
  groomName: string;
  accentColor: string;
  openingEffect: string;
  invitation?: Invitation;
  onOpen: () => void;
}

export default function OpeningFormatRenderer({ format, brideName, groomName, accentColor, openingEffect, invitation, onOpen }: Props) {
  const common = { brideName, groomName, accentColor, onOpen };

  switch (format) {
    case "scroll":      return <ScrollOpening     {...common} />;
    case "curtain":     return <CurtainOpening    {...common} />;
    case "book":        return <BookOpening       {...common} />;
    case "gate":        return <GateOpening       {...common} />;
    case "cinematic":   return <CinematicOpening  {...common} />;
    case "typewriter":  return <TypewriterOpening {...common} />;
    case "zoom-reveal": return <ZoomRevealOpening {...common} />;
    case "rise-up":     return <RiseUpOpening     {...common} />;
    case "letter":
    default:
      return (
        <WeddingEnvelope
          brideName={brideName}
          groomName={groomName}
          accentColor={accentColor}
          openingEffect={openingEffect}
          invitation={invitation}
          onOpen={onOpen}
        />
      );
  }
}
