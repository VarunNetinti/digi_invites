/**
 * lib/imageStorage.ts
 * Unified image upload adapter.
 *
 * Priority:
 *   1. Cloudinary  — when CLOUDINARY_CLOUD_NAME + API_KEY + API_SECRET are all set
 *   2. Local disk  — public/uploads  AND  D:\wedding-app\uploads (Windows) / external-uploads (Unix)
 */

import path from "path";
import fs from "fs/promises";

// ─── Cloudinary availability check ────────────────────────────────────────────
function cloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
    process.env.CLOUDINARY_API_KEY?.trim() &&
    process.env.CLOUDINARY_API_SECRET?.trim()
  );
}

// ─── Lazy Cloudinary init ─────────────────────────────────────────────────────
async function getCloudinary() {
  const cloudinary = (await import("cloudinary")).v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });
  return cloudinary;
}

// ─── Local disk paths ─────────────────────────────────────────────────────────
const PUBLIC_UPLOADS = path.join(process.cwd(), "public", "uploads");

// On Windows → D:\wedding-app\uploads ; on Linux/Mac → project-root/external-uploads
const EXTERNAL_UPLOADS =
  process.platform === "win32"
    ? "D:\\wedding-app\\uploads"
    : path.join(process.cwd(), "external-uploads");

async function ensureLocalDirs() {
  await fs.mkdir(PUBLIC_UPLOADS, { recursive: true });
  try {
    await fs.mkdir(EXTERNAL_UPLOADS, { recursive: true });
  } catch {
    // EXTERNAL_UPLOADS may not be writable in some environments — that's OK
  }
}

function sanitize(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

// ─── Upload result ────────────────────────────────────────────────────────────
export interface UploadResult {
  urls: string[];
  backend: "cloudinary" | "local";
}

// ─── Main upload function ─────────────────────────────────────────────────────
export async function uploadImages(files: File[]): Promise<UploadResult> {
  if (cloudinaryConfigured()) {
    return uploadToCloudinary(files);
  }
  return uploadToLocal(files);
}

// ─── Cloudinary path ──────────────────────────────────────────────────────────
async function uploadToCloudinary(files: File[]): Promise<UploadResult> {
  const cloudinary = await getCloudinary();
  const urls: string[] = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Cloudinary upload via buffer (upload_stream wrapped in a Promise)
    const url = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "wedding-invitations",
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error("Cloudinary upload failed"));
          resolve(result.secure_url);
        }
      );
      stream.end(buffer);
    });

    urls.push(url);
  }

  console.log(`✅ Cloudinary: uploaded ${urls.length} image(s)`);
  return { urls, backend: "cloudinary" };
}

// ─── Local disk path ──────────────────────────────────────────────────────────
async function uploadToLocal(files: File[]): Promise<UploadResult> {
  await ensureLocalDirs();
  const urls: string[] = [];

  for (const file of files) {
    const timestamp = Date.now();
    const ext = path.extname(file.name) || ".jpg";
    const base = path.basename(file.name, ext);
    const filename = `${sanitize(base)}_${timestamp}${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    // Always save to public/uploads (served by Next.js)
    await fs.writeFile(path.join(PUBLIC_UPLOADS, filename), buffer);

    // Best-effort save to external directory
    try {
      await fs.writeFile(path.join(EXTERNAL_UPLOADS, filename), buffer);
    } catch {
      // ignore if external dir isn't writable
    }

    urls.push(`/uploads/${filename}`);
  }

  console.log(`📁 Local disk: saved ${urls.length} image(s)`);
  return { urls, backend: "local" };
}

/** Returns which image backend is active */
export function getImageBackend(): "cloudinary" | "local" {
  return cloudinaryConfigured() ? "cloudinary" : "local";
}
