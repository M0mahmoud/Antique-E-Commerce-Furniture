"use client";

import Loading from "@/components/Loading";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/usercontext";
import { useRouter } from "@/i18n/routing";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function UserPage() {
    const { user } = useAuth();
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    let loading = false;
    if (loading) {
        return <Loading />;
    }

    if (!user && !loading) {
        return router.push("/auth/signup");
    }
    return (
        <div className="w-full p-2">
            {!user?.verified && (
                <p className="bg-destructive text-white border-destructive/50 p-3 rounded-md mb-6 text-sm md:text-base">
                    Please confirm your email address by clicking the link
                    we&apos;ve sent to your inbox. If you didn&apos;t receive
                    the email, be sure to check your spam or junk folder.
                </p>
            )}
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Edit Your Personal Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-4 justify-start mb-2">
                    <Image
                        src={
                            // For Now
                            `/person_1.jpg`
                            // user?.avatar?.url ||
                            // "https://placecats.com/bella/500/500"
                        }
                        alt="User profile"
                        width={64}
                        height={64}
                        className="rounded-md w-16 h-16 object-cover"
                    />
                    <div className="flex items-start justify-center flex-col">
                        <h2 className="text-xl sm:text-2xl font-semibold text-secondary-foreground mb-2">
                            {user?.username}
                        </h2>
                        <span>
                            {user?.verified && (
                                <ShieldCheck className="text-primary inline-block w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </span>
                    </div>
                </div>
                <div>
                    <Label htmlFor="name" className="block mb-2">
                        Your Name
                    </Label>
                    <Input
                        required
                        defaultValue={user?.username}
                        type="text"
                        id="name"
                        name="username"
                        className="w-full"
                        placeholder="Your name"
                    />
                </div>

                <div>
                    <Label htmlFor="email" className="block mb-2">
                        Email *
                    </Label>
                    <Input
                        defaultValue={user?.email}
                        required
                        type="email"
                        id="email"
                        name="email"
                        className="w-full"
                        placeholder="Email"
                    />
                </div>

                <SubmitButton
                    isLoading={false}
                    loadingText="Updating..."
                    text="Update Info"
                />
            </form>
        </div>
    );
}
