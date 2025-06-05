"use client";

import Hero from "@/components/Hero";
import ProductCard from "@/components/layout/product/ProductCard";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useAllProducts } from "@/hooks/products";
import { Product } from "@/types/products";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

const Sidebar = ({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  uniqueCategories,
  uniqueBrands,
}: {
  priceRange: number[];
  setPriceRange: (priceRange: number[]) => void;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueCategories: string[];
  uniqueBrands: string[];
}) => {
  const t = useTranslations("shopPage");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prevBrands) =>
      prevBrands.includes(brand)
        ? prevBrands.filter((b) => b !== brand)
        : [...prevBrands, brand]
    );
  };

  return (
    <div className="bg-background p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{t("filters")}</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">{t("priceRange")}</h3>
        <Slider
          min={0}
          max={10000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">{t("categories")}</h3>
        {uniqueCategories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <Checkbox
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
            />
            <label
              htmlFor={`category-${category}`}
              className="ms-2 cursor-pointer"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">{t("brands")}</h3>
        {uniqueBrands.map((brand) => (
          <div key={brand} className="flex items-center mb-2">
            <Checkbox
              id={`brand-${brand}`}
              checked={selectedBrands.includes(brand)}
              onCheckedChange={() => handleBrandChange(brand)}
            />
            <label htmlFor={`brand-${brand}`} className="ms-2 cursor-pointer">
              {brand}
            </label>
          </div>
        ))}
      </div>
      <Button
        className="w-full mt-4"
        onClick={() => {
          setPriceRange([0, 10000]);
          setSelectedCategories([]);
          setSelectedBrands([]);
        }}
      >
        {t("resetFilters")}
      </Button>
    </div>
  );
};

export default function ShopPage() {
  const t = useTranslations("shopPage");
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      setSearchTerm(value);
      return params.toString();
    },
    [searchParams]
  );

  const { data, error, isLoading } = useAllProducts();

  const filteredProducts = data?.products.filter(
    (product: Product) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category.name)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
      product.original_price >= priceRange[0] &&
      product.original_price <= priceRange[1] &&
      product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const uniqueCategories = Array.from(
    new Set((data?.products ?? []).map((product) => product.category.name))
  );

  const uniqueBrands = Array.from(
    new Set((data?.products ?? []).map((product) => product.brand))
  );

  return (
    <>
      <Hero langKey="Hero.Shop" id="HeroSection" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="block w-full md:w-1/4">
            <p className="px-2 text-primary">
              {t("showingProducts", { count: filteredProducts?.length || 0 })}
            </p>
            <Sidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
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
                value={searchTerm}
                onChange={(e) => {
                  window.history.pushState(
                    null,
                    "",
                    `?${createQueryString("q", e.target.value)}`
                  );
                }}
              />
            </div>
            <section className="product-section" id="all-product-section">
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
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
