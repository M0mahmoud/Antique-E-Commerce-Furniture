import Image from "next/image";
import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex max-h-dvh">
            <div className="md:w-1/2 w-full">
                <div className="flex flex-col p-4 w-full max-w-md min-h-dvh justify-center mx-auto">
                    {children}
                </div>
            </div>
            <div className="w-1/2 hidden md:block relative">
                <Image
                    src="/auth.jpg"
                    alt="Auth Background"
                    priority
                    fill
                    className="object-cover object-center max-h-dvh"
                />
            </div>
        </main>
    );
}
