"use client";

import UserSlider from "@/components/UserSlider";
import { UserProvider } from "@/store/User-context";
import { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <main className="py-8 container mx-auto">
        <h1 className="text-center w-full text-2xl md:text-4xl text-primary font-bold mb-8">
          My Account
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
          <UserSlider />
          <div className="w-full md:w-3/4 mt-8 md:mt-0">{children}</div>
        </div>
      </main>
    </UserProvider>
  );
};

export default UserLayout;
