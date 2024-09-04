import connectDB from "@/db";
import { OfferSchema } from "@/lib/definitions";
import Offer from "@/models/Offer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { date, discount } = await req.json();

  const validation = OfferSchema.safeParse({
    date,
    discount,
  });

  if (!validation.success) {
    return NextResponse.json(
      {
        errors: validation.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    // TODO: Fix this approach
    // Client Fetch Last Offer Stored !!!
    const offer = await Offer.create({
      date: validation.data.date,
      discount: validation.data.discount,
    });

    return NextResponse.json({ offer }, { status: 201 });
  } catch (error) {
    console.error("Error finding user or creating session:", error);
    return NextResponse.json({
      message: "An error occurred. Please try again later.",
    });
  }
}

export async function GET() {
  try {
    await connectDB();
    const offer = await Offer.find();
    return NextResponse.json({ offer });
  } catch (error) {
    console.error("Error finding user or creating session:", error);
    return NextResponse.json({
      message: "An error occurred. Please try again later.",
    });
  }
}
