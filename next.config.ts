import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
    ],
  },
  // Keep heavy native packages out of the Next.js bundle — they run as-is in Node
  serverExternalPackages: [
    "puppeteer-core",
    "@sparticuz/chromium",
    "mongoose",
  ],
};

export default nextConfig;
