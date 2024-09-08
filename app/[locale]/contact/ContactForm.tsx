"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormAction } from "@/server/contactFormAction";
import { SendHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";

export default function ContactForm() {
  const t = useTranslations("Auth");
  const [state, formAction] = useFormState(contactFormAction, {
    message: "",
    success: false,
  });
  return (
    <form action={formAction} className="space-y-4 mx-auto max-w-2xl pb-12">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fname" className="text-black">
            {t("name")}
          </Label>
          <Input type="text" name="name" id="fname" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-black">
            {t("phone")}
          </Label>
          <Input type="tel" name="phone" id="phone" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-black">
          {t("email")}
        </Label>
        <Input type="email" name="email" id="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-black">
          {t("message")}
        </Label>
        <Textarea name="message" id="message" rows={5} />
      </div>
      <input type="hidden" name="subject" value="E-Commerce" />
      {state.message && (
        <div
          className={`mt-4 p-4 rounded text-left ${
            state.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}
      <SubmitForm />
    </form>
  );
}
function SubmitForm() {
  const t = useTranslations("Auth");
  const { pending } = useFormStatus();
  return (
    <Button
      aria-disabled={pending}
      type="submit"
      className="bg-primary text-white"
    >
      <span>{pending ? t("sending") : t("send")}</span>
      <SendHorizontal className="text-white h-4 ms-2 rtl:rotate-180" />
    </Button>
  );
}
