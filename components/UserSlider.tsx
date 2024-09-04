"use client";

import { cn } from "@/lib/utils";
import { Link, usePathname, useRouter } from "@/navigation";
import {
  FolderHeart,
  ListOrdered,
  LogOut,
  MapPinHouse,
  User,
} from "lucide-react";

import { ReactNode } from "react";
import { Button } from "./ui/button";

const UserSlider = () => {
  const router = useRouter();
  return (
    <div className="md:w-1/4 bg-gray-100 px-4 py-8 rounded-lg">
      <nav>
        <ul className="space-y-4">
          <NavItem
            icon={<User className="h-5 w-5 me-2 inline-block" />}
            label="Account"
            href="/user"
          />
          <NavItem
            icon={<MapPinHouse className=" h-5 w-5 me-2 inline-block" />}
            label="Address"
            href="/user/address"
          />
          <NavItem
            icon={<ListOrdered className=" h-5 w-5 me-2 inline-block" />}
            label="Orders"
            href="/user/orders"
          />
          <NavItem
            icon={<FolderHeart className=" h-5 w-5 me-2 inline-block" />}
            label="Wishlist"
            href="/user/wishlist"
          />

          <li>
            <Button
              onClick={async () => {
                await fetch("/api/logout", { method: "POST" });
                router.push("auth/signup");
              }}
              className="font-medium text-xl mt-6 hover:bg-destructive bg-destructive/80 transition-colors text-white w-fit  text-start md:text-center"
            >
              <span>
                <LogOut className="text-white h-5 w-5 me-2 inline-block" />
              </span>
              Log Out
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserSlider;

const NavItem = ({
  icon,
  label,
  href,
}: {
  icon: ReactNode;
  label: string;
  href: string;
}) => {
  const pathName = usePathname();
  return (
    <li className="">
      <Link
        href={href}
        className={cn(
          `text-secondary-foreground hover:text-primary font-medium text-xl`,
          pathName === href ? "text-primary font-semibold" : ""
        )}
      >
        <span>{icon}</span>
        {label}
      </Link>
    </li>
  );
};
