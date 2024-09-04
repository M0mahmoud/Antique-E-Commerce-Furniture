import ProductsSection from "@/app/(HomeSections)/ProductsSection";
import Hero from "@/components/Hero";
import ServicesCard from "@/components/layout/services/ServicesCard";
import bag from "@/images/bag.svg";
import couch from "@/images/couch.png";
import returnImg from "@/images/return.svg";
import support from "@/images/support.svg";
import truck from "@/images/truck.svg";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
const ServicesPage =async () => {
  const t =await  getTranslations("whyChooseSection");
  const features = [
    {
      imgSrc: support,
      titleKey: t("support247.title"),
      descriptionKey: t("support247.description"),
    },
    {
      imgSrc: bag,
      titleKey: t("easyToShop.title"),
      descriptionKey: t("easyToShop.description"),
    },
    {
      imgSrc: returnImg,
      titleKey: t("hassleFreeReturns.title"),
      descriptionKey: t("hassleFreeReturns.description"),
    },
    {
      imgSrc: truck,
      titleKey: t("fastFreeShipping.title"),
      descriptionKey: t("fastFreeShipping.description"),
    },
    {
      imgSrc: truck,
      titleKey: t("fastFreeShipping.title"),
      descriptionKey: t("fastFreeShipping.description"),
    },
    {
      imgSrc: bag,
      titleKey: t("easyToShop.title"),
      descriptionKey: t("easyToShop.description"),
    },
    {
      imgSrc: support,
      titleKey: t("support247.title"),
      descriptionKey: t("support247.description"),
    },
    {
      imgSrc: returnImg,
      titleKey: t("hassleFreeReturns.title"),
      descriptionKey: t("hassleFreeReturns.description"),
    },
  ];
  return (
    <>
      <Hero langKey="Hero.Services" img={couch.src} id="HeroSection" />
      <section className="">
        <div className="container mx-auto">
          <div className="mx-auto w-full pb-8 text-center">
            <h2 className="capitalize">Welcome Services Page</h2>
            <p>
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
              quis nisl dapibus malesuada. Nullam ac aliquet velit.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center my-5 gap-3">
            {features.map((el, index) => (
              <ServicesCard
                description={el.descriptionKey}
                img={el.imgSrc}
                title={el.titleKey}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
      <ProductsSection />
      <div className="container mx-auto">
        <div className="mx-auto max-w-lg w-full pt-8 pb-12 text-center">
          <h2 className="capitalize">Looking for support?</h2>
          <p className="mb-8">
            We might already have what you’re looking for. See our FAQs or head
            to our dedicated Help Center.
          </p>
          <Link
            href={"/contact"}
            className="px-4 py-4 rounded-md bg-secondary-foreground text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
