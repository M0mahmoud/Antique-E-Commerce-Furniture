import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Poppins } from "next/font/google";

import ClientProvider from "@/components/ClientProvider";
import { Toaster } from "@/components/ui/sonner";

import { routing } from "@/i18n/routing";
import { baseUrl } from "@/lib/definitions";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { notFound } from "next/navigation";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Furniture",
  description: "Modern Interior Design Studio",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
      <body suppressHydrationWarning className={poppins.className}>
        <NextIntlClientProvider messages={messages}>
          <ClientProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </ClientProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
