import { apiClient } from "@/lib/apiClient";

export async function GetUserCart() {
  const response = await apiClient("/cart", {
    method: "GET",
  });
  if (!response.status) {
    throw new Error(response.message || "Failed to fetch cart");
  }
  return response;
}

export async function AddToCart(slug: string, quantity: number) {
  const response = await apiClient("/cart", {
    method: "POST",
    body: {
      slug,
      quantity,
    },
  });
  if (!response.status) {
    throw new Error(response.message || "Failed to add to cart");
  }
  return response;
}

export async function RemoveFromCart(slug: string) {
  const response = await apiClient(`/cart/remove/${slug}`, {
    method: "DELETE",
  });

  if (!response.status) {
    throw new Error(response.message || "Failed to add to cart");
  }
  return response;
}

export async function ClearCart() {
  const response = await apiClient(`/cart/clear`, {
    method: "DELETE",
  });

  if (!response.status) {
    throw new Error(response.message || "Failed to add to cart");
  }
  return response;
}
