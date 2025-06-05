"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { apiClient } from "@/lib/apiClient";
import Cookies from "js-cookie";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

export default function DeleteAccount() {
  const t = useTranslations("deleteAccount");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  async function handleDeleteAccount() {
    try {
      await apiClient(`/user/profile`, {
        method: "DELETE",
      });
      Cookies.remove("AntiqueToken");
      setIsDeleteDialogOpen(false);
      // Optionally redirect to home page or login page
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      // Handle error appropriately
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">{t("title")}</h3>
      <p className="text-sm text-muted-foreground mb-4">{t("warning")}</p>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogTrigger asChild>
          <Button variant="destructive">{t("deleteButton")}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[90%] mx-auto rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("confirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("confirmDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount}>
              {t("confirmDelete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
