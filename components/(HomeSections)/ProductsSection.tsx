import ProductCard from "@/components/layout/product/ProductCard";
import { Button } from "@/components/ui/button";
import product_1 from "@/images/products/product_1.png";
import product_11 from "@/images/products/product_11.png";
import product_2 from "@/images/products/product_2.png";
import product_22 from "@/images/products/product_22.png";
import product_3 from "@/images/products/product_3.png";
import product_33 from "@/images/products/product_33.png";
import product_4 from "@/images/products/product_4.png";
import { Link } from "@/navigation";

const ProductsSection = () => {
  const products = [
    {
      image: product_22.src,
      title: "Sakarias Armchair",
      price: (Math.random() * 99 + 1).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
    },
    {
      image: product_11.src,
      title: "Sakarias Armchair",
      price: (Math.random() * 99 + 1).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
    },
    {
      image: product_33.src,
      title: "Sakarias Armchair",
      price: (Math.random() * 99 + 1).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
    },
    {
      image: product_1.src,
      title: "Sakarias Armchair",
      price: (Math.random() * 99 + 1).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
    },
    {
      image: product_2.src,
      title: "Sakarias Armchair",
      price: (Math.random() * 99 + 1).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
    },
    {
      image: product_3.src,
      title: "Sakarias Armchair",
      price: (Math.random() * 99 + 1).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
    },
    {
      image: product_4.src,
      title: "Sakarias Armchair",
      price: (Math.random() * 99 + 1).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
    },
  ];
  return (
    <section className="py-12 md:py-16" id="product-section">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="col-span-2 sm:col-span-1 mb-6 sm:mb-0 flex flex-col gap-5 justify-center items-center">
            <h2 className="mb-4 font-bold text-2xl">
              Crafted with excellent material.
            </h2>
            <p className="mb-4">
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
              velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>

            <Link
              href="/shop"
              className="bg-primary p-3 text-lg font-medium rounded-md text-white self-start"
            >
              Explore
            </Link>
          </div>
          {products.map((el) => (
            <ProductCard
              image={el.image}
              key={el.title}
              title={el.title}
              price={el.price}
              rating={el.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
