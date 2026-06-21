import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0d0820 0%, #1a0a2e 60%, #1a1a2e 100%)", fontFamily: "'Montserrat',sans-serif", color: "#fff" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px", background: "rgba(13,8,32,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{ fontSize: 22 }}>💍</span>
          <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: 26, color: "#c9a84c" }}>Digi Invites</span>
        </Link>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "#aaa", textDecoration: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>{l.label}</Link>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 60, textAlign: "center", padding: "140px 40px 80px" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>Who We Are</p>
        <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(52px,8vw,88px)", color: "#fff", margin: "0 0 20px", lineHeight: 1.1 }}>About Us</h1>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#888", maxWidth: 560, margin: "0 auto" }}>
          We believe every love story deserves to be shared beautifully.
        </p>
      </section>

      {/* STORY */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px 80px" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 24, padding: "48px 40px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, color: "#c9a84c", marginBottom: 24, fontWeight: 400 }}>Our Story</h2>
          <p style={{ color: "#aaa", fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
            Digi Invites was born out of a simple frustration — wedding invitations were expensive to print, slow to send, and impossible to update. We saw couples spending thousands on paper cards that guests often misplaced before the big day.
          </p>
          <p style={{ color: "#aaa", fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
            We built Digi Invites to change that. Our platform lets couples create stunning digital invitations in minutes, share them instantly, and reach every guest with a single link — no envelopes, no postage, no stress.
          </p>
          <p style={{ color: "#aaa", fontSize: 16, lineHeight: 1.9 }}>
            Based in India and designed with Indian weddings in mind, our templates celebrate the richness, colour, and emotion that make every wedding unique. Whether you&apos;re planning a grand celebration or an intimate ceremony, we have the perfect canvas for your story.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "0 40px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a84c", textAlign: "center", marginBottom: 12 }}>What We Stand For</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, textAlign: "center", color: "#fff", margin: "0 0 48px", fontWeight: 400 }}>Our Values</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {[
            { icon: "💛", title: "Made with Love", desc: "Every feature we build is crafted with the couple's experience at the centre." },
            { icon: "🌿", title: "Sustainability", desc: "Digital-first means zero paper waste. We're proud to be an eco-friendly alternative." },
            { icon: "⚡", title: "Simplicity", desc: "Creating a beautiful invitation should take minutes, not days. We keep it effortless." },
            { icon: "🔒", title: "Privacy First", desc: "Your personal information and your guests' data are always kept private and secure." },
          ].map((v) => (
            <div key={v.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{v.icon}</div>
              <h3 style={{ color: "#ddd", fontSize: 16, marginBottom: 10, fontWeight: 500 }}>{v.title}</h3>
              <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 40px 80px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, color: "#fff", marginBottom: 16, fontWeight: 400 }}>Ready to Create Yours?</h2>
        <Link href="/contact" style={{ padding: "14px 36px", borderRadius: 50, background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", color: "#0d0820", textDecoration: "none", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>
          Get Started
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 40px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>© 2025 Digi Invites. All rights reserved.</p>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 12 }}>
          {[{ href: "/privacy", label: "Privacy Policy" }, { href: "/contact", label: "Contact" }].map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "#555", textDecoration: "none", fontSize: 12 }}>{l.label}</Link>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4 }}>Developed in collaboration with <span style={{ color: "#c9a84c" }}>AK Tech Dev Solutions</span> &amp; <span style={{ color: "#c9a84c" }}>Morphiq Media</span></p>
      </footer>
    </div>
  );
}
