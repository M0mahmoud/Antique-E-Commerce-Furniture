import connectDB from "@/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "No Products Found..." },
        { status: 404 }
      );
    }

    return NextResponse.json(products, {
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
