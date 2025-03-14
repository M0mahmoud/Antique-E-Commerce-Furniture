import {
  AddToWishlist,
  ClearWishlist,
  GetUserWishlist,
  RemoveFromWishlist,
} from "@/app/api/user/wishlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserWishlist() {
  return useQuery({
    queryKey: ["user-wishlist"],
    queryFn: GetUserWishlist,
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => AddToWishlist(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-wishlist"] });
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => RemoveFromWishlist(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-wishlist"] });
    },
  });
}

export function useClearWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => ClearWishlist(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-wishlist"] });
    },
  });
}
