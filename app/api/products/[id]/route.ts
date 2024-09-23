import connectDB from "@/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: { id: string } }
) {
  const team = context.params.id;

  try {
    await connectDB();
    const product = await Product.findOne({ _id: team });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
