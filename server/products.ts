"use server";

import connectDB from "@/db";
import { FormState, ProductDocument, ProductSchema } from "@/lib/definitions";

import Product from "@/models/Product";

export async function addProductAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await connectDB();

    const validation = ProductSchema.safeParse({
      productName: formData.get("productName") as string,
      sku: formData.get("sku") as string,
      category: formData.get("category") as string,
      brand: formData.get("brand") as string,
      collectionName: formData.get("collectionName") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      discountPrice: Number(formData.get("discountPrice")),
      mainProductImage: String(formData.get("mainProductImage")),
      stockQuantity: Number(formData.get("stockQuantity")),
      availabilityStatus: formData.get("availabilityStatus") as
        | "inStock"
        | "outOfStock"
        | "preOrder",
      dimensions: {
        height: Number(formData.get("height")),
        width: Number(formData.get("width")),
        depth: Number(formData.get("depth")),
      },
      deliveryTime: formData.get("deliveryTime") as string,
      tags: formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((tag) => tag.trim()),
    });

    if (!validation.success) {
      return {
        success: false,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const productData: ProductDocument = validation.data;

    const newProduct = new Product(productData);
    await newProduct.save();

    return { success: true, message: "Product added successfully" };
  } catch (error) {
    console.error("Error adding product:", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}
