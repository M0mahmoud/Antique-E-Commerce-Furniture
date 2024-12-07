import { UpdateEmailFormProps } from "@/types/authComponents";
import React from "react";
import { StatusMessage } from "../StatusMessage";
import SubmitButton from "../SubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function UpdateEmail({
    email,
    setEmail,
    emailState,
    emailAction,
    isEmailPending,
}: UpdateEmailFormProps) {
    return (
        <form
            action={(form) => {
                setEmail(form.get("email") as string);
                emailAction(form);
            }}
        >
            <div className="mb-4">
                <Label htmlFor="email" className="">
                    Email
                </Label>
                <Input
                    required
                    type="email"
                    autoComplete="email"
                    id="email"
                    name="email"
                    className=""
                    defaultValue={email}
                />
            </div>
            <StatusMessage status={emailState!} />
            <SubmitButton
                isLoading={isEmailPending}
                loadingText="Updating..."
                text="Update Email"
            />
        </form>
    );
}
