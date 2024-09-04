"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/navigation";
import { loginAction } from "@/server/auth";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

export function SignInForm() {
  const router = useRouter();
  const [state, action] = useFormState(loginAction, undefined);

  useEffect(() => {
    if (state?.success === true) {
      router.push("/user");
    }
  }, [state?.success]);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="user@gmail.com"
            type="email"
            className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            className="p-2 text-main-1 focus-visible:ring-0 focus-visible:ring-offset-0  focus:border-main-3"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <SignInButton />
      </div>
    </form>
  );
}

export function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      type="submit"
      className="mt-4 w-full text-white py-2 px-4"
    >
      {pending ? "Submitting..." : "Sign In"}
    </Button>
  );
}
