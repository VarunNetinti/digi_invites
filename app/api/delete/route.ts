import { NextRequest, NextResponse } from "next/server";
import { deleteInvitation } from "@/lib/storage";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required." }, { status: 400 });
    const ok = await deleteInvitation(id);
    if (!ok) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete invitation." }, { status: 500 });
  }
}
