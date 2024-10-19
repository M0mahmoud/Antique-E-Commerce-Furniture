"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { ProductDocument } from "@/lib/definitions";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const ProductCard: React.FC<ProductDocument> = ({
  _id,
  productName,
  category,
  description,
  price,
  mainProductImage,
  brand,
  availabilityStatus,
}) => {
  const router = useRouter();
  // const lnk = productName.replace(" ", "-");
  return (
    <div className="pb-5 mb-md-0">
      <div className="block relative pb-2 before:bottom-0 before:left-0 before:right-0 before:absolute before:content-[''] before:bg-slate-200 before:h-[70%] before:-z-[1] before:rounded-md before:transition-all hover:before:h-full">
        <Link href={`/product/${_id}`}>
          <Image
            alt="Product"
            src={mainProductImage}
            loading="lazy"
            width={216}
            height={216}
            className="mb-5 relative top-0 transition-all duration-300 ease-in-out mx-auto max-h-[216px] object-contain"
          />
        </Link>
        <div className="px-3">
          <span className="text-dark font-semibold text-sm text-start inline-flex w-full">
            {category}
          </span>

          <Link
            href={`/product/${_id}`}
            // href={`/product/${lnk}`}
            className="font-semibold text-primary text-lg mb-1 leading-none"
          >
            {productName}
          </Link>
          <p className="text-sm text-muted-foreground mb-2">
            {description.slice(0, 100)}...
          </p>
          <div className="flex justify-between items-center mt-4">
            <strong className="font-extrabold text-dark text-lg">
              ${price}
            </strong>
            <Button
              onClick={async () => {
                const res = await fetch("/api/cart", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    quantity: 1,
                    productId: _id,
                  }),
                });
                const result = await res.json();
                if (res.status === 201) {
                  toast.success(result.msg, {
                    action: {
                      label: "Show Cart",
                      onClick: () => router.push("/cart"),
                    },
                  });
                } else {
                  toast.error(result.msg);
                }
                console.log(`result:`, result);
              }}
              variant={"outline"}
              className="bg-transparent border-none outline-none hover:bg-transparent "
            >
              <ShoppingCart className="w-5 h-5  fill-primary text-primary" />
            </Button>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Badge variant="secondary">{brand}</Badge>
            <Badge
              variant={
                availabilityStatus === "inStock" ? "secondary" : "destructive"
              }
            >
              {availabilityStatus}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
