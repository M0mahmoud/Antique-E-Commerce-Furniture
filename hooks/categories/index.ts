import { getAllCategories, getCategorie } from "@/app/api/categories";
import { useQuery } from "@tanstack/react-query";

export function useAllCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
}
export function useCategorie(categoryID: string) {
  return useQuery({
    queryKey: ["categorie", categoryID],
    queryFn: () => getCategorie(categoryID),
  });
}
