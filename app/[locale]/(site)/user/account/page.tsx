"use client";

import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import DeleteAccount from "@/components/auth/DeleteAccount";
import OTPForm from "@/components/auth/OTPForm";
import UpdateEmail from "@/components/auth/UpdateEmail";

import { useAuth } from "@/context/usercontext";
import { useVerifyOTP } from "@/hooks/auth";
import { useUpdateEmail } from "@/hooks/user";
import React, { useEffect, useState } from "react";

export default function AccountPage() {
    const [step, setStep] = useState<"email" | "otp">("email");
    const { user, setAuth } = useAuth();
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
        await updateEmail.mutateAsync(formData);
    };

    const handleOTPVerification = async (formData: FormData) => {
        await verifyOTP.mutateAsync(formData, {
            onSuccess: (data) => {
                setAuth(data.data.user, data.data.token);
            },
        });
    };

    return (
        <div className="w-full p-2">
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Change Email</h3>
                    {step === "email" && (
                        <UpdateEmail
                            email={email}
                            emailAction={handleEmailUpdate}
                            emailState={updateEmail.data!}
                            isEmailPending={updateEmail.isPending}
                            setEmail={setEmail}
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
