"use client";
import ProductCard from "@/components/layout/product/ProductCard";
import { Link } from "@/i18n/routing";
import { ProductDocument } from "@/lib/definitions";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const ProductsSection = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      const result = await res.json();
      console.log(`result:`, result);
      return result;
    },
  });
  return (
    <section className="py-12 md:py-16" id="product-section">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="col-span-2 sm:col-span-1 mb-6 sm:mb-0 flex flex-col gap-5 justify-center items-center">
            <h2 className="mb-4 font-bold text-2xl">
              Crafted with excellent material.
            </h2>
            <p className="mb-4">
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
              velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>

            <Link
              href="/shop"
              className="bg-primary p-3 text-lg font-medium rounded-md text-white self-start"
            >
              Explore
            </Link>
          </div>
          {isLoading && (
            <Loader className="w-10 h-10 text-primary m-auto animate-spin" />
          )}
          {error && (
            <p className="text-xl text-destructive font-light">
              {error.message}
            </p>
          )}
          {data &&
            data?.map((el: ProductDocument) => (
              <ProductCard key={el._id} {...el} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
