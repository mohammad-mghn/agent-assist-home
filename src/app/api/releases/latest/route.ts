import { NextResponse } from "next/server";
import { getLatestRelease } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  const release = await getLatestRelease({ revalidate: false });

  if (!release) {
    return NextResponse.json({ error: "Latest release not found" }, { status: 404 });
  }

  return NextResponse.json(release);
}
