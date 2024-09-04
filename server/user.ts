"use server";

import connectDB from "@/db";
import { verifySession } from "@/lib/session";
import User from "@/models/User";
import { redirect } from "@/navigation";

export async function getUser() {
  try {
    const { isAuth, session } = await verifySession();
    if (!isAuth) {
      redirect("/auth/signin");
    }

    await connectDB();
    const user = await User.findOne({ _id: session?.userId });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error fetching links:", error);
  }
}
