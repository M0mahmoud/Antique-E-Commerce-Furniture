import { Link } from "@/i18n/routing";
import { verifySession } from "@/lib/session";
import { ShoppingCart, User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import Search from "./Search";

const Navbar = async () => {
    const isAuth = await verifySession();
    const t = await getTranslations("header");

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
        <nav className="w-full bg-[#429365] py-5 lg:px-6">
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center justify-start">
                    <Image
                        alt="logo"
                        width={90}
                        height={50}
                        src="/an.svg"
                        className="object-cover"
                    />
                </Link>
                <div className="flex items-center justify-end w-full gap-6">
                    <ul className="hidden gap-6 text-lg text-white md:flex md:items-center md:justify-end">
                        {LINKS.map((el) => (
                            <li key={el.name}>
                                <Link
                                    href={el.href}
                                    className="text-lg text-nowrap"
                                >
                                    {el.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Search />
                    <div className="flex gap-2 items-center me-2">
                        <Link href={"/cart"} className="block text-nowrap">
                            <ShoppingCart className="h-5 text-white" />
                            <span className="sr-only">Cart</span>
                        </Link>
                        <Link
                            href={isAuth ? "/user" : "/auth/signup"}
                            className="block text-nowrap"
                        >
                            <User className="h-5 text-white" />
                            <span className="sr-only">User</span>
                        </Link>
                    </div>
                </div>

                <div className="block cursor-pointer md:hidden">
                    <MobileMenu />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
