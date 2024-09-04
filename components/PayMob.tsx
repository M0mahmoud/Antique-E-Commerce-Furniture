"use client";
import { Button } from "@/components/ui/button";
import { CreateEmailToken, SendEmail } from "@/server/email";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const PayMob = () => {
  console.log(
    "process.env.NEXT_PUBLIC_VERCEL_URL",
    process.env.NEXT_PUBLIC_VERCEL_URL
  );

  const router = useRouter();
  return (
    <div className="p-3 flex flex-wrap gap-5">
      <Button
        onClick={async () => {
          const res = await fetch("/api/pay", {
            method: "POST",
            headers: {
              "Content-Type": "aplication/json",
            },
          });
          const data = await res.json();
          console.log("data:", data);
          if (data.url) {
            // window.location.href = data.url;
          } else {
            console.error("No URL received from the server");
          }
        }}
      >
        Paymob
      </Button>
      <Button
        onClick={async () => {
          const createToken = await CreateEmailToken("contact@devmahmoud.me");
          const path = window.location.pathname; // Get the current URL path
          const [, locale] = path.split("/");
          const link = `http://localhost:3000/${locale}/e?token=${createToken}`;
          await SendEmail({
            email: "contact@devmahmoud.me",
            subject: "Confirm Your Email",
            title: "Confirm Your Email",
            paraghraph:
              "Thank you for signing up! Please confirm your email address by clicking the link we've sent to your inbox. If you didn't receive the email, be sure to check your spam or junk folder.",
            link,
            linktext: "Confirm Now!",
          });
        }}
      >
        Send Email
      </Button>
    </div>
  );
};

export default PayMob;
