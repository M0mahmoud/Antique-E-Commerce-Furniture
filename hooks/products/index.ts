import { getAllProducts, getProduct } from "@/app/api/products";
import { useQuery } from "@tanstack/react-query";

export function useAllProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
}
export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
  });
}
