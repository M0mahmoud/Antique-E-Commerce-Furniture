import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import SignInForm from "./SignInForm";

export default async function SignIn() {
  const t = await getTranslations("Auth");
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">{t("signInTitle")}</h1>
        <p className="text-gray-500">{t("enterEmailToSignIn")}</p>
      </div>
      <div className="mt-6">
        <SignInForm />
      </div>
      <div className="mt-4 text-center">
        {t("dontHaveAccount")}{" "}
        <Link className="underline" href="/auth/signup">
          {t("signUpHere")}
        </Link>
      </div>
    </>
  );
}
