"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormAction } from "@/server/contactFormAction";
import { SendHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";

export default function ContactForm() {
  const t = useTranslations("Auth");
  const [showMessage, setShowMessage] = useState(false);
  const [state, formAction, isPending] = useActionState(contactFormAction, {
    message: "",
    success: false,
  });

  // Auto-hide message after 2 seconds
  useEffect(() => {
    if (state.message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.message]);

  return (
    <form action={formAction} className="space-y-4 mx-auto max-w-2xl pb-12">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fname" className="text-black">
            {t("name")}
          </Label>
          <Input
            type="text"
            name="name"
            id="fname"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-black">
            {t("phone")}
          </Label>
          <Input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter Your Phone"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-black">
          {t("email")}
        </Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-black">
          {t("message")}
        </Label>
        <Textarea
          name="message"
          id="message"
          rows={5}
          placeholder="Enter Your Message"
        />
      </div>
      <input type="hidden" name="subject" value="E-Commerce" />
      {state.message && showMessage && (
        <div
          className={`mt-4 p-4 rounded text-left transition-opacity duration-300 ${
            state.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}
      <Button
        aria-disabled={isPending}
        type="submit"
        className="bg-primary text-white"
      >
        <span>{isPending ? t("sending") : t("send")}</span>
        <SendHorizontal className="text-white h-4 ms-2 rtl:rotate-180" />
      </Button>
    </form>
  );
}
