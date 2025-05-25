import { getTranslations } from "next-intl/server";
import Verify2FAForm from "./Verify2FAForm";



export default async function Verify2FAPage() {
  const t = await getTranslations("2fa");
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{t("verifyTitle")}</h1>
        <p className="text-gray-500">{t("verifyDescription")}</p>
      </div>
      <div className="mt-6">
        <Verify2FAForm />
      </div>
    </>
  );
}
