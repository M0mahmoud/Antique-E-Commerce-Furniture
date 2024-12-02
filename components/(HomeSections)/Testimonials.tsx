"use client";

import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

type Testimonial = {
    id: number;
    name: string;
    quote: string;
    avatar: string;
};

const testimonials: Testimonial[] = [
    {
        id: 31,
        name: "Sarah Johnson",
        quote: "The quality of furniture from this store is unmatched. My clients are always impressed with the pieces I source from here.",
        avatar: "FROM_BACKEND",
    },
    {
        id: 1346,
        name: "Sarah Johnson",
        quote: "The quality of furniture from this store is unmatched. My clients are always impressed with the pieces I source from here.",
        avatar: "FROM_BACKEND",
    },
    {
        id: 132,
        name: "Sarah Johnson",
        quote: "The quality of furniture from this store is unmatched. My clients are always impressed with the pieces I source from here.",
        avatar: "FROM_BACKEND",
    },
    {
        id: 167,
        name: "Sarah Johnson",
        quote: "The quality of furniture from this store is unmatched. My clients are always impressed with the pieces I source from here.",
        avatar: "FROM_BACKEND",
    },
    {
        id: 23,
        name: "Michael Chen",
        quote: "I furnished my entire living room with their products. The customer service and delivery experience were exceptional.",
        avatar: "FROM_BACKEND",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        quote: "As an architect, I appreciate the attention to detail in their furniture. It's both functional and aesthetically pleasing.",
        avatar: "FROM_BACKEND",
    },
];
export default function Testimonials() {
    return (
        <section>
            <div className="container mx-auto">
                <h2 className="text-center">What Our Customers Say</h2>
                <Carousel
                    className="w-full max-w-screen-xl"
                    opts={{
                        align: "start",
                        loop: true,
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
                            <CarouselItem
                                key={testimonial.id}
                                className="md:basis-1/3"
                            >
                                <TestimonialItem
                                    index={index}
                                    testimonial={testimonial}
                                />
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
        <div className="p-1">
            <div
                key={testimonial.id}
                className="bg-gray-50 rounded-lg p-6 shadow-sm select-none"
            >
                <Quote className="w-8 h-8 text-green-600 mb-4" />
                <blockquote className="text-gray-700 mb-4">
                    {testimonial.quote}
                </blockquote>
                <div className="flex items-center">
                    <Image
                        src={`/person_${(index % 4) + 1}.jpg`}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
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
