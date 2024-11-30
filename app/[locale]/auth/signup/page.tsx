import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import SignupForm from "./SignupForm";

const SignUp = async () => {
    const t = await getTranslations("Auth");

    return (
        <>
            <SignupForm />
            <div className="mt-6 text-center">
                {t("alreadyHaveAccount")}{" "}
                <Link className="underline" href="/auth/signin">
                    {t("signInHere")}
                </Link>
            </div>
        </>
    );
};

export default SignUp;
