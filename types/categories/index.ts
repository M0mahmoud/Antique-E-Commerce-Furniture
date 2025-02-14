export interface CategoriesResponse {
  categories: Category[];
  total_categories: number;
  current_page: number;
  total_pages: number;
}
export interface Category {
  _id: string;
  name: string;
  image: {
    url: string;
  };
  parent: {
    name: string;
  } | null;
}
