import { apiClient } from "@/lib/apiClient";
import { Product, ProductsResponse } from "@/types/products/index";

export async function getAllProducts({
  page,
  brand,
  name,
  categoryName,
  min,
  max,
}: {
  page: number;
  brand?: string;
  name?: string;
  categoryName?: string;
  min?: number;
  max?: number;
}) {
  const params = new URLSearchParams();
  params.append("page", page.toString());

  if (brand) params.append("brand", brand);
  if (name) params.append("name", name);
  if (categoryName) params.append("categoryName", categoryName);
  if (min !== undefined) params.append("min", min.toString());
  if (max !== undefined) params.append("max", max.toString());

  const response = await apiClient<ProductsResponse>(
    `/product/all?${params.toString()}`,
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
