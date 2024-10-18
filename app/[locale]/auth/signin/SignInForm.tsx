"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/navigation";
import { loginAction } from "@/server/auth";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";

export function SignInForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [state, action, isPending] = useActionState(loginAction, undefined);

  useEffect(() => {
    if (state?.success === true) {
      router.push("/user");
    }
  }, [state?.success, router]);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            name="email"
            placeholder="user@gmail.com"
            type="email"
            className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3 text-left placeholder:text-left"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            id="password"
            type="password"
            name="password"
            className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <Button
          aria-disabled={isPending}
          type="submit"
          className="mt-4 w-full text-white py-2 px-4"
        >
          {isPending ? t("submitting") : t("signIn")}
        </Button>
      </div>
    </form>
  );
}
