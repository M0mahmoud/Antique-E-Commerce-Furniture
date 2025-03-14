import { apiClient } from "@/lib/apiClient";

export async function GetUserWishlist() {
  return await apiClient("/api/product/wishlist/get", {
    method: "GET",
  });
}

export async function AddToWishlist(slug: string) {
  return await apiClient(`/api/product/wishlist/${slug}`, {
    method: "POST",
  });
}

export async function RemoveFromWishlist(slug: string) {
  return await apiClient(`/api/product/wishlist/remove/${slug}`, {
    method: "DELETE",
  });
}

export async function ClearWishlist() {
  return await apiClient("/api/product/wishlist/clear", {
    method: "DELETE",
  });
}
