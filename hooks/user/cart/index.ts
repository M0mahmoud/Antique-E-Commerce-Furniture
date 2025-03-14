import {
  AddToCart,
  ClearCart,
  GetUserCart,
  RemoveFromCart,
} from "@/app/api/user/cart";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserCart() {
  return useQuery({
    queryKey: ["user-cart"],
    queryFn: GetUserCart,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, quantity }: { slug: string; quantity: number }) =>
      AddToCart(slug, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => RemoveFromCart(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => ClearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cart"] });
    },
  });
}
