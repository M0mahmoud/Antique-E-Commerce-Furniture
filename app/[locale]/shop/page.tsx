import product_1 from "@/images/products/product_1.png";
import product_11 from "@/images/products/product_11.png";
import product_2 from "@/images/products/product_2.png";
import product_22 from "@/images/products/product_22.png";
import product_3 from "@/images/products/product_3.png";
import product_33 from "@/images/products/product_33.png";
import product_4 from "@/images/products/product_4.png";
import product_5 from "@/images/products/product_5.png";
import product_7 from "@/images/products/product_7.png";
import product_8 from "@/images/products/product_8.png";

import Hero from "@/components/Hero";
import ProductCard from "@/components/layout/product/ProductCard";

const ShopPage = async () => {
  const products = [
    {
      image: product_22.src,
      title: "Sakarias Armchair",
      price: (Math.random() * 99 + 1).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
    },
    {
      image: product_5.src,
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
      image: product_11.src,
      title: "Sakarias Armchair",
      price: (Math.random() * 99 + 1).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
    },
    {
      image: product_7.src,
      title: "Sakarias Armchair",
      price: (Math.random() * 99 + 1).toFixed(2),
      rating: Math.floor(Math.random() * 5) + 1,
    },
    {
      image: product_8.src,
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
    <>
      <Hero langKey="Hero.Shop" id="HeroSection" />
      <section className="product-section" id="all-product-section">
        <div className="container">
          {/* <div className="row">
              <div className="col-lg-12">
                <div className="product_top_bar d-flex justify-content-between align-items-center mb-4 flex-wrap gap-4">
                  <div className="single_product_menu">
                    <p>
                      <span>345</span> Prodict Found
                    </p>
                  </div>
                  <div className="single_product_menu d-flex">
                    <form className="input-group form-group">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="search about product"
                        aria-describedby="inputGroupPrepend"
                      />
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text w-100 h-100"
                          id="inputGroupPrepend"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{ width: "1em", height: "1em" }}
                          >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                          </svg>
                        </span>
                      </div>
                    </form>
                  </div>
                  <div className="single_product_menu d-flex align-items-center">
                    <h5 className="mb-0 me-2 text-nowrap">short by:</h5>
                    <select className="form-select">
                      <option data-display="Select">name</option>
                      <option value="price">price</option>
                      <option value="product">product</option>
                    </select>
                  </div>
                </div>
              </div>
            </div> */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
    </>
  );
};

export default ShopPage;
