"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";

const UserSidebar = () => {
  const t = useTranslations("userSidebar");
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    {
      name: t("profile"),
      href: "/user",
      icon: LayoutDashboard,
    },
    {
      name: t("wishlist"),
      href: "/user/wishlist",
      icon: Heart,
    },
    {
      name: t("orders"),
      href: "/user/orders",
      icon: ShoppingBag,
    },
    {
      name: t("trackOrder"),
      href: "/user/track",
      icon: Truck,
    },
    {
      name: t("accountDetails"),
      href: "/user/account",
      icon: User,
    },
  ];

  return (
    <nav className="md:w-64 flex-shrink-0">
      <div className="space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg",
                "transition-colors duration-200",
                isActive ? "bg-primary text-white" : "hover:bg-primary/20"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden sm:inline-block">{item.name}</span>
            </Link>
          );
        })}
        <button
          onClick={() => {
            Cookies.remove("AntiqueToken");
            router.push("/auth/signup");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden sm:inline-block">{t("logout")}</span>
        </button>
      </div>
    </nav>
  );
};

export default UserSidebar;
