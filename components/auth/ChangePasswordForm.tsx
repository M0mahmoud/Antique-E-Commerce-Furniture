"use client";

import { StatusMessage } from "@/components/StatusMessage";
import SubmitButton from "@/components/SubmitButton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ChangePasswordForm() {
    const [passwordMatch, setPasswordMatch] = useState(true);
    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = (
            document.getElementById("newPassword") as HTMLInputElement
        ).value;
        setPasswordMatch(password === e.target.value);
    };
    return (
        <form>
            <div className="mb-4">
                <Label htmlFor="currentPassword" className="">
                    Current Password
                </Label>
                <Input
                    required
                    type="text"
                    id="currentPassword"
                    name="currentPassword"
                    className=""
                    placeholder="Current Password"
                />
            </div>
            <div className="mb-4">
                <Label htmlFor="newPassword" className="">
                    New Password
                </Label>
                <Input
                    required
                    type="text"
                    id="newPassword"
                    name="newPassword"
                    className=""
                    placeholder="New Password"
                    minLength={8}
                />
            </div>
            <div className="mb-4">
                <Label htmlFor="confirmPassword" className="">
                    Confirm Password
                </Label>
                <Input
                    required
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                    className=""
                    placeholder="Confirm Password"
                    minLength={8}
                    onChange={handleConfirmPassword}
                />
                {!passwordMatch && (
                    <p className="text-sm text-red-500">
                        Passwords do not match
                    </p>
                )}
            </div>
            <Button type="submit">Change Password</Button>
        </form>
    );
}
