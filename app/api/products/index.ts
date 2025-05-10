import { apiClient } from "@/lib/apiClient";
import { Product, ProductsResponse } from "@/types/products/index";

export async function getAllProducts() {
  const response = await apiClient<ProductsResponse>(
    "/product/all?page=&brand=&name=&categoryName=&min=&max=",
    {
      method: "GET",
    }
  );
  if (!response.status) {
    throw new Error(response.message || "Failed to fetch products");
  }
  return response.data;
}

export async function getProduct(slug: string) {
  const response = await apiClient<{
    product: Product;
    message: string;
  }>(`/product/${slug}`, {
    method: "GET",
  });
  if (!response.status) {
    throw new Error(response.message || "Failed to fetch product");
  }
  return response.data;
}
