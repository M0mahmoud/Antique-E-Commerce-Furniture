"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/usercontext";
import { useRouter } from "@/i18n/routing";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function UserPage() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [isPending, setPending] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const email = formData.get("email") as string;
        //     const name = formData.get("name") as string;
        //     setPending(true);
        //     setFormError(null);
        //     try {
        //         const response = await updateUser(email, name);
        //         if (response instanceof Error) {
        //             throw response;
        //         }
        //         toast.success("User updated successfully");
        //     } catch (error: any) {
        //         toast.error(error.message || "Failed to update user");
        //         setFormError(error.message || "Failed to update user");
        //     } finally {
        //         setPending(false);
        //     }
    };
    let loading = false;
    if (loading) {
        return <Loading />;
    }

    if (!user && !loading) {
        return router.push("/auth/signup");
    }
    return (
        <div>
            {!user?.verified && (
                <p className="bg-destructive text-white border-destructive/50 p-3 rounded-md">
                    Please confirm your email address by clicking the link
                    we&apos;ve sent to your inbox. If you didn&apos;t receive
                    the email, be sure to check your spam or junk folder.
                </p>
            )}
            <div className="flex gap-4 justify-start mb-4 border-b pb-8">
                <Image
                    src={
                        user?.avatar?.url ||
                        "https://placecats.com/bella/500/500"
                    }
                    alt="User profile"
                    width={64}
                    height={64}
                    className="rounded-full"
                />
                <div>
                    <h2 className="text-2xl font-semibold text-secondary-foreground mb-1">
                        {user?.verified ? (
                            <ShieldCheck className="text-primary inline-block w-6 me-1" />
                        ) : null}{" "}
                        {user?.username}
                    </h2>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl">Edit Your Personal Data</h2>
                <div className="mb-4">
                    <Label htmlFor="name" className="">
                        First Name *
                    </Label>
                    <Input
                        required
                        defaultValue={user?.username}
                        type="text"
                        id="name"
                        name="name"
                        className=""
                        placeholder="Your name"
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="email" className="">
                        Email *
                    </Label>
                    <Input
                        defaultValue={user?.email}
                        required
                        type="email"
                        id="email"
                        name="email"
                        className=""
                        placeholder="Email"
                    />
                </div>
                {formError && <p className="text-red-500">{formError}</p>}

                <Button
                    disabled={isPending}
                    type="submit"
                    className="bg-primary text-white"
                >
                    {isPending ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
}
