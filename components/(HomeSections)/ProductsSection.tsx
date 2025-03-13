"use client";

import ProductCard from "@/components/layout/product/ProductCard";
import { Link } from "@/i18n/routing";
import { Product } from "@/types/products";
import { Button } from "../ui/button";

const ProductsSection = () => {
  // FROM BACKEND
  const products: Product[] = [];

  return (
    <section className="py-12 md:py-16" id="product-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Our Featured Products
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Discover our curated selection of stylish and comfortable furniture
            pieces designed to elevate your living spaces.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No Products Available
            </p>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
