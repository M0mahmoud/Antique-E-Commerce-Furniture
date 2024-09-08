import { verifySession } from "@/lib/session";
import { Link, redirect } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { SignInForm } from "./SignInForm";

const SignIn = async () => {
  const t = await getTranslations("Auth");
  const { isAuth } = await verifySession();
  if (isAuth) {
    redirect("/user");
  }
  return (
    <div className="flex flex-col p-4 lg:w-1/3 min-h-dvh justify-center mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{t("signInTitle")}</h1>
        <p className="text-gray-500">{t("enterEmailToSignIn")}</p>
      </div>
      <div className="mt-6">
        <SignInForm />
      </div>
      <div className="mt-4 text-center text-sm">
        {t("dontHaveAccount")}
        <Link className="underline" href="/auth/signup">
          {t("signUpHere")}
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
