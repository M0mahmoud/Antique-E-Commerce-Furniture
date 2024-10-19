import { Link } from "@/i18n/routing";
import { verifySession } from "@/lib/session";
import { ShoppingCart, User, UserPlus } from "lucide-react";
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
      name: t("nav.contact"),
      href: "/contact",
    },
  ];

  return (
    <nav className="w-full bg-[#429365] p-4 lg:px-6">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center justify-start">
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

          {isAuth ? (
            <>
              <Link href={"/cart"} className="text-nowrap hidden md:block">
                <ShoppingCart className="h-5 text-white" />
                <span className="sr-only">Cart</span>
              </Link>
              <Link href="/user" className="text-nowrap hidden md:block">
                <User className="h-5 text-white" />
              </Link>
            </>
          ) : (
            <Link href={"/auth/signup"} className="text-nowrap hidden md:block">
              <UserPlus className="h-5 text-white" />
            </Link>
          )}
        </div>

        <div className="block md:hidden cursor-pointer">
          <MobileMenu isLogin={isAuth} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
