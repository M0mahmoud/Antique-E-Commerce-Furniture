import { Button } from "@/components/ui/button";
import { ProductDocument } from "@/lib/definitions";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const ProductCard: React.FC<ProductDocument> = ({
  price,
  productName,
  mainProductImage,
  category,
}) => {
  return (
    <div className="pb-5 mb-md-0">
      <div className="block relative pb-2 cursor-pointer before:bottom-0 before:left-0 before:right-0 before:absolute before:content-[''] before:bg-slate-200 before:h-[70%] before:-z-[1] before:rounded-md before:transition-all hover:before:h-full">
        <Image
          alt="Product"
          src={mainProductImage}
          loading="lazy"
          width={216}
          height={216}
          className="mb-5 relative top-0 transition-all duration-300 ease-in-out mx-auto max-h-[216px] object-contain"
        />
        <span className="text-dark font-semibold text-sm text-start inline-flex w-full ms-3">
          {category}
        </span>

        <h3 className="ms-3 font-semibold text-primary text-lg mb-1 leading-none">
          {productName}
        </h3>

        <div className="flex justify-between items-center mx-3 mt-4">
          <strong className="font-extrabold text-dark text-lg">${price}</strong>
          <Button
            variant={"outline"}
            className="bg-transparent border-none outline-none hover:bg-transparent "
          >
            <ShoppingCart className="w-5 h-5  stroke-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
