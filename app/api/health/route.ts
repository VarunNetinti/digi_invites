/**
 * GET /api/health
 * Returns which storage backends are currently active.
 * Useful for verifying your .env.local configuration.
 */
import { NextResponse } from "next/server";
import { getStorageBackend } from "@/lib/storage";
import { getImageBackend } from "@/lib/imageStorage";

export async function GET(): Promise<NextResponse> {
  const [db, images] = await Promise.all([
    getStorageBackend(),
    Promise.resolve(getImageBackend()),
  ]);

  return NextResponse.json({
    status: "ok",
    storage: {
      database: db,          // "mongodb" | "local"
      images: images,        // "cloudinary" | "local"
    },
    env: {
      MONGODB_URI: process.env.MONGODB_URI ? "✅ set" : "❌ empty → using local JSON",
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? "✅ set" : "❌ empty → using local disk",
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? "✅ set" : "❌ empty",
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "✅ set" : "❌ empty",
    },
  });
}
