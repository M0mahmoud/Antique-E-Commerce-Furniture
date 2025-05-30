"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types/products";
import Image from "next/image";
import { useState } from "react";

const CarouselImages = ({ product }: { product: Product | undefined }) => {
  console.log("🚀 ~ CarouselImages ~ product:", product);
  const [selectedImage, setSelectedImage] = useState(
    product && product?.main_image?.url
  );

  return (
    <div className="p-4">
      <div className="relative aspect-square mb-4 p-4">
        <Image
          src={selectedImage || "/products/product_1.png"}
          alt={product?.name || "Product"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
          loading="lazy"
        />
      </div>
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {[
            // TODO: Hard Code For Now
            "https://ik.imagekit.io/m05/product_11_9_vQnZkzi.png",
            "https://ik.imagekit.io/m05/product_22_skLUgBUwc.png",
            "https://ik.imagekit.io/m05/product_11_9_vQnZkzi.png",
            "https://ik.imagekit.io/m05/product_33_9bClN4p0B.png",
          ].map((image: string, index: number) => (
            <CarouselItem key={index} className="basis-1/3">
              <div className="p-1">
                <div
                  className="relative h-24 cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${product?.name} view ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                    className="rounded object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-primary text-black cursor-pointer" />
        <CarouselNext className="bg-primary text-black cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default CarouselImages;
