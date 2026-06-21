import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0d0820 0%, #1a0a2e 60%, #1a1a2e 100%)", fontFamily: "'Montserrat',sans-serif", color: "#fff" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px", background: "rgba(13,8,32,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{ fontSize: 22 }}>💍</span>
          <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: 26, color: "#c9a84c" }}>Digi Invites</span>
        </Link>
        <div style={{ display: "flex", gap: 24 }}>
          {[{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }, { href: "/privacy", label: "Privacy" }].map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "#aaa", textDecoration: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>{l.label}</Link>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "140px 40px 60px", textAlign: "center" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(52px,8vw,80px)", color: "#fff", margin: "0 0 20px" }}>Privacy Policy</h1>
        <p style={{ color: "#666", fontSize: 13 }}>Last updated: January 1, 2025</p>
      </section>

      {/* CONTENT */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px 100px" }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "48px 44px" }}>

          {[
            {
              title: "1. Information We Collect",
              body: `When you use Digi Invites, we collect information you provide directly, including the names of the bride and groom, wedding details (date, time, venue), family member information, love story text, RSVP contact details, and photos you upload. We also collect standard usage data such as IP address, browser type, and pages visited.`,
            },
            {
              title: "2. How We Use Your Information",
              body: `We use the information you provide solely to create and display your digital wedding invitation at its unique URL. We do not use your personal data for advertising, and we do not sell or share your data with third parties except as required by law or to operate our core services (such as file storage providers).`,
            },
            {
              title: "3. Data Storage & Security",
              body: `Invitation data is stored on secure servers. Uploaded photos are stored using encrypted cloud storage. We take reasonable technical and organisational measures to protect your information from unauthorised access, loss, or misuse. However, no internet transmission is 100% secure.`,
            },
            {
              title: "4. Cookies",
              body: `We use strictly necessary cookies to operate the platform (e.g., session management). We do not use advertising cookies or third-party tracking cookies. You can disable cookies in your browser settings, though this may affect platform functionality.`,
            },
            {
              title: "5. Sharing Your Invitation",
              body: `Your invitation is accessible via a unique URL. Anyone who has that URL can view the invitation. You are responsible for sharing your invitation link only with people you wish to invite. We recommend not posting the link publicly if you prefer to keep your event private.`,
            },
            {
              title: "6. Data Retention",
              body: `Invitation data is retained for a period of 2 years from the date of creation. After this period, we may delete the invitation and associated photos. If you wish to request deletion of your data before this period, please contact us at hello@digiinvites.in.`,
            },
            {
              title: "7. Children's Privacy",
              body: `Our services are not directed at children under 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a child, please contact us and we will delete it promptly.`,
            },
            {
              title: "8. Your Rights",
              body: `You have the right to access, correct, or request deletion of your personal data. To exercise any of these rights, please contact us at hello@digiinvites.in. We will respond within 30 days.`,
            },
            {
              title: "9. Changes to This Policy",
              body: `We may update this Privacy Policy from time to time. The updated version will be indicated by a revised "Last updated" date at the top of this page. We encourage you to review this policy periodically.`,
            },
            {
              title: "10. Contact Us",
              body: `If you have any questions about this Privacy Policy, please contact us at:\n\nDigi Invites\nEmail: hello@digiinvites.in\nPhone: +91 7337493504\nPune, Maharashtra, India`,
            },
          ].map((section) => (
            <div key={section.title} style={{ marginBottom: 36 }}>
              <h2 style={{ color: "#c9a84c", fontSize: 15, fontWeight: 600, letterSpacing: "0.05em", marginBottom: 12 }}>{section.title}</h2>
              <p style={{ color: "#999", fontSize: 14, lineHeight: 1.9, whiteSpace: "pre-line" }}>{section.body}</p>
            </div>
          ))}

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 32, marginTop: 8 }}>
            <p style={{ color: "#555", fontSize: 12, textAlign: "center", marginBottom: 24 }}>
              For general inquiries, visit our <Link href="/contact" style={{ color: "#c9a84c", textDecoration: "none" }}>Contact page</Link>.
            </p>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 40px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>© 2025 Digi Invites. All rights reserved.</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4 }}>Developed in collaboration with <span style={{ color: "#c9a84c" }}>AK Tech Dev Solutions</span> &amp; <span style={{ color: "#c9a84c" }}>Morphiq Media</span></p>
      </footer>
    </div>
  );
}
