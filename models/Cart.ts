import { CartDocument } from "@/lib/definitions";
import { Schema, model, models } from "mongoose";

const CartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity cannot be less than 1"],
  },
  priceAtAddition: {
    type: Number,
    required: true,
  },
  discountPriceAtAddition: {
    type: Number,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const CartSchema = new Schema<CartDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [CartItemSchema],
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    discountTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = models?.Cart || model<CartDocument>("Cart", CartSchema);

export default Cart;
