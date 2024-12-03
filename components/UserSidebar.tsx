"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
    Heart,
    LayoutDashboard,
    LogOut,
    MapPin,
    ShoppingBag,
    Truck,
    User,
} from "lucide-react";

import { useAuth } from "@/context/usercontext";

const navigation = [
    {
        name: "Dashboard",
        href: "/user",
        icon: LayoutDashboard,
    },
    {
        name: "Wishlist",
        href: "/user/wishlist",
        icon: Heart,
    },
    {
        name: "Orders",
        href: "/user/orders",
        icon: ShoppingBag,
    },
    {
        name: "Track Your Order",
        href: "/user/track",
        icon: Truck,
    },
    {
        name: "My Address",
        href: "/user/address",
        icon: MapPin,
    },
    {
        name: "Account details",
        href: "/user/account",
        icon: User,
    },
];

const UserSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { clearAuth } = useAuth();

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
                                isActive
                                    ? "bg-primary text-white"
                                    : "hover:bg-primary/20"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="hidden sm:inline-block">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
                <button
                    onClick={() => {
                        clearAuth();
                        router.push("/auth/signup");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="hidden sm:inline-block">Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default UserSidebar;
