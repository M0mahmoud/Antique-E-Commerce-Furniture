import { verifySession } from "@/lib/session";
import { Link, redirect } from "@/navigation";
import { getTranslations } from "next-intl/server";
import SignupForm from "./SignupForm";

const SignUp = async () => {
  const t = await getTranslations("Auth");
  const { isAuth } = await verifySession();
  if (isAuth) {
    redirect("/user");
  }
  return (
    <div className="flex flex-col p-4 lg:w-1/3 min-h-dvh justify-center mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{t("createAccount")}</h1>
        <p className="text-gray-500">{t("enterYourInfo")}</p>
      </div>
      <div className="mt-6">
        <SignupForm />
      </div>
      <div className="mt-6 text-center">
        {t("alreadyHaveAccount")}
        <Link className="underline" href="/auth/signin">
          {t("signInHere")}
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
