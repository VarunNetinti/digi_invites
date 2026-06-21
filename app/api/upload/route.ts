import { NextRequest, NextResponse } from "next/server";
import { uploadImages } from "@/lib/imageStorage";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.type}. Only JPEG, PNG, WebP, GIF allowed.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds 10 MB limit.` },
          { status: 400 }
        );
      }
    }

    const { urls, backend } = await uploadImages(files);
    return NextResponse.json({ urls, backend }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload files. Please try again." },
      { status: 500 }
    );
  }
}

export const config = { api: { bodyParser: false } };
