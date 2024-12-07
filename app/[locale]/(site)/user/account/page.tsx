"use client";

import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import DeleteAccount from "@/components/auth/DeleteAccount";
import OTPForm from "@/components/auth/OTPForm";
import UpdateEmail from "@/components/auth/UpdateEmail";

import { useAuth } from "@/context/usercontext";
import { updateEmailAction, verifyOTPAction } from "@/lib/apiFun";
import React, { useActionState, useEffect, useState } from "react";

export default function AccountPage() {
    const [step, setStep] = useState<"email" | "otp">("email");
    const { user } = useAuth();
    const [email, setEmail] = useState(user?.email || "");

    const [emailState, emailAction, isEmailPending] = useActionState(
        updateEmailAction,
        null
    );
    const [otpState, otpAction, isOTPPending] = useActionState(
        verifyOTPAction,
        null
    );

    useEffect(() => {
        if (emailState?.status) {
            setStep("otp");
        }
    }, [emailState]);

    useEffect(() => {
        if (otpState?.status) {
            setStep("email");
        }
    }, [otpState]);

    return (
        <div className="w-full p-2">
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Change Email</h3>
                    {step === "email" && (
                        <UpdateEmail
                            email={email}
                            emailAction={emailAction}
                            emailState={emailState}
                            isEmailPending={isEmailPending}
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
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Change Password
                    </h3>
                    <ChangePasswordForm />
                </div>
                <DeleteAccount />
            </div>
        </div>
    );
}
