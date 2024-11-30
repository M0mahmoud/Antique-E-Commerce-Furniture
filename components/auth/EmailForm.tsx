"use client";

import { EmailFormProps } from "@/types/authComponents";
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
                        id="email"
                        name="email"
                        placeholder="user@gmail.com"
                        type="email"
                        className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-main-3 text-left placeholder:text-left"
                    />
                </div>
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
                    isLoading={isPending}
                    loadingText="Sending..."
                    text="Send Code"
                />
            </div>
        </form>
    );
}
