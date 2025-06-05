import ServicesCard from "@/components/layout/services/ServicesCard";
import { Link } from "@/i18n/routing";
import bag from "@/images/bag.svg";
import returnImg from "@/images/return.svg";
import support from "@/images/support.svg";
import truck from "@/images/truck.svg";
import { getTranslations } from "next-intl/server";

const ServicesPage = async () => {
  const t = await getTranslations("whyChooseSection");
  const s = await getTranslations("SupportSection");
  const p = await getTranslations("servicesPage");

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
      <section className="py-24">
        <div className="container mx-auto">
          <div className="mx-auto w-full pb-8 text-center">
            <h2 className="capitalize">{p("title")}</h2>
            <p>{p("description")}</p>
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
      <div className="container mx-auto">
        <div className="mx-auto max-w-lg w-full pt-8 pb-12 text-center">
          <h2 className="capitalize">{s("heading")}</h2>
          <p className="mb-8">{s("description")}</p>
          <Link
            href={"/contact"}
            className="px-4 py-4 rounded-md bg-secondary-foreground text-white"
          >
            {s("contactButton")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
