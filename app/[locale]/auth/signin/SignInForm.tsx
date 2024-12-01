"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/usercontext";
import { Link, useRouter } from "@/i18n/routing";
import { loginAction } from "@/lib/apiFun";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useLayoutEffect } from "react";

export function SignInForm() {
    const t = useTranslations("Auth");
    const router = useRouter();
    const { setAuth, isAuthenticated } = useAuth();
    const [state, action, isPending] = useActionState(loginAction, undefined);

    useLayoutEffect(() => {
        if (isAuthenticated) {
            router.push("/user");
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (state?.status) {
            setAuth(state.data.user, state.data.token);
            router.push("/user");
        }
    }, [state?.status, router, setAuth]);

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
                </div>
                <div className="mt-4">
                    <Label htmlFor="password">{t("password")}</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
                    />
                </div>
                <Link href="/auth/forgot-password" className="py-2 underline">
                    Forgot password?
                </Link>
                {state?.message && (
                    <p
                        className={`text-sm ${
                            state.status ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {state.message}
                    </p>
                )}
                <SubmitButton
                    text={t("signIn")}
                    loadingText={t("submitting")}
                    isLoading={isPending}
                />
            </div>
        </form>
    );
}
