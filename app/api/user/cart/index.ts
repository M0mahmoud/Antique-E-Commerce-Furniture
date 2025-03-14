import { apiClient } from "@/lib/apiClient";

export async function GetUserCart() {
  return await apiClient("/api/cart", {
    method: "GET",
  });
}

export async function AddToCart(slug: string, quantity: number) {
  return await apiClient(`/api/cart`, {
    method: "POST",
    body: {
      slug,
      quantity,
    },
  });
}

export async function RemoveFromCart(slug: string) {
  return await apiClient(`/api/cart/remove/${slug}`, {
    method: "DELETE",
  });
}

export async function ClearCart() {
  return await apiClient("/api/cart/clear", {
    method: "DELETE",
  });
}
