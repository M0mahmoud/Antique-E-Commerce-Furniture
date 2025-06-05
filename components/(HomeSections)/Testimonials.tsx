"use client";

import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useLocale, useTranslations } from "next-intl";

type Testimonial = {
  id: number;
  name: string;
  quote: string;
  avatar: string;
};

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();

  // Get testimonials from translations
  const testimonials: Testimonial[] = t
    .raw("customers")
    .map((customer: any, index: number) => ({
      id: index + 1,
      name: customer.name,
      quote: customer.quote,
      avatar: "FROM_BACKEND",
    }));

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t("title")}
        </h2>
        <Carousel
          className="w-full max-w-screen-xl mx-auto"
          opts={{
            align: "start",
            loop: true,
            direction: locale === "ar" ? "rtl" : "ltr",
          }}
          plugins={[
            Autoplay({
              delay: 2500,
              stopOnFocusIn: false,
              stopOnLastSnap: false,
            }),
          ]}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/3">
                <TestimonialItem index={index} testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

function TestimonialItem({
  testimonial,
  index,
}: {
  index: number;
  testimonial: Testimonial;
}) {
  return (
    <div className="p-1 h-full">
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm select-none h-full flex flex-col">
        <Quote className="w-8 h-8 text-green-600 mb-4 flex-shrink-0" />
        <blockquote className="text-gray-700 mb-4 flex-grow">
          &quot;{testimonial.quote}&quot;
        </blockquote>
        <div className="flex items-center mt-auto">
          <Image
            src={`/person_${(index % 4) + 1}.jpg`}
            alt={testimonial.name}
            width={50}
            height={50}
            className="rounded-full mr-4 flex-shrink-0"
            loading="lazy"
          />
          <div>
            <cite className="font-semibold text-gray-900 not-italic">
              {testimonial.name}
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}
