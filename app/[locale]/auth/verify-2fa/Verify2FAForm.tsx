"use client";

import OTPForm from "@/components/auth/OTPForm";

import { useTranslations } from "next-intl";

export default function Verify2FAForm() {
  const t = useTranslations("2fa");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex flex-col gap-2">
        <OTPForm
        withoutSendAgain={true}
          action={() => {}}
          email={""}
          isPending={false}
          state={{
            status: true,
            message: "",
            data: null,
          }}
        />
      </div>
    </form>
  );
}
