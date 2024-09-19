import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Tajawal } from "next/font/google";

import ClientProvider from "@/components/ClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { baseUrl } from "@/lib/definitions";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Furniture",
  description: "Modern Interior Design Studio",
};

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
      <body suppressHydrationWarning className={tajawal.className}>
        <NextIntlClientProvider messages={messages}>
          <ClientProvider>{children}</ClientProvider>
          <Toaster position="top-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
