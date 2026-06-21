"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a brief delay for UX feel
    setTimeout(() => {
      if (userId === "varunnlv" && password === "2711999@vV") {
        // Store auth token in sessionStorage
        sessionStorage.setItem("admin_auth", "authenticated");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password. Please try again.");
        setLoading(false);
      }
    }, 600);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    background: "#0a0a14",
    border: "1px solid rgba(201,168,76,0.2)",
    color: "#fff",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Montserrat',sans-serif",
    transitionProperty: "border-color", transitionDuration: "0.2s", transitionTimingFunction: "ease",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0d0820 0%, #1a0a2e 50%, #0d1a2e 100%)",
        fontFamily: "'Montserrat',sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative orbs */}
      <div style={{ position: "absolute", top: "15%", left: "10%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(193,123,123,0.06), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 440, padding: "0 24px", position: "relative", zIndex: 2 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 24 }}>💍</span>
            <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: 30, color: "#c9a84c" }}>Digi Invites</span>
          </Link>
          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.3)", margin: "12px auto 16px" }} />
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "#666" }}>Admin Access</p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 24,
            padding: "40px 36px",
          }}
        >
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 500, textAlign: "center", marginBottom: 8 }}>Welcome Back</h1>
          <p style={{ color: "#666", fontSize: 13, textAlign: "center", marginBottom: 32 }}>Sign in to manage invitations</p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* User ID */}
            <div>
              <label style={{ display: "block", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: 8 }}>
                Username
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => { setUserId(e.target.value); setError(""); }}
                placeholder="Enter your username"
                required
                autoComplete="username"
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#888", marginBottom: 8 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  style={{ ...inputStyle, paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16, padding: 4 }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <p style={{ color: "#f87171", fontSize: 13, textAlign: "center" }}>⚠️ {error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 12,
                background: loading ? "#1a1a2e" : "linear-gradient(135deg,#c9a84c,#e8d5a3)",
                color: loading ? "#555" : "#0d0820",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
                fontFamily: "'Montserrat',sans-serif",
                transitionProperty: "all", transitionDuration: "0.2s", transitionTimingFunction: "ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #444", borderTopColor: "#888", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                  Signing In...
                </>
              ) : "Sign In →"}
            </button>
          </form>
        </div>

        {/* Back link */}
        <p style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/" style={{ color: "#555", textDecoration: "none", fontSize: 12, letterSpacing: "0.1em" }}>
            ← Back to Home
          </Link>
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
