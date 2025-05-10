"use client";

import type React from "react";

import { useRouter } from "@/i18n/routing";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = Cookies.get("AntiqueToken");
  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    }
  }, [router, user]);

  return user ? <>{children}</> : null;
}
