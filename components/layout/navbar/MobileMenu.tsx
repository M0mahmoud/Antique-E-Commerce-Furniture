"use client";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Link } from "@/i18n/routing";
import {
  AlignJustify,
  Search,
  ShoppingCart,
  User,
  UserPlus,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const MobileMenu = ({ isAuth }: { isAuth: boolean }) => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMobileMenu = () => setIsOpen((prev) => !prev);
  const t = useTranslations("header");
  const locale = useLocale();

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
    <>
      <div className="flex items-center gap-2">
        {isAuth ? (
          <>
            <Link href={"/cart"} className="block text-nowrap md:hidden">
              <ShoppingCart className="h-5 text-white" />
              <span className="sr-only">Cart</span>
            </Link>
            <Link href="/user" className="block text-nowrap md:hidden">
              <User className="h-5 text-white" />
            </Link>
          </>
        ) : (
          <Link href={"/auth/signup"} className="block text-nowrap md:hidden">
            <UserPlus className="h-5 text-white" />
          </Link>
        )}
        <button
          onClick={toggleMobileMenu}
          aria-label="Open mobile menu"
          className="flex items-center justify-center w-8 h-8 border rounded-md border-neutral-200 md:hidden"
        >
          <AlignJustify className="w-6 h-6 text-white" />
        </button>
      </div>
      <Sheet open={isOpen} onOpenChange={() => toggleMobileMenu()}>
        <SheetContent className="py-2 border-accent-foreground bg-accent-foreground">
          <div className="flex flex-col items-center justify-center h-full ">
            <form
              action={`${locale}/shop`}
              className="relative w-4/5 mx-auto mt-6"
            >
              <Input
                type="text"
                name="q"
                autoFocus={false}
                placeholder={t("input")}
                defaultValue={searchParams?.get("q") || ""}
                className="items-center w-full px-4 py-2 leading-relaxed text-white bg-transparent border rounded-md text-md placeholder:text-white md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div
                className="absolute top-0 flex items-center h-full cursor-pointer ltr:right-0 rtl:left-0 me-3"
                role="button"
              >
                <Search className="h-4 text-white" />
              </div>
            </form>
            <ul className="flex flex-col items-center justify-center gap-4 py-6 mb-4 text-lg text-white">
              {LINKS.map((el) => (
                <li key={el.name}>
                  <Link
                    href={el.href}
                    className="font-medium text-nowrap"
                    onClick={toggleMobileMenu}
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileMenu;
