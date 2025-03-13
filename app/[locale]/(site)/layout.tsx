import Footer from "@/components/Footer";
import Navbar from "@/components/layout/navbar";
import { AlertCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations("devAlert");
  return (
    <>
      <div className="w-full bg-red-600 text-white px-4 py-4">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm font-medium mb-0">{t("message")}</p>
        </div>
      </div>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
