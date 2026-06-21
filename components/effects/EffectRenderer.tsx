"use client";
import HeartsEffect      from "./HeartsEffect";
import BirdsEffect       from "./BirdsEffect";
import ParrotsEffect     from "./ParrotsEffect";
import ButterfliesEffect from "./ButterfliesEffect";
import StarsEffect       from "./StarsEffect";
import RosePetalsEffect  from "./RosePetalsEffect";
import ConfettiEffect    from "./ConfettiEffect";
import FirefliesEffect   from "./FirefliesEffect";
import GoldDustEffect    from "./GoldDustEffect";
import SakuraEffect      from "./SakuraEffect";
import FireworksEffect   from "./FireworksEffect";

interface EffectRendererProps {
  effect: string;
  accentColor?: string;
  isPreview?: boolean;
}

export default function EffectRenderer({ effect, accentColor = "#c9a84c", isPreview = false }: EffectRendererProps) {
  const p = { accentColor, isPreview };
  switch (effect) {
    case "hearts":          return <HeartsEffect {...p} />;
    case "birds":           return <BirdsEffect {...p} />;
    case "parrots":         return <ParrotsEffect {...p} />;
    case "butterflies":     return <ButterfliesEffect {...p} />;
    case "stars":           return <StarsEffect {...p} />;
    case "rose-petals":     return <RosePetalsEffect {...p} />;
    case "confetti":        return <ConfettiEffect {...p} />;
    case "fireflies":       return <FirefliesEffect {...p} />;
    case "gold-dust":       return <GoldDustEffect {...p} />;
    case "sakura":          return <SakuraEffect {...p} />;
    case "fireworks":       return <FireworksEffect {...p} />;
    case "hearts+birds":    return <><HeartsEffect {...p} density={10} /><BirdsEffect {...p} density={4} /></>;
    case "hearts+parrots":  return <><HeartsEffect {...p} density={10} /><ParrotsEffect {...p} density={3} /></>;
    case "sakura+fireflies":return <><SakuraEffect {...p} density={12} /><FirefliesEffect {...p} density={12} /></>;
    case "fireworks+hearts":return <><FireworksEffect {...p} density={4} /><HeartsEffect {...p} density={10} /></>;
    case "none": return null;
    default:     return <HeartsEffect {...p} />;
  }
}
