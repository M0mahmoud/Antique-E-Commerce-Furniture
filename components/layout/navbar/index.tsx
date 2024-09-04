import { verifySession } from "@/lib/session";
import { Link } from "@/navigation";
import { User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import Search from "./Search";

const Navbar = async () => {
  const t = await getTranslations("header");
  const { isAuth } = await verifySession();
  const LINKS = [
    {
      name: t("nav.home"),
      href: "/",
    },
    {
      name: t("nav.shop"),
      href: "/shop",
    },
    {
      name: t("nav.services"),
      href: "/services",
    },
    {
      name: t("nav.about"),
      href: "/about",
    },
    {
      name: t("nav.contact"),
      href: "/contact",
    },
  ];

  return (
    <nav className="flex items-center justify-between p-4 lg:px-6 bg-[#429365]">
      <Link
        href="/"
        prefetch={true}
        className="flex items-center justify-start"
      >
        <Image alt="logo" width={90} height={90} src="/an.svg" />
      </Link>
      <div className="flex w-full items-center justify-end gap-6">
        <ul className="hidden gap-6 text-lg md:flex md:items-center md:justify-end text-white">
          {LINKS.map((el) => (
            <li key={el.name}>
              <Link href={el.href} className="text-nowrap text-lg">
                {el.name}
              </Link>
            </li>
          ))}
        </ul>

        <Search />

        <Link
          href={isAuth ? "/user" : "/auth/signup"}
          className="text-nowrap hidden md:block"
        >
          <User className="h-5 text-white" />
        </Link>
      </div>

      <div className="block md:hidden cursor-pointer">
        <MobileMenu isLogin={isAuth} />
      </div>
    </nav>
  );
};

export default Navbar;
