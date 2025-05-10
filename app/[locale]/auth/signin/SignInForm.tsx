"use client";

import { StatusMessage } from "@/components/StatusMessage";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/auth";
import { Link, useRouter } from "@/i18n/routing";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

import { toast } from "sonner";

export default function SignInForm() {
  const t = useTranslations("Auth");
  const router = useRouter();

  const LoginFun = useLogin();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    LoginFun.mutate(formData, {
      onSuccess: (data) => {
        if (data?.data?.token) {
          console.log("🚀 ~ handleLogin ~ data:", data);
          Cookies.set("AntiqueToken", data?.data?.token);
          router.push("/user");
        }
      },
      onError: (error) => {
        console.error("Login error:", error.message);
        toast.error(t("loginError"), {
          description: t("loginErrorDescription"),
        });
      },
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            required
            id="email"
            name="email"
            placeholder="user@gmail.com"
            type="email"
            className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3 text-left placeholder:text-left"
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            required
            id="password"
            type="password"
            name="password"
            className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
          />
        </div>
        <Link href="/auth/forgot-password" className="py-2 underline">
          Forgot password?
        </Link>
        <StatusMessage status={LoginFun.data!} />
        <SubmitButton
          text={t("signIn")}
          loadingText={t("submitting")}
          isLoading={LoginFun.isPending}
        />
      </div>
    </form>
  );
}
