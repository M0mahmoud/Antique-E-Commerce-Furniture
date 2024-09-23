import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { baseUrl } from "@/lib/definitions";

import ProductDetails from "@/components/layout/product/ProductDetails";
import { Link } from "@/navigation";
import { ArrowLeft, Loader } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
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
  const data = await getProduct(handle);

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense
        fallback={
          <div className="w-full h-dvh grid place-content-center">
            <Loader className="text-primary w-10 h-w-10 animate-spin" />
          </div>
        }
      >
        <Link className="mb-4 flex items-center" href={"/"}>
          <ArrowLeft className="me-2 h-4 w-4" />
          <span>Back to Products</span>
        </Link>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-4">
            <div className="relative aspect-square mb-4 p-4">
              <Image
                src={data.mainProductImage || "/placeholder.svg"}
                alt={data.productName}
                fill
                className="rounded-lg"
              />
            </div>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {[
                  "https://ik.imagekit.io/m05/product_11_9_vQnZkzi.png",
                  "https://ik.imagekit.io/m05/product_22_skLUgBUwc.png",
                  "https://ik.imagekit.io/m05/product_11_9_vQnZkzi.png",
                  "https://ik.imagekit.io/m05/product_33_9bClN4p0B.png",
                ].map((image: string, index: number) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <div className="p-1">
                      <div className="relative h-24">
                        <Image
                          src={image}
                          alt={`${data.productName} view ${index + 1}`}
                          fill
                          className="rounded bg-cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-primary text-black cursor-pointer w-8 h-8" />
              <CarouselNext className="bg-primary text-black cursor-pointer w-8 h-8" />
            </Carousel>
          </div>
          <ProductDetails product={data} />
        </div>
        {data.tags && data.tags.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default ProductPage;
