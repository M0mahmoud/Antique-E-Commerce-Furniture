import ProductCard from "@/components/layout/product/ProductCard";
import { Product } from "@/types/products";
import React from "react";

const WishlistPage = () => {
  const wishlist: Product[] = [];
  return (
    <div className="w-full p-2">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
