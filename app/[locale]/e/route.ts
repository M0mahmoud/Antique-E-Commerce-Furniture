import connectDB from "@/db";
import { key } from "@/lib/session";
import User from "@/models/User";
import { jwtVerify } from "jose";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  try {
    const { payload } = await jwtVerify(token as string, key, {
      algorithms: ["HS256"],
    });

    await connectDB();
    const user = await User.findOneAndUpdate(
      {
        email: payload?.email,
      },
      {
        $set: { emailConfirmed: 1 },
      }
    );
    if (!user) notFound();
    return NextResponse.redirect(
      new URL(`${request.nextUrl.pathname}/confirmed`, request.url)
    );
  } catch (error) {
    return NextResponse.redirect(
      new URL(`${request.nextUrl.pathname}/expired`, request.url)
    );
  }
}
