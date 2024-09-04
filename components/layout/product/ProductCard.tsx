import { Button } from "@/components/ui/button";
import { ShoppingBag, Star } from "lucide-react";
import Image from "next/image";

const ProductCard = ({
  image,
  title,
  price,
  rating,
}: {
  image: string;
  title: string;
  rating: Number;
  price: string;
}) => {
  return (
    <div className="pb-5 mb-md-0">
      <div className="block relative pb-2 cursor-pointer before:bottom-0 before:left-0 before:right-0 before:absolute before:content-[''] before:bg-slate-200 before:h-[70%] before:-z-[1] before:rounded-md before:transition-all hover:before:h-full">
        <Image
          alt="Product"
          src={image}
          loading="lazy"
          width={216}
          height={216}
          className="mb-5 relative top-0 transition-all duration-300 ease-in-out mx-auto"
        />
        <span className="text-dark font-semibold text-sm text-start inline-flex w-full ms-3">
          Chair
        </span>

        <h3 className="ms-3 font-semibold text-primary text-lg mb-1 leading-none">
          {title}
        </h3>
        <span className="ms-3 flex gap-1 items-center justify-start">
          {[...Array(rating)].map((_, index) => (
            <Star
              key={index}
              className="w-5 h-5 fill-yellow-400 stroke-yellow-400 me-[2px] inline"
            />
          ))}
        </span>

        <div className="flex justify-between items-center mx-3 mt-4">
          <strong className="font-extrabold text-dark text-lg">${price}</strong>
          <Button
            variant={"outline"}
            className="bg-transparent border-none outline-none hover:bg-transparent "
          >
            <ShoppingBag className="w-5 h-5  stroke-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
