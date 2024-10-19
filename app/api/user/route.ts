import connectDB from "@/db";
import { UserDocument } from "@/lib/definitions";
import { verifySession } from "@/lib/session";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { session } = await verifySession();
    // if (!isAuth) {
    //   redirect(baseUrl);
    // }

    await connectDB();
    const user: UserDocument | null = await User.findOne({
      _id: session?.userId,
    });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const { session } = await verifySession();

    if (!session?.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const user: UserDocument | null = await User.findOne({
      _id: session.userId,
    });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const updaetdUser = await User.findOneAndUpdate(
      { _id: session.userId },
      {
        $set: {
          email,
          name,
          emailConfirmed: 0,
        },
      }
    );

    return NextResponse.json(updaetdUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
