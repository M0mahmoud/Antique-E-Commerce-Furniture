import { apiClient } from "@/lib/apiClient";

export async function GetUserWishlist() {
  const response = await apiClient("/product/wishlist/get", {
    method: "GET",
  });
  if (!response.status) {
    throw new Error(response.message || "Failed to fetch cart");
  }
  return response;
}

export async function AddToWishlist(slug: string) {
  const response = await apiClient(`/product/wishlist/${slug}`, {
    method: "POST",
  });
  if (!response.status) {
    throw new Error(response.message || "Failed to add to wishlist");
  }
  return response;
}

export async function RemoveFromWishlist(slug: string) {
  return await apiClient(`/product/wishlist/remove/${slug}`, {
    method: "DELETE",
  });
}

export async function ClearWishlist() {
  return await apiClient("/product/wishlist/clear", {
    method: "DELETE",
  });
}
