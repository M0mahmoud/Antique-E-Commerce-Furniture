"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Category {
    id: string;
    name: string;
    productCount: number;
    image: string;
    slug: string;
}

const categories: Category[] = [
    {
        id: "1",
        name: "Wing Chair",
        productCount: 3134,
        image: "/category/Wing Chair.png",
        slug: "wing-chair",
    },
    {
        id: "2",
        name: "Wooden Chair",
        productCount: 157,
        image: "/category/Wooden Chair.png",
        slug: "wooden-chair",
    },
    {
        id: "3",
        name: "Desk Chair",
        productCount: 154,
        image: "/category/Desk Chair.png",
        slug: "desk-chair",
    },
    {
        id: "4",
        name: "Park Bench Chair",
        productCount: 289,
        image: "/category/Park Bench.png",
        slug: "dining-chair",
    },
    {
        id: "46",
        name: "Bench Chair",
        productCount: 289,
        image: "/category/Park Bench.png",
        slug: "dining-chair",
    },
];

export function TopCategories() {
    const scrollContainer = (direction: "left" | "right") => {
        const container = document.getElementById("categories-container");
        if (container) {
            const scrollAmount =
                direction === "left"
                    ? -container.offsetWidth
                    : container.offsetWidth;
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

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
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className={
                                "relative flex-none w-[300px] overflow-hidden rounded-lg group"
                            }
                        >
                            <div className="aspect-square relative overflow-hidden">
                                <Image
                                    src={category.image}
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
                                        {category.productCount.toLocaleString()}{" "}
                                        Products
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
