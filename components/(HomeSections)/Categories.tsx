"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { useAllCategories } from "@/hooks/categories";
import { Category } from "@/types/categories";
import { Skeleton } from "../ui/skeleton";

export function TopCategories() {
  const { data: categories, isLoading, error } = useAllCategories();

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("categories-container");
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-red-500">
        {error instanceof Error
          ? error.message
          : "An error occurred while fetching categories"}
      </div>
    );
  }
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="mb-0">Top Categories</h2>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => scrollContainer("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => scrollContainer("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          id="categories-container"
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {isLoading ? (
            <div className="flex gap-6">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex-none w-[300px]">
                  <Skeleton className="h-[300px] w-[300px] rounded-lg" />
                  <Skeleton className="h-4 w-[200px] mt-4" />
                </div>
              ))}
            </div>
          ) : (
            categories &&
            !error &&
            categories.categories.map((category: Category) => (
              <Link
                key={category._id}
                href={`/categories/${category.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}}`}
                className={
                  "relative flex-none w-[300px] overflow-hidden rounded-lg group"
                }
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={category.image.url}
                    alt={category.name}
                    fill
                    loading="lazy"
                    className="object-cover object-center group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black/35">
                    <h3 className="font-semibold text-lg mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200 mb-0">
                      {category.parent
                        ? `${category.parent.name} Category`
                        : "Main Category"}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
