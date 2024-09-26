"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductDocument } from "@/lib/definitions";
import { Heart, Loader, Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
export default function ProductDetails({
  product,
}: {
  product: ProductDocument;
}) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Check if the product is in the wishlist when the component mounts
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsInWishlist(wishlist.some((item: any) => item === product?._id));
  }, [product?._id]);

  //  TODO: if (isError)

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity,
          productId: product?._id,
        }),
      });
      const result = await res.json();
      if (res.status === 201) {
        toast.success(result.msg);
      } else {
        toast.warning(result.msg);
      }
      console.log(`result:`, result);
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const isAlreadyInWishlist = wishlist.includes(product?._id);

      if (isAlreadyInWishlist) {
        const updatedWishlist = wishlist.filter(
          (id: string) => id !== product?._id
        );
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setIsInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        wishlist.push(product?._id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setIsInWishlist(true);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist. Please try again.");
      setIsInWishlist(!isInWishlist);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
      <p className="text-gray-600 mb-4">{product.category}</p>
      <div className="flex items-center mb-4">
        <span className="text-2xl font-bold mr-2">${product.price}</span>
        {product.discountPrice && (
          <span className="text-lg text-gray-500 line-through">
            ${product.discountPrice}
          </span>
        )}
      </div>
      <Badge
        className="mb-4"
        variant={
          product.availabilityStatus === "inStock"
            ? "default"
            : product.availabilityStatus === "outOfStock"
            ? "destructive"
            : "secondary"
        }
      >
        {product.availabilityStatus}
      </Badge>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <div className="grid gap-4 mb-6">
        <div>
          <strong>SKU:</strong> {product.sku}
        </div>
        <div>
          <strong>Brand:</strong> {product.brand}
        </div>
        <div>
          <strong>Collection:</strong> {product.collectionName}
        </div>
        <div>
          <strong>Dimensions:</strong> {product?.dimensions?.height}&quot; H x{" "}
          {product?.dimensions?.width}&quot; W x {product?.dimensions?.depth}
          &quot; D
        </div>
      </div>
      <strong className="mb-2">Quantity:</strong>
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-xl font-semibold">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setQuantity(Math.min(product.stockQuantity, quantity + 1))
          }
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-4 ">
        <Button onClick={handleAddToCart} className="flex-1">
          {isAddingToCart ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="mr-2 h-4 w-4" />
          )}
          Add to Cart
        </Button>
        <Button
          variant={isInWishlist ? "secondary" : "outline"}
          onClick={handleAddToWishlist}
          className="flex items-center"
        >
          <Heart
            className={`h-4 w-4 ${
              isInWishlist
                ? "fill-red-500 text-red-500"
                : "text-dark fill-transparent"
            }`}
          />
        </Button>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Truck className="mr-2 h-4 w-4" />
        {product.deliveryTime
          ? `Delivery Time: ${product.deliveryTime}`
          : "Contact us for delivery information"}
      </div>
    </div>
  );
}
