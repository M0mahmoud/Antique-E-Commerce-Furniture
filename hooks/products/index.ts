import { getAllProducts, getProduct } from "@/app/api/products";
import { useQuery } from "@tanstack/react-query";

export function useAllProducts({
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
  return useQuery({
    queryKey: ["products", page],
    queryFn: () =>
      getAllProducts({
        page,
        brand,
        name,
        categoryName,
        min,
        max,
      }),
  });
}
export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
  });
}
