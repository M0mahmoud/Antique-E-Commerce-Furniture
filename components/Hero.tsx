import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

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
        <section key={id} className="relative">
            <Image
                src="/bg.avif"
                alt="Hero background"
                className="object-cover object-center"
                fill
                rel=""
                priority
                fetchPriority="high"
                quality={90}
            />
            <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/5 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

            <div className="relative mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:flex lg:items-center lg:px-8">
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold text-primary sm:text-5xl">
                        {t("title")}
                        <strong className="block font-extrabold text-white">
                            {t("titleSt")}
                        </strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl leading-tight">
                        {t("text")}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <a
                            href="#benefits"
                            className="block w-fit rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/50 mx-auto sm:mx-0"
                        >
                            {t("btn")}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
