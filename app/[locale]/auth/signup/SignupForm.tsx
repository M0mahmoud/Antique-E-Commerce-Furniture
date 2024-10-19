"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/routing";
import { baseUrl } from "@/lib/definitions";
import { signupAction } from "@/server/auth";
import { CreateEmailToken, SendEmail } from "@/server/email";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";

const SignupForm = () => {
  const t = useTranslations("Auth");
  const router = useRouter();
  const locale = useLocale();

  const [state, action, isPending] = useActionState(signupAction, undefined);

  useEffect(() => {
    if (state?.success === true) {
      router.push("/user");
    }
  }, [state?.success, router]);

  // const path = window.location.pathname;
  // const [, locale] = path.split("/");

  return (
    <form
      action={async (form) => {
        action(form);
        // TODO: Refactor
        const email = form.get("email") as string;
        const createToken = await CreateEmailToken(email);
        const link = `${baseUrl}/${locale}/e?token=${createToken}`;
        await SendEmail({
          email: email,
          subject: "Confirm Your Email",
          title: "Confirm Your Email",
          paraghraph:
            "Thank you for signing up! Please confirm your email address by clicking the link we've sent to your inbox. If you didn't receive the email, be sure to check your spam or junk folder.",
          link,
          linktext: "Confirm Now!",
        });
      }}
    >
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ahmed Ali"
            className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
          />
        </div>
        {state?.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}

        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            name="email"
            placeholder="john@example.com"
            className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3 text-left placeholder:text-left"
          />
        </div>
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
        <div>
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
          />
        </div>
        {state?.errors?.password && (
          <div className="text-sm text-red-500">
            <p className="mb-0">Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <Button
          aria-disabled={isPending}
          type="submit"
          className="mt-4 w-full text-white py-2 px-4 "
        >
          {isPending ? t("submitting") : t("signUpHere")}
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
