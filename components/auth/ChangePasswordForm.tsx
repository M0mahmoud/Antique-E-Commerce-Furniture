"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePassword } from "@/hooks/user";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ChangePasswordForm() {
  const t = useTranslations("changePassword");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Add state for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending } = useUpdatePassword();

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = (
      document.getElementById("newPassword") as HTMLInputElement
    ).value;
    setPasswordMatch(password === e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!passwordMatch) {
      return; // Prevent submission if passwords do not match
    }
    mutate(formData, {
      onSuccess: (data) => {
        if (!data.status) {
          setErrorMessage(data.message || t("changePasswordError"));
          return;
        }
        if (data.status) {
          e.currentTarget.reset();
          setPasswordMatch(true);
          setErrorMessage(null);
        }
      },
      onError: (error) => {
        console.error("Error changing password:", error);
        setErrorMessage(error.message || t("changePasswordError"));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="currentPassword" className="">
          {t("currentPassword")}
        </Label>
        <div className="relative">
          <Input
            required
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            className="pr-10"
            placeholder={t("currentPasswordPlaceholder")}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="newPassword" className="">
          {t("newPassword")}
        </Label>
        <div className="relative">
          <Input
            required
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            className="pr-10"
            placeholder={t("newPasswordPlaceholder")}
            minLength={8}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="confirmPassword" className="">
          {t("confirmPassword")}
        </Label>
        <div className="relative">
          <Input
            required
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            className="pr-10"
            placeholder={t("confirmPasswordPlaceholder")}
            minLength={8}
            onChange={handleConfirmPassword}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {!passwordMatch && (
          <p className="text-sm text-red-500">{t("passwordsDoNotMatch")}</p>
        )}
      </div>
      {errorMessage && (
        <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
      )}
      <Button
        disabled={!passwordMatch || isPending}
        aria-disabled={!passwordMatch || isPending}
        type="submit"
      >
        {isPending ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          t("changePasswordButton")
        )}
      </Button>
    </form>
  );
}
