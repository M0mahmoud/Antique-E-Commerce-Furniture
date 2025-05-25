"use client";

import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function Setup2FAForm() {
  const t = useTranslations("2fa");
  const [copied, setCopied] = useState(false);
  const [authCode] = useState("MSW3-MAE3-KIA1-Q2A3");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(authCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="py-3">
          <Image
            src={"/qrcode.png"}
            width={188}
            height={188}
            alt="QR Code for 2FA"
            className="mx-auto select-none"
          />
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="font-mono text-lg font-semibold text-gray-800">
            {authCode}
          </span>
          <Button
            onClick={handleCopy}
            className="bg-green-100 hover:bg-green-200 text-primary px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check size={14} />
                {t("copied")}
              </>
            ) : (
              <>
                <Copy size={14} />
                {t("copy")}
              </>
            )}
          </Button>
        </div>

        <Link href={'/auth/verify-2fa'} className="bg-primary text-white py-2 px-4 mx-auto w-fit rounded" >
        {t("continue")}
        </Link>
      </div>
    </form>
  );
}
