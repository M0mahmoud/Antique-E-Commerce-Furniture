"use client";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import ResendVerificationCode from "@/components/resendVerificationCode";
import { OTPFormProps } from "@/types/authComponents";
import { StatusMessage } from "../StatusMessage";
import SubmitButton from "../SubmitButton";

export default function OTPForm({
    action,
    isPending,
    state,
    email,
}: OTPFormProps) {
    return (
        <>
            <form
                action={action}
                className="flex flex-col justify-center items-center gap-4"
            >
                <input type="hidden" name="email" defaultValue={email} />
                <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    name="code"
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                <StatusMessage status={state!} />
                <SubmitButton
                    isLoading={isPending}
                    loadingText="Verifying..."
                    text="Verify"
                />
            </form>
            <ResendVerificationCode email={email} />
        </>
    );
}
