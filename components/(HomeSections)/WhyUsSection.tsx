import ServicesCard from "@/components/layout/services/ServicesCard";
import bag from "@/images/bag.svg";
import returnImg from "@/images/return.svg";
import support from "@/images/support.svg";
import truck from "@/images/truck.svg";
import whyUsImage from "@/images/why-choose-us-img.jpg";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const WhyUsSection = async () => {
  const t = await getTranslations("whyChooseSection");
  const features = [
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
    <section className="" id="why-choose-section">
      <div className="container mx-auto">
        <div className="flex justify-center gap-8 items-center flex-col md:flex-row">
          <div className="w-fit">
            <h2 className="">{t("title")}</h2>
            <p className="text-lg">{t("description")}</p>

            <div className="grid grid-cols-2 place-items-center my-5 gap-3">
              {features.map((el) => (
                <ServicesCard
                  description={el.descriptionKey}
                  img={el.imgSrc}
                  title={el.titleKey}
                  key={el.titleKey}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-3/5">
            <div className="w-full h-full relative before:content-[''] before:absolute before:w-[255px] before:h-[217px] before:bg-[url('../../images/dots-yellow.svg')] before:bg-no-repeat before:bg-contain before:transform before:-translate-x-1/3 before:-translate-y-1/3 before:z-[-1]">
              <Image
                src={whyUsImage}
                alt="Image"
                width={370}
                height={430}
                className="bg-cover w-full rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
