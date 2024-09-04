import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "./ui/button";

const Hero = ({
  langKey,
  id,
}: {
  langKey: string;
  id: string;
  img?: string;
  classes?: string;
}) => {
  const t = useTranslations(langKey);
  return (
    <section
      className={`bg-greeen overflow-hidden relative py-16 h-ful`}
      id={id}
    >
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center h-full *:text-center">
          <h1 className="font-bold mb-3 text-4xl leading-tight lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mb-6 font-medium text-lg">{t("text")}</p>
          <Button className="btn-primary font-semibold text-lg px-4 py-2">
            {t("btn")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
