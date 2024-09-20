import Hero from "@/components/Hero";
import ProductCard from "@/components/layout/product/ProductCard";

const ShopPage = async () => {
  return (
    <>
      <Hero langKey="Hero.Shop" id="HeroSection" />
      <section className="product-section" id="all-product-section">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* {products.map((el) => (
              <ProductCard
                image={el.image}
                key={el.title}
                title={el.title}
                price={el.price}
                rating={el.rating}
              />
            ))} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
