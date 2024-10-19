"use client";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/routing";
import { AlignJustify, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const MobileMenu = ({ isLogin }: { isLogin: boolean }) => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMobileMenu = () => setIsOpen((prev) => !prev);
  const t = useTranslations("header");

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
    {
      name: t(`nav.${isLogin ? "isauth" : "noauth"}`),
      href: isLogin ? "/user" : "/auth/signin",
    },
  ];
  return (
    <>
      <button
        onClick={toggleMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 md:hidden"
      >
        <AlignJustify className="h-7 w-7 text-white" />
      </button>
      <Sheet open={isOpen} onOpenChange={() => toggleMobileMenu()}>
        <SheetContent className="border-accent-foreground bg-accent-foreground py-2">
          <div className="flex flex-col justify-center items-center h-full ">
            <form action="/search" className="w-4/5 relative mx-auto mt-6">
              <Input
                key={searchParams?.get("q")}
                type="text"
                name="q"
                placeholder={t("input")}
                autoFocus={false}
                defaultValue={searchParams?.get("q") || ""}
                className="leading-relaxed text-md w-full bg-transparent rounded-md border px-4 py-2 text-white placeholder:text-white md:text-sm  focus-visible:ring-0 focus-visible:ring-offset-0 items-center"
              />
              <div
                className="absolute ltr:right-0 rtl:left-0 top-0 me-3 flex h-full items-center cursor-pointer"
                role="button"
              >
                <Search className="h-4 text-white" />
              </div>
            </form>
            <ul className="gap-4 text-lg flex items-center justify-center text-white flex-col py-6 mb-4">
              {LINKS.map((el) => (
                <li key={el.name}>
                  <Link
                    href={el.href}
                    className="text-nowrap font-medium"
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
