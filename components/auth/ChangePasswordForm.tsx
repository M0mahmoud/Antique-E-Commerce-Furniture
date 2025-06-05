"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ChangePasswordForm() {
  const t = useTranslations("changePassword");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = (
      document.getElementById("newPassword") as HTMLInputElement
    ).value;
    setPasswordMatch(password === e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your password change logic here
    console.log("Password change form submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="currentPassword" className="">
          {t("currentPassword")}
        </Label>
        <Input
          disabled
          required
          type="password"
          id="currentPassword"
          name="currentPassword"
          className=""
          placeholder={t("currentPasswordPlaceholder")}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="newPassword" className="">
          {t("newPassword")}
        </Label>
        <Input
          disabled
          required
          type="password"
          id="newPassword"
          name="newPassword"
          className=""
          placeholder={t("newPasswordPlaceholder")}
          minLength={8}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="confirmPassword" className="">
          {t("confirmPassword")}
        </Label>
        <Input
          disabled
          required
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className=""
          placeholder={t("confirmPasswordPlaceholder")}
          minLength={8}
          onChange={handleConfirmPassword}
        />
        {!passwordMatch && (
          <p className="text-sm text-red-500">{t("passwordsDoNotMatch")}</p>
        )}
      </div>
      <Button type="submit">{t("changePasswordButton")}</Button>
    </form>
  );
}
