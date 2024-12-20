"use client";

import { StatusMessage } from "@/components/StatusMessage";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/usercontext";
import { useRouter } from "@/i18n/routing";
import { updateUserAction } from "@/lib/apiFun";
import { revalidate } from "@/server/revalidate";
import Cookies from "js-cookie";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function UserPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    const [userState, userAction, isUserPending] = useActionState(
        updateUserAction,
        null
    );

    useEffect(() => {
        if (userState?.status) revalidate(`user`);
        router.refresh();
        toast.success(userState?.message);
    }, [userState]);

    if (!isAuthenticated) {
        return router.push("/auth/signin");
    }
    // Handle image file selection
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                toast.error("Image size should be less than 5MB");
                return;
            }
            const formData = new FormData();
            formData.append("image", file);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/api/user/avatar`,
                {
                    method: "PUT",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token") || ""}`,
                    },
                }
            );
            let result = await res.json();
            toast.success(result?.message);
        }
    };

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
            <div className="flex gap-4 justify-start mb-4 relative">
                <div className="relative">
                    <Image
                        src={user?.avatar?.url || `/person_1.jpg`}
                        // Backend Error
                        // src={`/person_1.jpg`}
                        alt={user?.username || "User Image"}
                        width={64}
                        height={64}
                        className="rounded-full w-16 h-16 object-cover"
                    />
                    <input
                        type="file"
                        id="avatarUpload"
                        name="image"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="avatarUpload"
                        className="absolute bottom-0 start-0 p-1 cursor-pointer bg-primary/80 rounded-full"
                    >
                        ✏️
                    </label>
                </div>
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
            <form action={userAction} className="space-y-6">
                <div>
                    <Label htmlFor="name" className="block mb-2">
                        Your Name
                    </Label>
                    <Input
                        defaultValue={user?.username}
                        type="text"
                        id="name"
                        name="username"
                        className="w-full"
                    />
                </div>
                <div>
                    <Label className="block mb-2">Gender</Label>
                    <RadioGroup
                        defaultValue={user?.gender}
                        name="gender"
                        className="flex gap-4 items-center"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div>
                    <Label htmlFor="city" className="block mb-2">
                        City
                    </Label>
                    <Input
                        defaultValue={user?.location?.city || ""}
                        type="text"
                        id="city"
                        name="city"
                        className="w-full"
                    />
                </div>
                <div>
                    <Label htmlFor="state" className="block mb-2">
                        State
                    </Label>
                    <Input
                        defaultValue={user?.location?.state || ""}
                        type="text"
                        id="state"
                        name="state"
                        className="w-full"
                    />
                </div>
                <div>
                    <Label htmlFor="country" className="block mb-2">
                        Country
                    </Label>
                    <Input
                        defaultValue={user?.location?.country || ""}
                        type="text"
                        id="country"
                        name="country"
                        className="w-full"
                    />
                </div>
                <div>
                    <Label htmlFor="fullAddress" className="block mb-2">
                        Full Address
                    </Label>
                    <Input
                        defaultValue={user?.location?.fullAddress || ""}
                        type="text"
                        id="fullAddress"
                        name="fullAddress"
                        className="w-full"
                    />
                </div>
                <StatusMessage status={userState!} />
                <SubmitButton
                    isLoading={isUserPending}
                    loadingText="Updating..."
                    text="Update Info"
                />
            </form>
        </div>
    );
}
