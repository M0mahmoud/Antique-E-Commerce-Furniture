"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ProductProps } from "@/types/products";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

// New Design
export default function ProductCard({ product, index }: ProductProps) {
    const onAddToCart = () => {
        console.log("Add to cart:");
        toast.success("WAIT BACKEND");
    };
    const onToggleWishlist = () => {
        console.log("Toggle wishlist:");
        toast.success("WAIT BACKEND");
    };
    return (
        <div className="group relative flex flex-col">
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
                <Link href={`/product/${product.slug}`}>
                    <Image
                        src={`/products/product_${(index % 10) + 1}.png`}
                        alt={product?.name}
                        fill
                        loading="lazy"
                        className="object-cover object-center bg-gray-100"
                    />
                </Link>
                <div className="absolute right-2 sm:right-3 top-2 sm:top-3">
                    <button
                        onClick={() => onToggleWishlist()}
                        className="rounded-md bg-white p-2 text-gray-900 hover:bg-gray-50"
                    >
                        <Heart className="size-4" />
                        <span className="sr-only">Add to wishlist</span>
                    </button>
                </div>
                {product?.status && (
                    <div className="absolute left-2 sm:left-3 top-2 sm:top-3">
                        <Badge
                            variant="secondary"
                            className={cn(
                                "px-2 py-1 rounded-md",
                                product?.status === "new" &&
                                    "bg-green-500 text-white hover:bg-green-600",
                                product?.status === "sale" &&
                                    "bg-orange-500 text-white hover:bg-orange-600"
                            )}
                        >
                            {product?.status === "new" ? "New" : "Sale"}
                        </Badge>
                    </div>
                )}
            </div>
            <div className="mt-4 flex justify-between items-start">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-0">
                        {product?.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                            ${product?.price}
                        </p>
                        {product?.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                                ${product?.originalPrice}
                            </p>
                        )}
                    </div>
                </div>
                <Button
                    onClick={() => onAddToCart()}
                    variant="ghost"
                    className="m-0 bg-gray-100"
                >
                    <span className="sr-only">Add to Cart</span>
                    <ShoppingCart className="w-5 h-5 text-primary" />
                </Button>
            </div>
        </div>
    );
}
