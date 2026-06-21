"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Invitation } from "@/lib/types";

const EffectRenderer = dynamic(() => import("@/components/effects/EffectRenderer"), { ssr: false });

// Dynamically load every template — same map as MobilePreview
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

interface WeddingEnvelopeProps {
  brideName: string;
  groomName: string;
  accentColor?: string;
  openingEffect?: string;
  invitation?: Invitation;   // full invitation for template preview inside letter
  onOpen: () => void;
}

export default function WeddingEnvelope({
  brideName, groomName, accentColor = "#c9a84c", openingEffect = "hearts", invitation, onOpen,
}: WeddingEnvelopeProps) {
  const [stage, setStage] = useState<
    "idle" | "opening" | "letterup" | "zoom" | "read" | "done"
  >("idle");

  // Auto-open on mount — splash screen behaviour
  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === "idle") handleOpen();
    }, 1800); // 1.8 s to let fonts/effects load and user see the envelope
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [burstHearts, setBurstHearts] = useState<
    { id: number; x: number; y: number; size: number; color: string; delay: number }[]
  >([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const burstColors = ["#ff6b8a", "#ff4d6d", "#c9184a", "#ff8fa3", accentColor, "#ffb3c1"];

  const handleOpen = () => {
    if (stage !== "idle") return;

    // Stage 1 — flap opens, letter starts to rise
    setStage("opening");

    // Stage 2 — letter fully visible above envelope
    setTimeout(() => setStage("letterup"), 900);

    // Stage 3 — zoom effect: camera flies INTO the letter
    setTimeout(() => {
      setStage("zoom");
      // Burst hearts
      setBurstHearts(
        Array.from({ length: 16 }, (_, i) => ({
          id: i,
          x: 25 + Math.random() * 50,
          y: 25 + Math.random() * 50,
          size: 14 + Math.random() * 22,
          color: burstColors[i % burstColors.length],
          delay: i * 0.04,
        }))
      );
    }, 1400);

    // Stage 4 — "reading" state with letter filling screen
    setTimeout(() => setStage("read"), 2000);

    // Stage 5 — reveal invitation content
    setTimeout(() => {
      setStage("done");
      onOpen();
    }, 3200);
  };

  const isDone = stage === "done";

  // Zoom scale for the letter: starts normal, zooms to fill screen
  const letterScale =
    stage === "zoom" || stage === "read" || stage === "done" ? 12 : 1;
  const letterOpacity = stage === "read" || stage === "done" ? 0 : 1;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background:
          stage === "zoom" || stage === "read"
            ? "transparent"
            : `radial-gradient(ellipse at 50% 40%, #2a0838 0%, #0f0018 55%, #000 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: isDone ? 0 : 1,
        pointerEvents: isDone ? "none" : "all",
        transition:
          stage === "zoom"
            ? "background 0.6s ease 0.3s"
            : isDone
            ? "opacity 0.7s ease 0.1s"
            : "none",
      }}
    >
      {/* ── Starfield — hidden during zoom ── */}
      {stage !== "zoom" && stage !== "read" &&
        Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 1.5 + Math.random() * 2,
              height: 1.5 + Math.random() * 2,
              borderRadius: "50%",
              background: "#fff",
              opacity: 0.2 + Math.random() * 0.5,
              animation: `twinkle ${1.5 + Math.random() * 2}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}

      {/* ── Selected opening effect behind the envelope ── */}
      {stage !== "zoom" && stage !== "read" && openingEffect !== "none" && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <EffectRenderer effect={openingEffect} accentColor={accentColor} />
        </div>
      )}

      {/* ── Heart burst on zoom ── */}
      {stage === "zoom" &&
        burstHearts.map(h => (
          <div
            key={h.id}
            style={{
              position: "absolute",
              left: `${h.x}%`,
              top: `${h.y}%`,
              fontSize: h.size,
              animation: `heart-burst 0.9s ease ${h.delay}s forwards`,
              pointerEvents: "none",
              color: h.color,
            }}
          >
            ♥
          </div>
        ))}

      {/* ── From line — top of screen ── */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 36,
          opacity: stage === "idle" ? 1 : 0,
          transitionProperty: "opacity", transitionDuration: "0.4s", transitionTimingFunction: "ease",
          animation: stage === "idle" ? "fade-up 1s ease 0.4s both" : "none",
        }}
      >
        <p
          style={{
            fontFamily: "'Lato',sans-serif",
            fontSize: 10,
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "rgba(232,213,163,0.55)",
            marginBottom: 10,
          }}
        >
          A wedding letter from
        </p>
        <p
          style={{
            fontFamily: "'Great Vibes',cursive",
            fontSize: 40,
            lineHeight: 1.1,
            color: accentColor,
            textShadow: `0 0 40px ${accentColor}55`,
            animation: "glow-pulse 2.5s ease-in-out infinite",
          }}
        >
          {brideName || "Bride"} &amp; {groomName || "Groom"}
        </p>
      </div>

      {/* ══════════════════════════════════════════════
          ENVELOPE — the whole letter-zoom pivot point
      ══════════════════════════════════════════════ */}
      <div
        onClick={() => { if (stage === "idle") handleOpen(); }}
        style={{
          position: "relative",
          width: 320,
          height: 220,
          perspective: "1000px",
          cursor: stage === "idle" ? "pointer" : "default",
          /* The zoom: scale up dramatically so the letter fills viewport */
          transform:
            stage === "zoom" || stage === "read" || stage === "done"
              ? `scale(${letterScale})`
              : stage === "letterup"
              ? "scale(1)"
              : "scale(1)",
          transition:
            stage === "zoom"
              ? "transform 0.7s cubic-bezier(0.4,0,0.2,1)"
              : "none",
          opacity: letterOpacity,
          /* opacity transition after zoom fills screen */
          transitionProperty: stage === "read" ? "opacity" : "transform",
          transitionDuration: stage === "read" ? "0.3s" : "0.7s",
          animation:
            stage === "idle"
              ? "float 3s ease-in-out infinite"
              : "none",
        }}
      >
        {/* ══════════════════════════════════════════════════════
            LETTER POUCH  — a clean rectangular sleeve/pocket
            The letter sits inside and slides out upward on open
        ══════════════════════════════════════════════════════ */}

        <style>{`
          @keyframes letter-slide-up {
            0%   { transform: translateY(0%);    opacity: 1; }
            60%  { transform: translateY(-52%);  opacity: 1; }
            100% { transform: translateY(-52%);  opacity: 1; }
          }
          @keyframes letter-fly-up {
            0%   { transform: translateY(-52%);  opacity: 1; }
            80%  { transform: translateY(-320%); opacity: 1; }
            100% { transform: translateY(-320%); opacity: 0; }
          }
          @keyframes pouch-lid-open {
            0%   { transform: scaleY(1);   transform-origin: top center; }
            100% { transform: scaleY(0);   transform-origin: top center; }
          }
          @keyframes ribbon-snap {
            0%   { transform: scaleX(1) rotate(0deg); opacity: 1; }
            40%  { transform: scaleX(1.2) rotate(-3deg); opacity: 0.6; }
            100% { transform: scaleX(0) rotate(5deg);  opacity: 0; }
          }
        `}</style>

        {/* ── POUCH BODY — the sleeve/pocket ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: 14,
          background: "linear-gradient(160deg, #f5e8c4 0%, #e8d08c 40%, #c9a840 70%, #b8922e 100%)",
          boxShadow: [
            "0 28px 70px rgba(0,0,0,0.7)",
            "0 0 0 1.5px rgba(201,168,76,0.6)",
            "inset 0 1px 0 rgba(255,255,255,0.55)",
            "inset 0 -2px 6px rgba(0,0,0,0.2)",
          ].join(", "),
        }}>
          {/* Texture overlay */}
          <div style={{ position:"absolute", inset:0, borderRadius:14, opacity:0.06,
            backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.5) 3px,rgba(0,0,0,0.5) 4px)",
          }}/>

          {/* Top opening rim — the mouth of the pouch */}
          <div style={{
            position:"absolute", top:0, left:0, right:0, height:18,
            borderRadius:"14px 14px 0 0",
            background:"linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,248,220,0.2))",
            borderBottom:"1.5px solid rgba(201,168,76,0.55)",
          }}/>

          {/* Inner shadow — depth of the pocket */}
          <div style={{
            position:"absolute", top:18, left:0, right:0, height:40,
            background:"linear-gradient(to bottom, rgba(0,0,0,0.18), transparent)",
            pointerEvents:"none",
          }}/>

          {/* Side seam lines — left */}
          <div style={{
            position:"absolute", left:14, top:18, bottom:14,
            width:2, borderRadius:1,
            background:"linear-gradient(to bottom, rgba(0,0,0,0.12), transparent 80%)",
          }}/>
          {/* Side seam lines — right */}
          <div style={{
            position:"absolute", right:14, top:18, bottom:14,
            width:2, borderRadius:1,
            background:"linear-gradient(to bottom, rgba(0,0,0,0.12), transparent 80%)",
          }}/>

          {/* Bottom edge */}
          <div style={{
            position:"absolute", bottom:0, left:0, right:0, height:14,
            borderRadius:"0 0 14px 14px",
            background:"linear-gradient(to top, rgba(0,0,0,0.25), transparent)",
          }}/>

          {/* Gold ribbon / seal across the mouth — snaps off on open */}
          {(stage === "idle" || stage === "opening") && (
            <div style={{
              position:"absolute", top:10, left:"8%", right:"8%", height:8,
              background:`linear-gradient(90deg,transparent,${accentColor},${accentColor}cc,${accentColor},transparent)`,
              borderRadius:4,
              boxShadow:`0 0 12px ${accentColor}99, 0 2px 4px rgba(0,0,0,0.3)`,
              animation: stage === "opening" ? "ribbon-snap 0.4s ease forwards" : "none",
              zIndex:20,
            }}>
              {/* Wax seal dot in centre */}
              <div style={{
                position:"absolute", left:"50%", top:"50%",
                transform:"translate(-50%,-50%)",
                width:22, height:22, borderRadius:"50%",
                background:"radial-gradient(circle at 35% 35%, #e83a5a, #8b1a2a)",
                boxShadow:`0 2px 8px rgba(0,0,0,0.5), 0 0 0 1.5px ${accentColor}88`,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <span style={{
                  fontFamily:"'Great Vibes',cursive", fontSize:8,
                  color:"rgba(255,255,255,0.9)", lineHeight:1,
                }}>
                  {(brideName?.[0]||"B")}
                </span>
              </div>
            </div>
          )}

          {/* Accent corner dots */}
          {[{l:"12px",t:"auto",b:"16px"},{r:"12px",t:"auto",b:"16px"}].map((pos,i)=>(
            <div key={i} style={{
              position:"absolute", ...pos,
              width:18, height:18,
              color:`${accentColor}99`, fontSize:14,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>✦</div>
          ))}
        </div>

        {/* ── LETTER — sits inside the pouch, slides up on open ── */}
        <div style={{
          /* Clip container — only shows what's inside the pouch mouth */
          position:"absolute",
          left:"10%", right:"10%",
          top:20,          /* top of pocket opening */
          bottom:12,
          overflow: stage === "idle" || stage === "opening" ? "hidden" : "visible",
          zIndex:15,
          pointerEvents:"none",
        }}>
          <div style={{
            position:"absolute",
            left:0, right:0,
            bottom:0,
            height:"220%",   /* letter is twice the pouch height so it fully fills when peeked */
            borderRadius:8,
            background:"linear-gradient(160deg, #0f0820 0%, #1a0f35 40%, #0a0520 100%)",
            boxShadow:[
              "0 -12px 40px rgba(0,0,0,0.6)",
              `0 0 0 1px ${accentColor}44`,
              `inset 0 1px 0 ${accentColor}33`,
            ].join(", "),
            overflow:"hidden",
            /* Animation */
            animation:
              stage === "opening"
                ? "letter-slide-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards"
                : stage === "letterup" || stage === "zoom" || stage === "read"
                ? "letter-fly-up 0.7s cubic-bezier(0.4,0,0.2,1) forwards"
                : "none",
          }}>
            {/* Letter content preview */}
            <div style={{ padding:"22px 18px", display:"flex", flexDirection:"column", alignItems:"center", gap:10, height:"46%" }}>
              {/* Decorative ring */}
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                <div style={{ height:1, width:28, background:`linear-gradient(90deg,transparent,${accentColor}66)` }}/>
                <span style={{ fontSize:10, color:`${accentColor}88` }}>✦ ❧ ✦</span>
                <div style={{ height:1, width:28, background:`linear-gradient(90deg,${accentColor}66,transparent)` }}/>
              </div>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:7, letterSpacing:"0.45em",
                textTransform:"uppercase", color:`${accentColor}88`, textAlign:"center" }}>
                Together with their families
              </p>
              <p style={{ fontFamily:"'Great Vibes',cursive", fontSize: 38,
                color:accentColor, lineHeight:1, textAlign:"center",
                textShadow:`0 0 20px ${accentColor}55` }}>
                {brideName || "Bride"}
              </p>
              <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:18,
                color:`${accentColor}88`, lineHeight:1 }}>&amp;</p>
              <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:38,
                color:accentColor, lineHeight:1, textAlign:"center",
                textShadow:`0 0 20px ${accentColor}55` }}>
                {groomName || "Groom"}
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ height:1, width:28, background:`linear-gradient(90deg,transparent,${accentColor}44)` }}/>
                <span style={{ fontSize:8, color:`${accentColor}55` }}>✦</span>
                <div style={{ height:1, width:28, background:`linear-gradient(90deg,${accentColor}44,transparent)` }}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Auto-opening hint ── */}
      <div
        style={{
          marginTop: 38,
          textAlign: "center",
          opacity: stage === "idle" ? 1 : 0,
          transitionProperty: "opacity", transitionDuration: "0.3s", transitionTimingFunction: "ease",
          animation: stage === "idle" ? "fade-up 1s ease 1.3s both" : "none",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 46, height: 46, borderRadius: "50%",
            border: `1.5px solid ${accentColor}55`,
            margin: "0 auto 10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "heart-pulse 1.8s ease-in-out infinite",
          }}
        >
          <span style={{ fontSize: 20 }}>💌</span>
        </div>
        <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, letterSpacing: "0.45em",
          textTransform: "uppercase", color: "rgba(232,213,163,0.65)" }}>
          Opening for you…
        </p>
      </div>

      {/* ── Zoom-through transition: template fills screen during zoom ── */}
      {(stage === "zoom" || stage === "read") && invitation && templateComponents[invitation.templateId] && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1,
          overflow: "hidden",
          opacity: stage === "read" ? 0 : 1,
          transition: stage === "read" ? "opacity 0.4s ease" : "none",
        }}>
          {/* Actual template rendered full-width — blurs in as zoom completes */}
          <div style={{
            transformOrigin: "bottom center",
            animation: stage === "zoom" ? "zoom-reveal-in 0.7s cubic-bezier(0.22,1,0.36,1) reverse" : "none",
            filter: stage === "zoom" ? "blur(0px)" : "none",
          }}>
            {(() => {
              const Tmpl = templateComponents[invitation.templateId];
              return <Tmpl invitation={invitation} />;
            })()}
          </div>
          {/* Vignette overlay so the transition is smooth */}
          <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 50% 30%, transparent 40%, rgba(0,0,0,0.15) 100%)`, pointerEvents:"none" }} />
        </div>
      )}

      {/* ── Fallback reading overlay (no template selected) ── */}
      {(stage === "zoom" || stage === "read") && (!invitation || !templateComponents[invitation?.templateId]) && (
        <div style={{ position:"fixed", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", pointerEvents:"none", zIndex:1 }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(232,213,163,0.25) 100%)", pointerEvents:"none" }} />
          <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:"clamp(36px,8vw,72px)", color:accentColor, textShadow:`0 0 60px ${accentColor}55`, animation:"glow-pulse 2s ease-in-out infinite, fade-in 0.5s ease both", textAlign:"center", lineHeight:1.2 }}>
            {brideName || "Bride"} &amp; {groomName || "Groom"}
          </p>
          <p style={{ fontFamily:"'Lato',sans-serif", fontSize:"clamp(9px,2vw,13px)", letterSpacing:"0.5em", textTransform:"uppercase", color:`${accentColor}99`, marginTop:16, animation:"fade-up 0.6s ease 0.3s both" }}>
            Wedding Invitation
          </p>
        </div>
      )}
    </div>
  );
}
