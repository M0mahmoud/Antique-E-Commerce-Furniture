import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from "next-intl";

export default function ShopSidebar({
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
  setSelectedCategories: (cats: string[]) => void;
  setSelectedBrands: (brands: string[]) => void;
  selectedBrands: string[];
  uniqueCategories: string[];
  uniqueBrands: string[];
}) {
  const t = useTranslations("shopPage");

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
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
}
