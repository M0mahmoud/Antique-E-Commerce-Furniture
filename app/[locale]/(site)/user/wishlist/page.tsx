"use client";

import ProductCard from "@/components/layout/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useUserWishlist } from "@/hooks/user/wishlist";
import { Link } from "@/i18n/routing";
import { Product } from "@/types/products";
import { Heart, Loader2, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const WishlistPage = () => {
  const t = useTranslations("wishlistPage");
  const { isPending, data, error } = useUserWishlist();

  if (isPending) {
    return (
      <div className="w-full p-2 flex justify-center items-center min-h-[200px]">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin w-6 h-6 text-primary" />
          <span className="text-gray-600">{t("loading")}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-6 h-6 text-primary" />
        <h2 className="text-xl sm:text-2xl font-semibold">{t("title")}</h2>
      </div>

      {error && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-red-500 mb-4">
              <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
            </div>
            <p className="text-red-500 text-lg font-medium mb-2">
              {t("errorMessage")}
            </p>
          </div>
        </div>
      )}

      {!error && data?.data?.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t("emptyWishlist")}
            </h3>
            <p className="text-gray-500 mb-6">{t("emptyMessage")}</p>
            <Link href="/shop">
              <Button className="bg-primary text-white hover:bg-primary/90">
                <ShoppingBag className="w-4 h-4 mr-2" />
                {t("browseProducts")}
              </Button>
            </Link>
          </div>
        </div>
      )}

      {!error && data?.data?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
