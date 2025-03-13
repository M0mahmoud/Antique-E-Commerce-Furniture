import { baseUrl } from "@/lib/definitions";

import { getProduct } from "@/app/api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";
import ProductClient from "./ProductClient";

// Fix the params type to match what Next.js provides
export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const url = `${baseUrl}/products/${handle}`;
  const product = await getProduct(handle);

  if (!product) return notFound();

  return {
    title: product.product.name,
    description: product.product.description,
    openGraph: url
      ? {
          url,
          title: product.product.name,
          images: [
            {
              width: 500,
              height: 320,
              alt: product.product.name,
              url: product.product.main_image.url,
            },
          ],
        }
      : null,
  };
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);

  return <ProductClient handle={handle} />;
}
