import { NextRequest, NextResponse } from "next/server";
import { expireInvitation } from "@/lib/storage";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await expireInvitation(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
