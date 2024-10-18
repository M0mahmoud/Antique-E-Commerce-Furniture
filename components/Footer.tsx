import { Link } from "@/navigation";

import { getTranslations } from "next-intl/server";
import Image from "next/image";

const Footer = async () => {
  const f = await getTranslations("footer");
  const h = await getTranslations("header");

  const LINKS = [
    {
      name: h("nav.home"),
      href: "/",
    },
    {
      name: h("nav.shop"),
      href: "/shop",
    },
    {
      name: h("nav.services"),
      href: "/services",
    },
    {
      name: h("nav.about"),
      href: "/about",
    },
    {
      name: h("nav.contact"),
      href: "/contact",
    },
  ];
  return (
    <footer className="pt-20 pb-6 bg-greeen" id="footer-section">
      <div className="container mx-auto relative">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <div className="mb-4">
              <Link href="/" className="flex items-center justify-start">
                <Image
                  alt="logo"
                  width={90}
                  height={90}
                  style={{ width: "90px", height: "auto" }}
                  src="/anD.svg"
                />
              </Link>
            </div>
            <p className="mb-4 text-gray-700 w-full sm:max-w-52">
              {f("description")}
            </p>

            <ul className="flex space-x-6">
              <li>
                <Link href="#" className="group">
                  <span className="flex items-center justify-center w-10 h-10  text-primary rounded-full group-hover:bg-primary-foreground ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" className="group">
                  <span className="flex items-center justify-center w-10 h-10  text-primary rounded-full group-hover:bg-primary-foreground ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" className="group">
                  <span className="flex items-center justify-center w-10 h-10  text-primary rounded-full group-hover:bg-primary-foreground ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" className="group">
                  <span className="flex items-center justify-center w-10 h-10  text-primary rounded-full group-hover:bg-primary-foreground ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.3 15.3-58 .3-61.5-14.2-2.6-17.2-13.6-4.2-20.2 15-7.5 30.4-20.7 40.4-33.5 6.3-8.1 17.8-26.2 23.3-40.2 12.4-32.3 7.1-61.6 1.5-68.5-4.9-5.8-3.5-14.2 1.5-18.5 17.4-15.4 29.6-35.5 36.3-57.5 4-12.3 22.5-48.7 11.6-63.8-9-12.1-23.8-8.1-35.6-6-14.6 2.6-28.6 9.3-40.3 18.4-8.4 6.3-29.5 22.8-40.5 19.5-11.5-3.4-1.6-28.7 1.7-34.7 7.6-14.1 29.8-33.5 43.5-40.9 29.3-15.5 63.4-19.8 96.3-13.4 17 3.2 33 10.7 46.9 20.8 13.3 9.6 25.2 21.5 35.1 35.1 22.2 30.3 35.4 67.8 37.1 105.6.9 19.9-1.4 40.6-6.5 59.8-2.8 10.6-12.2 35.4-22.2 39.7-6.4 2.7-15.2-1.2-18.4-7.6-6.3-11.9 1.5-28.8 6.3-40.6 4.3-10.7 9.2-21.3 11.3-32.7 3.2-17.1 2.1-35.6-1.5-52.5-7.4-32.9-30.2-60.8-60.8-75.8-36.2-18.4-79.1-20.1-117.5-8.3-41.6 12.6-77.8 43.6-95.5 83.9-14.6 32.9-16.8 70.4-7.4 104.7 5.3 19.5 15.1 36.3 32.2 47.5 11.4 7.3 26.7 8.8 40.4 5.2 3.1-.8 6.3-2 9.5-3 2.8-.9 7.2-2.4 9.3-5 .8-1 .6-1.7-.6-3.6-12-17.3-34.8-48.2-10.3-64.5 10.1-6.6 25.5-6.6 35.5 1.5 12.2 10.5 9.1 28.7 6.3 42.4-3.8 17.4-15.6 30.9-29.6 41.2-11.3 8.4-24.7 16.2-35.9 25.5-20.5 16.6-15.4 28.5 7 33.8 36.1 8.6 73.5 10.4 110.3 3.7 38.8-7 75.6-23.8 106-49.1 34.4-28.5 61.4-67.3 77.3-110.1 10.6-29.5 16.1-60.9 16.2-92.3z" />
                    </svg>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-2/3 flex flex-wrap">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                {f("explore")}
              </h3>
              <ul className="space-y-3">
                {LINKS.map((el) => (
                  <li key={el.name}>
                    <Link
                      href={el.href}
                      className="text-dark hover:text-primary transition-colors"
                    >
                      {el.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                {f("visit")}
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-600">{f("address")}</li>
                <li className="text-gray-600">
                  <span className="font-medium">{f("phone")}</span> (123)
                  456-7890
                </li>
                <li className="text-gray-600">
                  <span className="font-medium">{f("email")}</span>{" "}
                  info@furniture.com
                </li>
              </ul>
            </div>

            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                {f("legal")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    {f("legal1")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    {f("legal2")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    {f("legal3")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 text-center">
          <p className="text-gray-600">
            &copy; 2023 Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
