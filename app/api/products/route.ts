import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ msg: "Will Fetch Products From DB" });
}
