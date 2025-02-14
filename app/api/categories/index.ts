import { apiClient } from "@/lib/apiClient";
import { CategoriesResponse } from "@/types/categories";

export async function getAllCategories() {
  const response = await apiClient<CategoriesResponse>("/api/category", {
    method: "GET",
  });
  if (!response.status) {
    throw new Error(response.message || "Failed to fetch categories");
  }
  return response.data;
}

export async function getCategorie(categoryID: string) {
  const response = await apiClient<CategoriesResponse>(
    `/api/category/${categoryID}`,
    {
      method: "GET",
    }
  );
  if (!response.status) {
    throw new Error(response.message || "Failed to fetch categories");
  }
  return response.data;
}
