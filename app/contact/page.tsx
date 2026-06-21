"use client";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 10,
    background: "#0a0a14", border: "1px solid rgba(201,168,76,0.15)",
    color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box",
    fontFamily: "'Montserrat',sans-serif", colorScheme: "dark",
  };
  const lbl: React.CSSProperties = {
    display: "block", fontSize: 9, letterSpacing: "0.35em",
    textTransform: "uppercase", color: "#777", marginBottom: 7,
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#060410 0%,#0d0820 60%,#060410 100%)", fontFamily: "'Montserrat',sans-serif", color: "#fff" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 64, background: "rgba(6,4,16,0.9)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="8" fill="rgba(201,168,76,0.12)"/><path d="M14 6L16.5 11.5H22L17.5 15L19.5 21L14 17.5L8.5 21L10.5 15L6 11.5H11.5L14 6Z" fill="#c9a84c"/></svg>
          <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: 24, color: "#c9a84c" }}>Digi Invites</span>
        </Link>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {[["/#how","How It Works"],["/#templates","Templates"],["/#pricing","Pricing"],["/about","About"],["/contact","Contact"]].map(([href, label]) => (
            <a key={href} href={href} style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "130px 40px 48px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 4, marginBottom: 28, background: "rgba(201,168,76,0.04)" }}>
          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#c9a84c", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a84c" }}>Get In Touch</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,6vw,72px)", color: "#fff", margin: "0 0 16px", fontWeight: 400, lineHeight: 1.1 }}>
          Let&apos;s Make Your<br />
          <em style={{ background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Dream Card</em>
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto" }}>
          Drop us your details and we&apos;ll reach out to you shortly to understand your vision and get started.
        </p>
      </section>

      {/* CONTENT */}
      <section style={{ maxWidth: 1060, margin: "0 auto", padding: "0 40px 100px", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 48, alignItems: "start" }}>

        {/* LEFT — Info */}
        <div>
          <div style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 16, padding: "28px 24px", marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "#fff", margin: "0 0 8px", fontWeight: 400 }}>How it works</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.8, marginBottom: 20 }}>Fill the enquiry form → We reach out to you → We design your card → You review → We send you the link.</p>
            {[
              { icon: "📋", step: "1", label: "Submit this form", sub: "Takes less than a minute" },
              { icon: "💬", step: "2", label: "We reach out to you", sub: "WhatsApp or email within 4 hours" },
              { icon: "🎨", step: "3", label: "We design your card", sub: "Ready within 24 hours of briefing" },
              { icon: "🔗", step: "4", label: "We share your link", sub: "Forward to all your guests" },
            ].map(s => (
              <div key={s.step} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <p style={{ color: "#ddd", fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{s.label}</p>
                  <p style={{ color: "#555", fontSize: 11 }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: "📧", label: "Email", value: "hello@digiinvites.in" },
              { icon: "📞", label: "WhatsApp", value: "+91 7337493504" },
              { icon: "🕐", label: "Response Time", value: "Within 4 hours" },
              { icon: "📍", label: "Based in", value: "Pune, Maharashtra, India" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#555", marginBottom: 2 }}>{c.label}</p>
                  <p style={{ color: "#bbb", fontSize: 13 }}>{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 20, padding: "36px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#c9a84c,transparent)" }} />

          {sent ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>💌</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: "#c9a84c", marginBottom: 12, fontWeight: 400 }}>We&apos;ll Be in Touch!</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
                Thank you for reaching out! Our team will contact you on WhatsApp or email shortly to discuss your dream wedding card.
              </p>
              <Link href="/" style={{ padding: "12px 32px", borderRadius: 8, background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", color: "#060410", textDecoration: "none", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Back to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 4 }}>Your Details</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 18, lineHeight: 1.6 }}>
                  Just leave your contact details and a short note — we&apos;ll reach out to you and collect everything else personally.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={lbl}>Your Name *</label>
                    <input style={inp} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Priya Sharma" required />
                  </div>
                  <div>
                    <label style={lbl}>WhatsApp / Phone *</label>
                    <input style={inp} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 7337493504" required />
                  </div>
                </div>
                <div>
                  <label style={lbl}>Email Address</label>
                  <input type="email" style={inp} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="priya@example.com" />
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 18 }}>
                <label style={lbl}>Anything you&apos;d like us to know? (Optional)</label>
                <textarea rows={4} style={{ ...inp, resize: "vertical", lineHeight: 1.7 }} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="e.g. wedding date, preferred style, special requests…" />
              </div>

              <button type="submit" style={{ padding: "15px 32px", borderRadius: 10, background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", color: "#060410", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Montserrat',sans-serif", marginTop: 4 }}>
                ✦ &nbsp; Send Enquiry &nbsp; ✦
              </button>
              <p style={{ color: "#444", fontSize: 11, textAlign: "center", lineHeight: 1.6 }}>We&apos;ll reach out to you shortly · WhatsApp preferred</p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 40px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>© 2025 Digi Invites. All rights reserved.</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4 }}>Developed in collaboration with <span style={{ color: "#c9a84c" }}>AK Tech Dev Solutions</span> &amp; <span style={{ color: "#c9a84c" }}>Morphiq Media</span></p>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.85)} }
      `}</style>
    </div>
  );
}
