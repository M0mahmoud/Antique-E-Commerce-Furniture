"use client";

import CarouselImages from "@/components/layout/product/CarouselImages";
import ProductDetails from "@/components/layout/product/ProductDetails";
import Loading from "@/components/Loading";
import { useProduct } from "@/hooks/products";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { useTranslations } from "next-intl";

const ProductClient = ({ handle }: { handle: string }) => {
  const t = useTranslations("productPage");
  const { data, error, isPending } = useProduct(handle);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-500">
            {t("errorLoadingProduct")}
          </p>
        </div>
      </div>
    );
  }

  if (!data?.product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">
            {t("productNotFound")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<Loading />}>
        <Link
          className="mb-4 flex items-center bg-secondary w-fit py-2 px-3 rounded-lg"
          href="/"
        >
          <ArrowLeft className="me-2 h-4 w-4" />
          <span>{t("backToProducts")}</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <CarouselImages product={data?.product} />
          <ProductDetails product={data?.product} />
        </div>
      </Suspense>
    </div>
  );
};

export default ProductClient;
