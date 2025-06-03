import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Poppins, Cairo } from "next/font/google";

import ClientProvider from "@/components/ClientProvider";
import { Toaster } from "@/components/ui/sonner";

import { routing } from "@/i18n/routing";
import { baseUrl } from "@/lib/definitions";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Furniture",
  description: "Modern Interior Design Studio",
};

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <body
        suppressHydrationWarning
        className={`${locale === "en" ? poppins.className : cairo.className}`}
      >
        <NextIntlClientProvider messages={messages}>
          <ClientProvider>
            {children}
            <NextTopLoader color="#16a356" height={4} />
          </ClientProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
