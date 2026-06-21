"use client";

interface BrandFooterProps {
  isPreview?: boolean;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
}

export default function BrandFooter({
  isPreview = false,
  bgColor = "#0a0a14",
  textColor = "rgba(255,255,255,0.45)",
  accentColor = "#c9a84c",
}: BrandFooterProps) {
  const logoSize = isPreview ? 16 : 22;
  const fontSize = isPreview ? 9 : 12;
  const taglineSize = isPreview ? 8 : 10;
  const btnPad = isPreview ? "6px 14px" : "10px 24px";
  const btnFontSize = isPreview ? 8 : 11;

  return (
    <div
      style={{
        background: bgColor,
        padding: isPreview ? "16px 20px" : "28px 40px",
        textAlign: "center",
        borderTop: `1px solid rgba(255,255,255,0.06)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isPreview ? 8 : 14,
      }}
    >
      {/* Brand name */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: logoSize }}>💍</span>
        <span
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: logoSize + 6,
            color: accentColor,
            lineHeight: 1,
          }}
        >
          Digi Invites
        </span>
      </div>

      {/* Tagline */}
      <p
        style={{
          color: textColor,
          fontSize: taglineSize,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          margin: 0,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Beautiful Digital Wedding Invitations
      </p>

      {/* CTA Button → Homepage */}
      <a
        href="/"
        style={{
          display: "inline-block",
          padding: btnPad,
          borderRadius: 99,
          border: `1px solid ${accentColor}`,
          color: accentColor,
          fontSize: btnFontSize,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          textDecoration: "none",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 500,
          transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease",
        }}
      >
        ✦ Create Your Invitation
      </a>

      {/* Copyright */}
      <p
        style={{
          color: textColor,
          fontSize: taglineSize - 1,
          letterSpacing: "0.2em",
          margin: 0,
          fontFamily: "'Montserrat', sans-serif",
          opacity: 0.7,
        }}
      >
        © {new Date().getFullYear()} Digi Invites · All rights reserved
      </p>
    </div>
  );
}
