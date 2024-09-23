import connectDB from "@/db";
import { verifySession } from "@/lib/session";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await verifySession();
  return NextResponse.json({ session });
}
export async function POST(req: NextRequest) {
  try {
    const { session, isAuth } = await verifySession();

    if (!isAuth) {
      return NextResponse.json({ msg: "Plz, Signin first" }, { status: 400 });
    }

    const { productId, quantity } = await req.json();
    if (!productId || quantity < 1) {
      return NextResponse.json(
        { msg: "Quantity must be at least 1" },
        { status: 400 }
      );
    }
    await connectDB();
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ msg: "Product not found" }, { status: 400 });
    }
    const userId = session?.userId;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart?.items?.findIndex(
      (item: { productId: { toString: () => any } }) =>
        item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // If the product is already in the cart, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].totalPrice =
        cart.items[existingItemIndex].quantity *
        cart.items[existingItemIndex].priceAtAddition;
    } else {
      // If the product is not in the cart, add it as a new item
      cart.items.push({
        productId: product._id,
        quantity,
        priceAtAddition: product.price,
        discountPriceAtAddition: product.discountPrice,
        totalPrice: quantity * (product.discountPrice || product.price),
      });
    }

    // Recalculate subTotal, discountTotal, and grandTotal
    cart.subTotal = cart.items.reduce(
      (acc: any, item: { totalPrice: any }) => acc + item.totalPrice,
      0
    );
    cart.discountTotal = cart.items.reduce(
      (acc: number, item: { discountPriceAtAddition: any; quantity: number }) =>
        acc + (item.discountPriceAtAddition || 0) * item.quantity,
      0
    );
    cart.grandTotal = cart.subTotal - cart.discountTotal;

    // Save the cart
    await cart.save();
    return NextResponse.json({ msg: "Product added to cart" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { msg: " error occurred while adding the product to the cart" },
      { status: 401 }
    );
  }
}
