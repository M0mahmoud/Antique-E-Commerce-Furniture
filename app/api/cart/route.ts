import connectDB from "@/db";
import { verifySession } from "@/lib/session";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { session, isAuth } = await verifySession();

    if (!isAuth) {
      return NextResponse.json(
        { msg: "Please, sign in first" },
        { status: 400 }
      );
    }

    if (!session?.userId) {
      return NextResponse.json(
        { msg: "Please, sign in first" },
        { status: 400 }
      );
    }

    await connectDB();

    const cart = await Cart.findOne({ userId: session.userId }).populate({
      path: "items.product",
      model: "Product",
    });

    if (!cart) {
      return NextResponse.json({ msg: "Cart not found" }, { status: 400 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ msg: "Error fetching cart" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { session, isAuth } = await verifySession();

    if (!isAuth) {
      return NextResponse.json(
        { msg: "Please, sign in first" },
        { status: 400 }
      );
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
      (item: { product: { toString: () => any } }) =>
        item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].totalPrice =
        cart.items[existingItemIndex].quantity *
        cart.items[existingItemIndex].priceAtAddition;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        priceAtAddition: product.price,
        discountPriceAtAddition: product.discountPrice,
        totalPrice: quantity * product.price,
      });
    }

    // Recalculate totals
    cart.subTotal = cart.items.reduce(
      (acc: number, item: { totalPrice: number }) => acc + item.totalPrice,
      0
    );

    cart.discountTotal = cart.items.reduce(
      (
        acc: number,
        item: { discountPriceAtAddition: number; quantity: number }
      ) => acc + (item.discountPriceAtAddition || 0) * item.quantity,
      0
    );

    cart.grandTotal = cart.subTotal - cart.discountTotal;

    await cart.save();
    return NextResponse.json({ msg: "Product added to cart" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { msg: "Error occurred while adding the product to the cart" },
      { status: 401 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { session, isAuth } = await verifySession();

    if (!isAuth) {
      return NextResponse.json(
        { msg: "Please, sign in first" },
        { status: 400 }
      );
    }

    const { itemId } = await req.json();

    if (!itemId) {
      return NextResponse.json(
        { msg: "Product ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const cart = await Cart.findOne({ userId: session?.userId });
    if (!cart) {
      return NextResponse.json({ msg: "Cart not found" }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex(
      (item: { _id: { toString: () => string } }) =>
        item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { msg: "Product not found in cart" },
        { status: 404 }
      );
    }

    cart.items.splice(itemIndex, 1);

    if (cart.items.length === 0) {
      await cart.remove();
      return NextResponse.json({ msg: "Cart is now empty" }, { status: 200 });
    }

    // Recalculate totals
    cart.subTotal = cart.items.reduce(
      (acc: number, item: { totalPrice: number }) => acc + item.totalPrice,
      0
    );

    cart.discountTotal = cart.items.reduce(
      (
        acc: number,
        item: { discountPriceAtAddition: number; quantity: number }
      ) => acc + (item.discountPriceAtAddition || 0) * item.quantity,
      0
    );

    cart.grandTotal = cart.subTotal - cart.discountTotal;

    await cart.save();
    return NextResponse.json(
      { msg: "Product removed from cart", cart },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { msg: "Error removing item from cart" },
      { status: 500 }
    );
  }
}
