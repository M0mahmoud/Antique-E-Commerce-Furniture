"use client";

import Hero from "@/components/Hero";
import ProductCard from "@/components/layout/product/ProductCard";
import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input";
import { useAllProducts } from "@/hooks/products";
import { Product } from "@/types/products";
import { useTranslations } from "next-intl";
import {
  useQueryStates,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
} from "nuqs";
import ShopPagination from "@/components/ui/ShopPagination";
import ShopSidebar from "@/components/layout/ShopSidebar";
import { useState, useEffect, useRef } from "react";

export default function ShopPage() {
  const t = useTranslations("shopPage");

  const [
    {
      page = 1,
      q: rawQ,
      categories: rawCategories,
      brands: rawBrands,
      min: rawMin,
      max: rawMax,
    },
    setQuery,
  ] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      q: parseAsString.withDefault(""),
      categories: parseAsString.withDefault(""),
      brands: parseAsString.withDefault(""),
      min: parseAsInteger.withDefault(0),
      max: parseAsInteger.withDefault(100000),
    },
    {
      clearOnDefault: true,
    }
  );

  const q = rawQ ?? undefined;
  const min = rawMin ?? undefined;
  const max = rawMax ?? undefined;
  const categories = rawCategories ? rawCategories.split(",") : [];
  const brands = rawBrands ? rawBrands.split(",") : [];

  // Local state for search input (before debouncing)
  const [searchInput, setSearchInput] = useState(q ?? "");

  // Debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout>(null);

  // Update local search input when URL query changes (e.g., browser back/forward)
  useEffect(() => {
    setSearchInput(q ?? "");
  }, [q]);

  // Debounced search function
  useEffect(() => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      if (searchInput !== (q ?? "")) {
        setQuery({ q: searchInput || undefined, page: 1 });
      }
    }, 500); // 500ms debounce delay

    // Cleanup timer on unmount
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchInput, q, setQuery]);

  const priceRange = [min ?? 0, max ?? 10000];
  const setPriceRange = ([newMin, newMax]: number[]) => {
    setQuery({ min: newMin, max: newMax, page: 1 });
  };

  // Optimized category selection - batch updates
  const setSelectedCategories = (cats: string[]) => {
    setQuery({
      categories: cats.length > 0 ? cats.join(",") : undefined,
      page: 1,
    });
  };

  // Optimized brand selection - batch updates
  const setSelectedBrands = (brandsArr: string[]) => {
    setQuery({
      brands: brandsArr.length > 0 ? brandsArr.join(",") : undefined,
      page: 1,
    });
  };

  const setCurrentPage = (p: number) => {
    setQuery({ page: p });
  };

  // Reset all filters function
  const resetFilters = () => {
    setSearchInput(""); // Clear local search input
    setQuery({
      page: 1,
      q: "",
      categories: "",
      brands: "",
      min: 0,
      max: 100000,
    });
  };

  const { data, error, isPending } = useAllProducts({
    page,
    name: q,
    categoryName: categories[0],
    brand: brands[0],
    min,
    max,
  });

  const filteredProducts = data?.products.filter(
    (product: Product) =>
      (categories.length === 0 ||
        categories.includes(product.category.name ?? "")) &&
      (brands.length === 0 || brands.includes(product.brand ?? "")) &&
      product.original_price >= (min ?? 0) &&
      product.original_price <= (max ?? 10000) &&
      product.name.toLocaleLowerCase().includes((q ?? "").toLocaleLowerCase())
  );

  const uniqueCategories = Array.from(
    new Set((data?.products ?? []).map((product) => product.category.name))
  );

  const uniqueBrands = Array.from(
    new Set((data?.products ?? []).map((product) => product.brand))
  );

  const totalPages = data?.total_pages || 1;

  return (
    <>
      <Hero langKey="Hero.Shop" id="HeroSection" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="block w-full md:w-1/4">
            <p className="px-2 text-primary">
              {t("showingProducts", { count: data?.total_products || 0 })}
            </p>
            <ShopSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCategories={categories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={brands}
              setSelectedBrands={setSelectedBrands}
              uniqueCategories={uniqueCategories}
              uniqueBrands={uniqueBrands}
              resetFilters={resetFilters}
            />
          </aside>
          <main className="w-full md:w-3/4">
            <h3>{t("searchLabel")}</h3>
            <div className="flex gap-2">
              <Input
                disabled={isPending}
                className="p-2 mb-4"
                placeholder={t("searchPlaceholder")}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <main className="w-full h-full" id="all-product-section">
              {isPending ? (
                <Loading />
              ) : error ? (
                <p className="text-xl text-destructive font-light">
                  {t("errorLoading", { error: error.message })}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
              {filteredProducts?.length === 0 && <p>No Products</p>}
            </main>
            <div className="flex justify-center items-center mt-6">
              <ShopPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
