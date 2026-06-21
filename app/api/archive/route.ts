/**
 * POST /api/archive
 *
 * Flow:
 *  1. Validate the invitation exists and is not already archived
 *  2. Launch headless Chromium → navigate to the public invitation URL
 *  3. Scroll to load all lazy content, wait for images to settle
 *  4. Take a full-page PNG screenshot
 *  5. Upload the PNG to Cloudinary under wedding-invitations/archives/
 *  6. Delete every Cloudinary image that belongs to this invitation
 *     (heroImageUrls, storyImageUrls, brideFamilyImageUrls, groomFamilyImageUrls, imageUrls)
 *  7. Call archiveInvitation() — sets archived=true, clears image arrays, stores snapshot URL
 *  8. Return { success, snapshotUrl }
 */

import { NextRequest, NextResponse } from "next/server";
import { getInvitationById, archiveInvitation } from "@/lib/storage";

// ── Cloudinary helpers ────────────────────────────────────────────────────────
function cloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
    process.env.CLOUDINARY_API_KEY?.trim() &&
    process.env.CLOUDINARY_API_SECRET?.trim()
  );
}

async function getCloudinary() {
  const cloudinary = (await import("cloudinary")).v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });
  return cloudinary;
}

/** Extract Cloudinary public_id from a secure URL */
function extractPublicId(url: string): string | null {
  try {
    // e.g. https://res.cloudinary.com/cloud/image/upload/v123/wedding-invitations/abc.jpg
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z]+)?$/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/** Upload a Buffer as PNG to Cloudinary, returns secure_url */
async function uploadSnapshotToCloudinary(
  buffer: Buffer,
  slug: string
): Promise<string> {
  const cloudinary = await getCloudinary();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "wedding-invitations/archives",
        public_id: `snapshot_${slug}_${Date.now()}`,
        resource_type: "image",
        format: "png",
        transformation: [{ quality: "auto:best" }],
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Cloudinary snapshot upload failed"));
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

/** Save PNG to local disk when Cloudinary is not configured, returns URL */
async function saveSnapshotLocally(buffer: Buffer, slug: string): Promise<string> {
  const path = await import("path");
  const fs = await import("fs/promises");
  const dir = path.join(process.cwd(), "public", "uploads", "archives");
  await fs.mkdir(dir, { recursive: true });
  const filename = `snapshot_${slug}_${Date.now()}.png`;
  await fs.writeFile(path.join(dir, filename), buffer);
  return `/uploads/archives/${filename}`;
}

/** Delete an array of Cloudinary image URLs */
async function deleteCloudinaryImages(urls: string[]): Promise<void> {
  if (!cloudinaryConfigured() || urls.length === 0) return;
  const cloudinary = await getCloudinary();
  const publicIds = urls.map(extractPublicId).filter(Boolean) as string[];
  if (publicIds.length === 0) return;

  // Delete in batches of 100 (Cloudinary limit)
  for (let i = 0; i < publicIds.length; i += 100) {
    const batch = publicIds.slice(i, i + 100);
    await cloudinary.api.delete_resources(batch, { resource_type: "image" });
  }
  console.log(`🗑 Deleted ${publicIds.length} Cloudinary image(s)`);
}

// ── Screenshot ────────────────────────────────────────────────────────────────
async function takeFullPageScreenshot(url: string): Promise<Buffer> {
  // Dynamic import — puppeteer-core is only available server-side
  const puppeteer = await import("puppeteer-core");

  let chromiumPath: string;
  let launchArgs: string[];

  // In Vercel/Lambda: use @sparticuz/chromium
  // Locally: try to find system chrome
  const isLambda = !!process.env.AWS_LAMBDA_FUNCTION_NAME || !!process.env.VERCEL;

  if (isLambda) {
    const chromium = await import("@sparticuz/chromium");
    chromiumPath = await chromium.default.executablePath();
    launchArgs = chromium.default.args;
  } else {
    // Common local Chrome paths
    const localPaths = [
      "/usr/bin/google-chrome",
      "/usr/bin/chromium-browser",
      "/usr/bin/chromium",
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ];
    const fs = await import("fs/promises");
    chromiumPath = "";
    for (const p of localPaths) {
      try { await fs.access(p); chromiumPath = p; break; } catch { /* try next */ }
    }
    if (!chromiumPath) {
      // Fallback: try @sparticuz/chromium even locally
      const chromium = await import("@sparticuz/chromium");
      chromiumPath = await chromium.default.executablePath();
    }
    launchArgs = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ];
  }

  const browser = await puppeteer.default.launch({
    executablePath: chromiumPath,
    args: launchArgs,
    headless: true,
  });

  try {
    const page = await browser.newPage();

    // Set a tall viewport wide enough for the invitation
    await page.setViewport({ width: 480, height: 900, deviceScaleFactor: 2 });

    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    // Scroll through the full page to trigger lazy-loaded images
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let total = 0;
        const step = 300;
        const interval = setInterval(() => {
          window.scrollBy(0, step);
          total += step;
          if (total >= document.body.scrollHeight) {
            window.scrollTo(0, 0);
            clearInterval(interval);
            resolve();
          }
        }, 80);
      });
    });

    // Wait for images to finish loading after scroll
    await page.evaluate(() =>
      Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise<void>((res) => {
                img.onload = img.onerror = () => res();
              })
          )
      )
    );

    // Extra settle time for CSS animations / countdown timers
    await new Promise((r) => setTimeout(r, 1000));

    const screenshot = await page.screenshot({
      fullPage: true,
      type: "png",
    });

    return Buffer.from(screenshot);
  } finally {
    await browser.close();
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required." }, { status: 400 });

    const inv = await getInvitationById(id);
    if (!inv) return NextResponse.json({ error: "Invitation not found." }, { status: 404 });
    if (inv.archived) return NextResponse.json({ error: "Already archived." }, { status: 400 });

    // ── 1. Build the public URL for this invitation ──
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (req.headers.get("origin") ?? `https://${req.headers.get("host")}`);
    const invitationUrl = `${baseUrl}/${inv.slug}`;

    console.log(`📸 Taking screenshot of ${invitationUrl}`);

    // ── 2. Take full-page screenshot ──
    let screenshotBuffer: Buffer;
    try {
      screenshotBuffer = await takeFullPageScreenshot(invitationUrl);
    } catch (err) {
      console.error("Screenshot failed:", err);
      return NextResponse.json(
        { error: "Screenshot failed. Make sure the invitation URL is publicly accessible." },
        { status: 500 }
      );
    }

    // ── 3. Upload snapshot ──
    let snapshotUrl: string;
    if (cloudinaryConfigured()) {
      snapshotUrl = await uploadSnapshotToCloudinary(screenshotBuffer, inv.slug);
      console.log(`✅ Snapshot uploaded to Cloudinary: ${snapshotUrl}`);
    } else {
      snapshotUrl = await saveSnapshotLocally(screenshotBuffer, inv.slug);
      console.log(`📁 Snapshot saved locally: ${snapshotUrl}`);
    }

    // ── 4. Delete all Cloudinary images for this invitation ──
    const allImageUrls = [
      ...(inv.imageUrls ?? []),
      ...(inv.heroImageUrls ?? []),
      ...(inv.storyImageUrls ?? []),
      ...(inv.brideFamilyImageUrls ?? []),
      ...(inv.groomFamilyImageUrls ?? []),
    ].filter((u) => u.includes("cloudinary.com"));

    await deleteCloudinaryImages(allImageUrls);

    // ── 5. Mark as archived in DB ──
    const ok = await archiveInvitation(id, snapshotUrl);
    if (!ok) return NextResponse.json({ error: "Failed to update archive status." }, { status: 500 });

    return NextResponse.json({ success: true, snapshotUrl });
  } catch (e) {
    console.error("Archive error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Archive failed." },
      { status: 500 }
    );
  }
}
