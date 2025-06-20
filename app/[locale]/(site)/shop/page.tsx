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

export default function ShopPage() {
  const t = useTranslations("shopPage");

  const [
    { page = 1, q = "", categories = [], brands = [], min = 0, max = 10000 },
    setQuery,
  ] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    q: parseAsString.withDefault(""),
    categories: parseAsArrayOf(parseAsString).withDefault([]),
    brands: parseAsArrayOf(parseAsString).withDefault([]),
    min: parseAsInteger.withDefault(0),
    max: parseAsInteger.withDefault(10000),
  });

  const priceRange = [min, max];
  const setPriceRange = ([newMin, newMax]: number[]) => {
    setQuery({ min: newMin, max: newMax, page: 1 });
  };
  const setSelectedCategories = (cats: string[]) => {
    setQuery({ categories: cats, page: 1 });
  };
  const setSelectedBrands = (brandsArr: string[]) => {
    setQuery({ brands: brandsArr, page: 1 });
  };
  const setSearchTerm = (term: string) => {
    setQuery({ q: term, page: 1 });
  };
  const setCurrentPage = (p: number) => {
    setQuery({ page: p });
  };

  const { data, error, isLoading } = useAllProducts({
    page,
    name: q,
    categoryName: categories[0], // adjust if you want multi-category
    brand: brands[0], // adjust if you want multi-brand
    min,
    max,
  });

  const filteredProducts = data?.products.filter(
    (product: Product) =>
      (categories.length === 0 || categories.includes(product.category.name)) &&
      (brands.length === 0 || brands.includes(product.brand)) &&
      product.original_price >= min &&
      product.original_price <= max &&
      product.name.toLocaleLowerCase().includes(q.toLocaleLowerCase())
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
            />
          </aside>
          <main className="w-full md:w-3/4">
            <h3>{t("searchLabel")}</h3>
            <div className="flex gap-2">
              <Input
                className="p-2 mb-4"
                placeholder={t("searchPlaceholder")}
                value={q}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <main className="" id="all-product-section">
              {isLoading ? (
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
