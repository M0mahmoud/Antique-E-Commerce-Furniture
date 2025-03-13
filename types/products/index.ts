export interface ProductsResponse {
  products: Product[];
  current_page: number;
  total_pages: number;
  total_products: number;
}
export interface Product {
  main_image: {
    url: string;
    public_id: string;
  };
  _id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  original_price: number;
  stock_num: number;
  available: boolean;
  variations: Variation[];
  category: string;
  images: Image[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

type Variation = {
  color: {
    hexadecimal: string;
    plus_price: number;
    stock_num: number;
  };
  size: string;
  _id: string;
};

type Image = {
  url: string;
  public_id: string;
  _id?: string; // Optional because some images might not have an `_id`
};
