"use server";

import { key } from "@/lib/session";
import { SignJWT } from "jose";

//     email:string,
//     subject:string,
//     title:string,
//     paraghraph:string,
//     link:string,
//     linktext:string}

export async function CreateEmailToken(email: string) {
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5 min")
    .sign(key);
}
export async function SendEmail(props: any) {
  try {
    const response = await fetch(process.env.EMAIL_URL as string, {
      method: "POST",
      body: new URLSearchParams(props),
    });
    const data = await response.text();
    console.log("data:", data);
    return data;
  } catch (error) {
    console.log("error:", error);
    return undefined;
  }
}
