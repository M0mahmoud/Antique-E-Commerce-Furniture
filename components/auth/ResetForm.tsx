"use client";

import { ResetFormProps } from "@/types/authComponents";
import { useState } from "react";
import { StatusMessage } from "../StatusMessage";
import SubmitButton from "../SubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ResetForm({
    action,
    isPending,
    state,
    resetData,
}: ResetFormProps) {
    const [passwordMatch, setPasswordMatch] = useState(true);
    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = (
            document.getElementById("password") as HTMLInputElement
        ).value;
        setPasswordMatch(password === e.target.value);
    };
    return (
        <form
            action={(form) => {
                form.set("resetToken", resetData.resetToken);
                form.set("userID", resetData.userID);
                action(form);
            }}
            className="space-y-6 max-w-sm mx-auto"
        >
            <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                    id="password"
                    name="newPassword"
                    type="password"
                    required
                    minLength={8}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    onChange={handleConfirmPassword}
                />
                {!passwordMatch && (
                    <p className="text-sm text-red-500">
                        Passwords do not match
                    </p>
                )}
            </div>
            <StatusMessage status={state!} />
            <SubmitButton
                isLoading={isPending}
                loadingText="Resetting..."
                text="Reset Password"
            />
        </form>
    );
}
