import ProductCard from "@/components/layout/product/ProductCard";
import { Product } from "@/types/products";
import React from "react";

const WishlistPage = () => {
    const wishlist: Product[] = [
        {
            id: "1774",
            name: "Library Stool Chair",
            price: 20,
            originalPrice: 80,
            slug: "library-stool-chair",
            image: "/placeholder.svg?height=400&width=400",
        },
        {
            id: "126",
            name: "Library Stool Chair",
            slug: "library-stool-chair",
            price: 20,
            image: "/placeholder.svg?height=400&width=400",
            status: "new",
        },
        {
            id: "157",
            name: "Library Stool Chair",
            slug: "library-stool-chair",
            price: 20,
            image: "/placeholder.svg?height=400&width=400",
            status: "sale",
            originalPrice: 80,
        },
        {
            id: "136",
            name: "Library Stool Chair",
            slug: "library-stool-chair",
            price: 20,
            image: "/placeholder.svg?height=400&width=400",
        },
        {
            id: "13434",
            name: "Library Stool Chair",
            slug: "library-stool-chair",
            price: 20,
            image: "/placeholder.svg?height=400&width=400",
            status: "new",
        },
    ];
    return (
        <div className="w-full p-2">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Your Wishlist
            </h2>
            {wishlist.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                    Your wishlist is empty.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((product, index) => (
                        <ProductCard
                            index={index}
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
