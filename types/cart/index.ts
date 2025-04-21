import { ApiResponse } from "../api";
import { Product } from "../products";

export interface CartProduct {
  _id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: string;
  products: CartProduct[];
  total_price: number;
  total_quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Specific API response types
export type GetCartResponse = ApiResponse<{ cart: Cart }>;
export type AddToCartResponse = ApiResponse<{ cart: Cart }>;
export type RemoveFromCartResponse = ApiResponse<{ cart: Cart }>;
export type ClearCartResponse = ApiResponse<null>;
