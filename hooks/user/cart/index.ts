import {
  AddToCart,
  ClearCart,
  GetUserCart,
  RemoveFromCart,
} from "@/app/api/user/cart";
import { ApiError } from "@/types/api";

import {
  AddToCartResponse,
  ClearCartResponse,
  GetCartResponse,
  RemoveFromCartResponse,
} from "@/types/cart";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserCart() {
  return useQuery<GetCartResponse, ApiError>({
    queryKey: ["user-cart"],
    queryFn: GetUserCart,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation<
    AddToCartResponse,
    ApiError,
    { slug: string; quantity: number }
  >({
    mutationFn: ({ slug, quantity }: { slug: string; quantity: number }) =>
      AddToCart(slug, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation<RemoveFromCartResponse, ApiError, string>({
    mutationFn: (slug: string) => RemoveFromCart(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation<ClearCartResponse, ApiError>({
    mutationFn: () => ClearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
    },
  });
}
