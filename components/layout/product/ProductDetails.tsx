"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useAddToCart,
  useRemoveFromCart,
  useUserCart,
} from "@/hooks/user/cart";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useUserWishlist,
} from "@/hooks/user/wishlist";
import { Product } from "@/types/products";
import { Heart, Loader, Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductDetails({
  product,
}: {
  product: Product | undefined;
}) {
  const [quantity, setQuantity] = useState(1);

  // Wishlit
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { data: wishlist } = useUserWishlist();
  const { mutate: addToWishlist, isPending: isAddingToWishlist } =
    useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isRemovingFromWishlist } =
    useRemoveFromWishlist();

  // Cart
  const [isInCart, setIsInCart] = useState(false);
  const { data: cart } = useUserCart();
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const { mutate: removeFromCart, isPending: isRemovingFromCart } =
    useRemoveFromCart();

  useEffect(() => {
    if (wishlist?.data?.wishlist?.some((item: any) => item === product?._id)) {
      setIsInWishlist(true);
    }
    if (
      cart?.data?.cart?.products.some(
        (item: any) => item.product._id === product?._id
      )
    ) {
      setIsInCart(true);
    }
  }, [product?._id, wishlist?.data?.wishlist, cart?.data?.cart?.products]);

  const handleAddToCart = async () => {
    if (isInCart) {
      removeFromCart(product?.slug || "", {
        onSuccess: () => {
          setIsInCart(false);
          toast.success("Removed from cart");
        },
        onError: () => {
          setIsInCart(true);
          toast.error("Failed to remove from cart");
        },
      });
    } else {
      addToCart(
        { slug: product?.slug || "", quantity },
        {
          onSuccess: () => {
            setIsInCart(true);
            toast.success("Added to cart");
          },
          onError: () => {
            setIsInCart(false);
            toast.error("Failed to add to cart");
          },
        }
      );
    }
  };

  const handleAddToWishlist = async () => {
    if (isInWishlist) {
      removeFromWishlist(product?.slug || "", {
        onSuccess: () => {
          setIsInWishlist(false);
          toast.success("Removed from wishlist");
        },
        onError: () => {
          setIsInWishlist(true);
          toast.error("Failed to remove from wishlist");
        },
      });
    } else {
      addToWishlist(product?.slug || "", {
        onSuccess: () => {
          setIsInWishlist(true);
          toast.success("Added to wishlist");
        },
        onError: () => {
          setIsInWishlist(false);
          toast.error("Failed to add to wishlist");
        },
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
      <p className="text-gray-600 mb-4">{product?.category}</p>
      <div className="flex items-center mb-4">
        <span className="text-2xl font-bold mr-2">
          ${product?.original_price}
        </span>
        {/* {product?.discountPrice && (
          <span className="text-lg text-gray-500 line-through">
            ${product?.discountPrice}
          </span>
        )} */}
      </div>
      <Badge
        className="mb-4"
        variant={
          product?.stock_num && product?.stock_num > 0
            ? "default"
            : "destructive"
        }
      >
        {"New"}
      </Badge>
      <p className="text-gray-700 mb-4">{product?.description}</p>
      <div className="grid gap-4 mb-6">
        <div>
          <strong>SKU:</strong> {product?._id}
        </div>
        <div>
          <strong>Brand:</strong> {product?.brand}
        </div>
        <div>
          <strong>Collection:</strong> {"product?.collectionName"}
        </div>
        <div>
          Color: {product?.variations[0]?.color?.hexadecimal || "Green"}
          <br />
          Plus Price: {product?.variations[0]?.color?.plus_price || "120"}
          <br />
          In Stock{product?.variations[0]?.color?.stock_num || "45"}
          <br />
          Size: {product?.variations[0]?.size || "54"}
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
            setQuantity(Math.min(product?.stock_num || 0, quantity + 1))
          }
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-4 ">
        <Button onClick={handleAddToCart} className="flex-1">
          {isAddingToCart || isRemovingFromCart ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="mr-2 h-4 w-4" />
          )}
          {isAddingToCart || isRemovingFromCart
            ? "Loading..."
            : isInCart
            ? "Remove from cart"
            : "Add to cart"}
        </Button>
        <Button
          variant={isInWishlist ? "secondary" : "outline"}
          onClick={handleAddToWishlist}
          className="flex items-center"
        >
          {isAddingToWishlist || isRemovingFromWishlist ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Heart
              className={`h-4 w-4 ${
                isInWishlist
                  ? "fill-red-500 text-red-500"
                  : "text-dark fill-transparent"
              }`}
            />
          )}
        </Button>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Truck className="mr-2 h-4 w-4" />
        {/* {product?.deliveryTime
          ? `Delivery Time: ${product?.deliveryTime}`
          : "Contact us for delivery information"} */}
        Delivery Time: 2 Days
      </div>
    </div>
  );
}
