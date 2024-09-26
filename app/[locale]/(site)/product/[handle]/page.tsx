import { baseUrl } from "@/lib/definitions";

import CarouselImages from "@/components/layout/product/CarouselImages";
import ProductDetails from "@/components/layout/product/ProductDetails";
import ProductsTags from "@/components/layout/product/ProductTags";
import Loading from "@/components/Loading";
import { Link } from "@/navigation";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function getProduct(handle: string) {
  const res = await fetch(`${baseUrl}/api/products/${handle}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
}
export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const url = `${baseUrl}/products/${params.handle}`;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  return {
    title: product.productName,
    description: product.description,
    openGraph: url
      ? {
          url,
          title: product?.productName,
          images: [
            {
              width: 500,
              height: 320,
              alt: product?.productName,
              url: product?.mainProductImage,
            },
          ],
        }
      : null,
  };
}

const ProductPage = async ({ params }: { params: { handle: string } }) => {
  const handle = params.handle;
  const product = await getProduct(handle);

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<Loading />}>
        <Link
          className="mb-4 flex items-center bg-secondary w-fit py-2 px-3 rounded-lg"
          href="/"
        >
          <ArrowLeft className="me-2 h-4 w-4" />
          <span>Back to Products</span>
        </Link>
        <div className="grid md:grid-cols-2 gap-8">
          <CarouselImages product={product} />
          <ProductDetails product={product} />
        </div>
        <ProductsTags tags={product?.tags} />
      </Suspense>
    </div>
  );
};

export default ProductPage;
