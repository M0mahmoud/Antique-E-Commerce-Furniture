"use client";

import { resendVerificationCodeAction } from "@/lib/apiFun";
import { Button } from "./ui/button";

import React, { useActionState, useEffect, useState } from "react";

export default function ResendVerificationCode({ email }: { email: string }) {
    const [countdown, setCountdown] = useState(0);
    const [state, action, isPending] = useActionState(async () => {
        const result = await resendVerificationCodeAction(email);
        if (result.status) {
            setCountdown(300); // Set 5 minutes countdown (300 seconds)
        }
        return result;
    }, undefined);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev: number) => prev - 1);
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [countdown]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return (
        <form className="grid place-items-center mt-4" action={action}>
            {state?.message && (
                <p
                    className={`text-sm ${
                        state.status ? "text-green-500" : "text-red-500"
                    } mx-auto`}
                >
                    {state.message}
                </p>
            )}
            <Button
                type="submit"
                variant={"secondary"}
                className="w-fit py-2 px-4 mx-auto"
                disabled={isPending || countdown > 0}
                aria-disabled={isPending || countdown > 0}
            >
                {isPending
                    ? "Sending..."
                    : countdown > 0
                    ? `Resend in ${formatTime(countdown)}`
                    : "Send code again"}
            </Button>
        </form>
    );
}
