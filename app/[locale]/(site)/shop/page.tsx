"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/layout/product/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ProductDocument } from "@/lib/definitions";
import Loading from "@/components/Loading";

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
  setSelectedCategories: (selectedCategories: string[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (selectedBrands: string[]) => void;
  uniqueCategories: string[];
  uniqueBrands: string[];
}) => {
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="bg-background p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <Slider
          min={0}
          max={1000}
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
        <h3 className="font-semibold mb-2">Categories</h3>
        {uniqueCategories.map((category: string) => (
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
        <h3 className="font-semibold mb-2">Brands</h3>
        {uniqueBrands?.map((brand: string) => (
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
          setPriceRange([0, 1000]);
          setSelectedCategories([]);
          setSelectedBrands([]);
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default function ShopPage() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { data, error, isLoading } = useQuery<ProductDocument[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      const result = await res.json();
      return result;
    },
  });

  const filteredProducts = data?.filter(
    (product) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)) &&
      (selectedBrands.length === 0 ||
        selectedBrands.includes(product?.brand || "")) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  const uniqueCategories = Array.from(
    new Set(data?.map((product) => product.category) || [])
  );
  const uniqueBrands = Array.from(
    new Set(data?.map((product) => product.brand) || [])
  );

  return (
    <>
      <Hero langKey="Hero.Shop" id="HeroSection" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="block w-full md:w-1/4">
            <Sidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              uniqueCategories={uniqueCategories}
              uniqueBrands={uniqueBrands?.filter(
                (brand): brand is string => brand !== undefined
              )}
            />
          </aside>
          <main className="w-full md:w-3/4">
            <section className="product-section" id="all-product-section">
              {isLoading ? (
                <Loading />
              ) : error ? (
                <p className="text-xl text-destructive font-light">
                  Error loading products: {error.message}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts?.map((product: ProductDocument) => (
                    <ProductCard
                      key={product._id}
                      _id={product._id}
                      productName={product.productName}
                      category={product.category}
                      description={product.description}
                      price={product.price}
                      mainProductImage={product.mainProductImage}
                      brand={product.brand}
                      availabilityStatus={product.availabilityStatus}
                      sku={""}
                      stockQuantity={0}
                    />
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
