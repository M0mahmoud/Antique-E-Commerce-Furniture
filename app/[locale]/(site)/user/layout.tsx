"use client";

import UserSidebar from "@/components/UserSidebar";
import { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen sm:py-12">
            <main className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-row gap-4 sm:gap-8">
                        <UserSidebar />
                        <div className="w-full sm:flex-1">{children}</div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserLayout;
