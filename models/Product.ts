import { ProductDocument } from "@/lib/definitions";
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema<ProductDocument>(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    brand: {
      type: String,
    },
    collectionName: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discountPrice: {
      type: Number,
    },
    stockQuantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
    },
    availabilityStatus: {
      type: String,
      enum: ["inStock", "outOfStock", "preOrder"],
      default: "inStock",
      required: true,
    },
    dimensions: {
      height: { type: Number },
      width: { type: Number },
      depth: { type: Number },
    },
    mainProductImage: String,
    productImages: {
      type: [String], // Array of URLs for product images
    },
    deliveryTime: {
      type: String,
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Product =
  models?.Product || model<ProductDocument>("Product", ProductSchema);

export default Product;
