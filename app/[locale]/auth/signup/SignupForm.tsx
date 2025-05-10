"use client";

import OTPForm from "@/components/auth/OTPForm";
import { StatusMessage } from "@/components/StatusMessage";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

import { useSignup, useVerifyOTP } from "@/hooks/auth";
import { useRouter } from "@/i18n/routing";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useState } from "react";

const SignupForm = () => {
  const router = useRouter();
  const t = useTranslations("Auth");

  const [email, setEmail] = useState("");
  const [isOTPStep, setIsOtpStep] = useState(false);

  const signup = useSignup();
  const verifyOTP = useVerifyOTP();

  useLayoutEffect(() => {
    if (isAuthenticated) {
      router.push("/user");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (verifyOTP.isSuccess && verifyOTP.data?.status) {
      Cookies.set("AntiqueToken", verifyOTP.data.data.token);
      router.push("/user");
    }
  }, [verifyOTP.isSuccess, verifyOTP.data, router]);

  useEffect(() => {
    if (signup.isSuccess && signup.data?.status) {
      setIsOtpStep(true);
    }
  }, [signup.isSuccess, signup.data]);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setEmail(formData.get("email") as string);
    await signup.mutateAsync(formData);
  };

  const handleOTPVerification = async (formData: FormData) => {
    await verifyOTP.mutateAsync(formData);
  };
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          {isOTPStep ? `Enter OTP Code` : t("createAccount")}
        </h1>
        <p className="text-gray-500">
          {isOTPStep ? `OTP Code sended to ${email}` : t("enterYourInfo")}
        </p>
      </div>
      <div className="mt-6">
        {!isOTPStep ? (
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-2">
              <div>
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  required
                  id="name"
                  name="username"
                  placeholder="Ahmed Ali"
                  className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
                />
              </div>
              <div>
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  required
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3 text-left placeholder:text-left"
                />
              </div>
              <div>
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  required
                  id="password"
                  name="password"
                  type="password"
                  className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
                />
              </div>

              <StatusMessage status={signup.data!} />
              <SubmitButton
                text={t("signUpHere")}
                loadingText={t("submitting")}
                isLoading={signup.isPending}
              />
            </div>
          </form>
        ) : (
          <OTPForm
            action={handleOTPVerification}
            email={email}
            isPending={verifyOTP.isPending}
            state={verifyOTP.data!}
          />
        )}
      </div>
    </>
  );
};

export default SignupForm;
