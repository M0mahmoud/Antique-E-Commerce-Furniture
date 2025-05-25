import { getTranslations } from "next-intl/server";
import Setup2FAForm from "./Setup2FAForm";

export default async function Auth2FAPage() {
  const t = await getTranslations("2fa");
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-gray-500">{t("description")}</p>
      </div>
      <div className="mt-6">
        <Setup2FAForm />
      </div>
    </>
  );
}
