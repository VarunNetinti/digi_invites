import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Wedding Invitations",
  description: "Create beautiful digital wedding invitations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Great+Vibes&family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;500;600&family=Dancing+Script:wght@400;500;600;700&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Josefin+Sans:wght@300;400;600&family=Raleway:wght@300;400;500;600&family=Sacramento&family=Alex+Brush&family=Parisienne&family=Tangerine:wght@400;700&family=Pinyon+Script&family=Allura&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Spectral:ital,wght@0,300;0,400;1,300;1,400&family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
