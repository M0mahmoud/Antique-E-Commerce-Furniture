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
import { useAuth } from "@/context/usercontext";
import { apiClient } from "@/lib/apiClient";
import { useState } from "react";
import { Button } from "../ui/button";
export default function DeleteAccount() {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { clearAuth } = useAuth();

    async function handleDeleteAccount() {
        await apiClient(`/api/user/profile`, {
            method: "DELETE",
        });
        clearAuth();
        setIsDeleteDialogOpen(false);
    }

    return (
        <div>
            <h3 className="text-lg font-semibold">Delete Account</h3>
            <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
            </p>
            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%] mx-auto rounded-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount}>
                            Yes, delete my account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
