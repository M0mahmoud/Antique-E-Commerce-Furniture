"use client";

import EmailForm from "@/components/auth/EmailForm";
import OTPForm from "@/components/auth/OTPForm";
import ResetForm from "@/components/auth/ResetForm";
import {
    forgetPasswordAction,
    resetPasswordAction,
    verifyOTPAction,
} from "@/lib/apiFun";
import { useActionState, useEffect, useState } from "react";

export default function ForgotPassword() {
    const [step, setStep] = useState<"email" | "otp" | "reset">("email");
    const [email, setEmail] = useState("");
    const [resetData, setResetData] = useState({ resetToken: "", userID: "" });

    const [emailState, emailAction, isEmailPending] = useActionState(
        forgetPasswordAction,
        null,
    );
    const [otpState, otpAction, isOTPPending] = useActionState(
        verifyOTPAction,
        null,
    );
    const [resetState, resetAction, isResetPending] = useActionState(
        resetPasswordAction,
        null,
    );

    useEffect(() => {
        if (emailState?.status) setStep("otp");
    }, [emailState]);

    useEffect(() => {
        if (otpState?.status) {
            setResetData({
                resetToken: otpState.data.token,
                userID: otpState.data.user._id,
            });
            setStep("reset");
        }
    }, [otpState]);

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
                        action={emailAction}
                        isPending={isEmailPending}
                        state={emailState}
                        setEmail={setEmail}
                    />
                )}
                {step === "otp" && (
                    <OTPForm
                        action={otpAction}
                        isPending={isOTPPending}
                        state={otpState}
                        email={email}
                    />
                )}
                {step === "reset" && (
                    <ResetForm
                        action={resetAction}
                        isPending={isResetPending}
                        state={resetState}
                        resetData={resetData}
                    />
                )}
            </div>
        </>
    );
}