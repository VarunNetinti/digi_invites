import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{
        background: "linear-gradient(135deg, #1a0a2e 0%, #2d1444 100%)",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      <div className="text-6xl mb-6">💍</div>
      <h1
        className="text-5xl mb-4"
        style={{ color: "#c9a84c", fontFamily: "'Great Vibes', cursive" }}
      >
        Invitation Not Found
      </h1>
      <p className="text-gray-400 mb-8 text-lg font-light">
        This invitation doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="px-8 py-3 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #c9a84c, #e8d5a3)",
          color: "#1a0a2e",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
