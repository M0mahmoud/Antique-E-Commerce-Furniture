"use client";

import ProductCard from "@/components/layout/product/ProductCard";
import { useUserWishlist } from "@/hooks/user/wishlist";
import { Product } from "@/types/products";
import { Loader2 } from "lucide-react";
import React from "react";

const WishlistPage = () => {
  const { isPending, data, error } = useUserWishlist();

  if (isPending) {
    return <Loader2 className="animate-spin w-8 h-8 text-primary" />;
  }
  return (
    <div className="w-full p-2">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your Wishlist</h2>
      {error && (
        <p className="text-red-500 text-center py-8">
          An error occurred while fetching your wishlist. Please try again
          later.
        </p>
      )}
      {data?.data.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
