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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function AccountPage() {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    function handleDeleteAccount() {
        // Here you would typically send a request to delete the user's account
        console.log("Account deletion requested");
        setIsDeleteDialogOpen(false);
    }

    return (
        <div className="w-full p-2">
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Change Password
                    </h3>
                    <form>
                        <div className="mb-4">
                            <Label htmlFor="currentPassword" className="">
                                Current Password
                            </Label>
                            <Input
                                required
                                type="text"
                                id="currentPassword"
                                name="currentPassword"
                                className=""
                                placeholder="Current Password"
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="newPassword" className="">
                                Street Address *
                            </Label>
                            <Input
                                required
                                type="text"
                                id="newPassword"
                                name="newPassword"
                                className=""
                                placeholder="New Password"
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="confirmPassword" className="">
                                Street Address *
                            </Label>
                            <Input
                                required
                                type="text"
                                id="confirmPassword"
                                name="confirmPassword"
                                className=""
                                placeholder="Confirm Password"
                            />
                        </div>
                        <Button type="submit">Change Password</Button>
                    </form>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Delete Account</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Once you delete your account, there is no going back.
                        Please be certain.
                    </p>
                    <AlertDialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                    >
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                Delete Account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[90%] mx-auto rounded-md">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                >
                                    Yes, delete my account
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}
