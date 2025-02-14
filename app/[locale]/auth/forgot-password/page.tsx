"use client";

import EmailForm from "@/components/auth/EmailForm";
import OTPForm from "@/components/auth/OTPForm";
import ResetForm from "@/components/auth/ResetForm";
import {
    useForgetPassword,
    useResetPassword,
    useVerifyOTP,
} from "@/hooks/auth";
import { useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";

export default function ForgotPassword() {
    const [step, setStep] = useState<"email" | "otp" | "reset">("email");
    const [email, setEmail] = useState("");
    const [resetData, setResetData] = useState({ resetToken: "", userID: "" });
    const router = useRouter();

    const forgetPassword = useForgetPassword();
    const verifyOTP = useVerifyOTP();
    const resetPassword = useResetPassword();

    useEffect(() => {
        if (forgetPassword.isSuccess && forgetPassword.data?.status) {
            setStep("otp");
            setResetData({
                resetToken: forgetPassword.data.data.resetToken,
                userID: forgetPassword.data.data.userID,
            });
        }
    }, [forgetPassword.isSuccess, forgetPassword.data]);

    useEffect(() => {
        if (verifyOTP.isSuccess && verifyOTP.data?.status) {
            setStep("reset");
        }
    }, [verifyOTP.isSuccess, verifyOTP.data]);

    useEffect(() => {
        if (resetPassword.isSuccess && resetPassword.data?.status) {
            router.replace("/auth/signin");
        }
    }, [resetPassword.isSuccess, resetPassword.data, router]);

    const handleEmailSubmit = async (formData: FormData) => {
        setEmail(formData.get("email") as string);
        await forgetPassword.mutateAsync(formData);
    };

    const handleOTPSubmit = async (formData: FormData) => {
        await verifyOTP.mutateAsync(formData);
    };

    const handleResetSubmit = async (formData: FormData) => {
        formData.append("userID", resetData.userID);
        formData.append("resetToken", resetData.resetToken);
        await resetPassword.mutateAsync(formData);
    };

    return (
        <>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Forgot Your Password?</h1>
                <p className="text-gray-500">
                    Don&rsquo;t worry! Just enter your email address below, and
                    we&rsquo;ll send you a link to reset your password. Make
                    sure to check your inbox and spam folder.
                </p>
            </div>
            <div className="mt-6">
                {step === "email" && (
                    <EmailForm
                        action={handleEmailSubmit}
                        isPending={forgetPassword.isPending}
                        state={forgetPassword.data!}
                        setEmail={setEmail}
                    />
                )}
                {step === "otp" && (
                    <OTPForm
                        action={handleOTPSubmit}
                        isPending={verifyOTP.isPending}
                        state={verifyOTP.data!}
                        email={email}
                    />
                )}
                {step === "reset" && (
                    <ResetForm
                        action={handleResetSubmit}
                        isPending={resetPassword.isPending}
                        state={resetPassword.data!}
                        resetData={resetData}
                    />
                )}
            </div>
        </>
    );
}
