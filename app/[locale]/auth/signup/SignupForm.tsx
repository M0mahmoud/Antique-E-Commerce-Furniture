"use client";

import OTPForm from "@/components/auth/OTPForm";
import { StatusMessage } from "@/components/StatusMessage";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/usercontext";
import { useRouter } from "@/i18n/routing";
import { signupAction, verifyOTPAction } from "@/lib/apiFun";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useLayoutEffect, useState } from "react";

const SignupForm = () => {
    const router = useRouter();
    const t = useTranslations("Auth");
    const { setAuth, isAuthenticated } = useAuth();

    const [email, setEmail] = useState("");
    const [isOTPStep, setIsOtpStep] = useState(false);

    const [state, action, isPending] = useActionState(signupAction, undefined);
    const [otpState, otpAction, isOTPPending] = useActionState(
        verifyOTPAction,
        undefined,
    );

    useLayoutEffect(() => {
        if (isAuthenticated) {
            router.push("/user");
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (otpState?.status) {
            setAuth(otpState.data.user, otpState.data.token);
            router.push("/user");
        }
    }, [otpState?.status, setAuth]);

    useEffect(() => {
        if (state?.status) {
            setIsOtpStep(true);
        }
    }, [state?.status]);

    return (
        <>
            <div className="text-center">
                <h1 className="text-3xl font-bold">
                    {isOTPStep ? `Enter OTP Code` : t("createAccount")}
                </h1>
                <p className="text-gray-500">
                    {isOTPStep
                        ? `OTP Code sended to ${email}`
                        : t("enterYourInfo")}
                </p>
            </div>
            <div className="mt-6">
                {!isOTPStep ? (
                    <form
                        action={(form) => {
                            action(form);
                            setEmail(form.get("email") as string);
                        }}
                    >
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
                                <Label htmlFor="password">
                                    {t("password")}
                                </Label>
                                <Input
                                    required
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
                                />
                            </div>

                            <StatusMessage status={state!} />
                            <SubmitButton
                                text={t("signUpHere")}
                                loadingText={t("submitting")}
                                isLoading={isPending}
                            />
                        </div>
                    </form>
                ) : (
                    <OTPForm
                        action={otpAction}
                        email={email}
                        isPending={isOTPPending}
                        state={otpState!}
                    />
                )}
            </div>
        </>
    );
};

export default SignupForm;
