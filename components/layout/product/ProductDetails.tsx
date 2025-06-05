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
import { CartProduct } from "@/types/cart";
import { Product } from "@/types/products";
import { Heart, Loader, Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function ProductDetails({
  product,
}: {
  product: Product | undefined;
}) {
  const t = useTranslations("productDetails");
  const [quantity, setQuantity] = useState(1);

  // Wishlist
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
    if (
      wishlist?.data?.wishlist?.some(
        (item: Product) => item._id === product?._id
      )
    ) {
      setIsInWishlist(true);
    }
    if (
      cart?.data?.cart?.products?.some(
        (item: CartProduct) => item.product?._id === product?._id
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
          toast.success(t("removedFromCart"));
        },
        onError: () => {
          setIsInCart(true);
          toast.error(t("failedToRemoveFromCart"));
        },
      });
    } else {
      addToCart(
        { slug: product?.slug || "", quantity },
        {
          onSuccess: () => {
            setIsInCart(true);
            toast.success(t("addedToCart"));
          },
          onError: () => {
            setIsInCart(false);
            toast.error(t("failedToAddToCart"));
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
          toast.success(t("removedFromWishlist"));
        },
        onError: () => {
          setIsInWishlist(true);
          toast.error(t("failedToRemoveFromWishlist"));
        },
      });
    } else {
      addToWishlist(product?.slug || "", {
        onSuccess: () => {
          setIsInWishlist(true);
          toast.success(t("addedToWishlist"));
        },
        onError: () => {
          setIsInWishlist(false);
          toast.error(t("failedToAddToWishlist"));
        },
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
      <p className="text-gray-600 mb-4">{product?.category.name}</p>
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
        {product?.stock_num && product?.stock_num > 0
          ? t("new")
          : t("outOfStock")}
      </Badge>
      <p className="text-gray-700 mb-4">{product?.description}</p>
      <div className="grid gap-4 mb-6">
        <div>
          <strong>{t("sku")}</strong> {product?._id}
        </div>
        <div>
          <strong>{t("brand")}</strong> {product?.brand}
        </div>
        <div>
          <strong>{t("collection")}</strong> {product?.category.name}
        </div>
        <div>
          {/* {t("color")} {product?.variations[0]?.color?.hexadecimal || "Green"}
          <br /> */}
          {t("plusPrice")} {product?.variations[0]?.color?.plus_price || "120"}
          <br />
          {t("inStock")} {product?.variations[0]?.color?.stock_num || "45"}
          <br />
          {t("size")} {product?.variations[0]?.size || "54"}
        </div>
      </div>
      <strong className="mb-2">{t("quantity")}:</strong>
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          aria-label={t("decreaseQuantity")}
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
          aria-label={t("increaseQuantity")}
          disabled={quantity >= (product?.stock_num || 99)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={handleAddToCart} className="flex-1" dir="ltr">
          {isAddingToCart || isRemovingFromCart ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="mr-2 h-4 w-4" />
          )}
          {isAddingToCart || isRemovingFromCart
            ? t("loading")
            : isInCart
            ? t("removeFromCart")
            : t("addToCart")}
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
        {t("deliveryTime", { days: 2 })}
      </div>
    </div>
  );
}
