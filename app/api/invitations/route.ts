import { NextResponse } from "next/server";
import { getAllInvitations } from "@/lib/storage";

export async function GET(): Promise<NextResponse> {
  try {
    const invitations = await getAllInvitations();
    return NextResponse.json({ invitations });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
