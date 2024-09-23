"use server";

import connectDB from "@/db";
import { verifySession } from "@/lib/session";
import Cart from "@/models/Cart";
import Product from "@/models/Product";

export async function addToCart(
  _prevState: { msg: string },
  formData: FormData
): Promise<{ msg: string }> {
  try {
    const { session, isAuth } = await verifySession();

    if (!isAuth) {
      return { msg: "Plz, Signin first" };
    }

    const productId = formData.get("productId") as string;
    const quantity = formData.get("quantity") as string;

    // TODO:Fix
    if (!productId || Number(quantity) < 1) {
      return { msg: "Quantity must be at least 1" };
    }
    await connectDB();
    const product = await Product.findById(productId);
    if (!product) {
      return { msg: "Product not found" };
    }
    const userId = session?.userId;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart?.items?.findIndex(
      (item: { productId: { toString: () => FormDataEntryValue } }) =>
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
        totalPrice: Number(quantity) * (product.discountPrice || product.price),
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
    return { msg: "Product added to cart" };
  } catch (error) {
    return { msg: " error occurred while adding the product to the cart" };
  }
}
