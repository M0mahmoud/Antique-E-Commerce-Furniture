"use client";

import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import DeleteAccount from "@/components/auth/DeleteAccount";
import OTPForm from "@/components/auth/OTPForm";
import UpdateEmail from "@/components/auth/UpdateEmail";
import { useVerifyOTP } from "@/hooks/auth";
import { useUpdateEmail, useUser } from "@/hooks/user";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

export default function AccountPage() {
  const t = useTranslations("accountPage");
  const [step, setStep] = useState<"email" | "otp">("email");
  const { data } = useUser();
  const user = data?.data;

  const [email, setEmail] = useState(user?.email || "");

  const updateEmail = useUpdateEmail();
  const verifyOTP = useVerifyOTP();

  useEffect(() => {
    if (updateEmail.isSuccess && updateEmail.data?.status) {
      setStep("otp");
    }
  }, [updateEmail.isSuccess, updateEmail.data]);

  useEffect(() => {
    if (verifyOTP.isSuccess && verifyOTP.data?.status) {
      setStep("email");
    }
  }, [verifyOTP.isSuccess, verifyOTP.data]);

  const handleEmailUpdate = async (formData: FormData) => {
    setEmail(formData.get("email") as string);
    await updateEmail.mutateAsync(formData, {
      onSuccess: (data) => {
        console.log("🚀 ~ handleEmailUpdate ~ data:", data);
        if (data.status) {
          setStep("otp");
        } else {
          console.error("Failed to update email:", data.message);
        }
      },
      onError: (error) => {
        console.error("Error updating email:", error);
      },
    });
  };

  const handleOTPVerification = async (formData: FormData) => {
    await verifyOTP.mutateAsync(formData, {
      onSuccess: (data) => {
        console.log("🚀 ~ handleOTPVerification ~ data:", data);
      },
    });
  };

  return (
    <div className="w-full p-2">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">{t("title")}</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("changeEmail")}</h3>
          {step === "email" && (
            <UpdateEmail
              email={email}
              emailAction={handleEmailUpdate}
              emailState={updateEmail.data!}
              isEmailPending={updateEmail.isPending}
              setEmail={setEmail}
              disableEmail={true} // Disable email input
            />
          )}
          {step === "otp" && (
            <OTPForm
              action={handleOTPVerification}
              isPending={verifyOTP.isPending}
              state={verifyOTP.data!}
              email={email}
            />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">{t("changePassword")}</h3>
          <ChangePasswordForm />
        </div>
        <DeleteAccount />
      </div>
    </div>
  );
}
