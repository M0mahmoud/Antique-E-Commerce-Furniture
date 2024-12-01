"use client";

import { EmailFormProps } from "@/types/authComponents";
import { StatusMessage } from "../StatusMessage";
import SubmitButton from "../SubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function EmailForm({
    action,
    isPending,
    state,
    setEmail,
}: EmailFormProps) {
    return (
        <form
            action={(form) => {
                setEmail(form.get("email") as string);
                action(form);
            }}
        >
            <div className="flex flex-col gap-2">
                <div>
                    <Label htmlFor="email">Enter Email</Label>
                    <Input
                        required
                        id="email"
                        name="email"
                        placeholder="user@gmail.com"
                        type="email"
                        className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-main-3 text-left placeholder:text-left"
                    />
                </div>
                <StatusMessage status={state!} />
                <SubmitButton
                    isLoading={isPending}
                    loadingText="Sending..."
                    text="Send Code"
                />
            </div>
        </form>
    );
}
