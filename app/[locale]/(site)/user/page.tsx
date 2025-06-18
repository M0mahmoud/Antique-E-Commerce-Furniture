"use client";

import Loading from "@/components/Loading";
import { StatusMessage } from "@/components/StatusMessage";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUpdateAvatar, useUpdateUser, useUser } from "@/hooks/user";
import { useRouter } from "@/i18n/routing";
import { Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, Suspense, useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function UserPage() {
  const t = useTranslations("userProfile");
  const { data, isPending } = useUser();
  const user = data?.data;

  const router = useRouter();

  const updateAvatar = useUpdateAvatar();
  const updateUserProfile = useUpdateUser();

  useEffect(() => {
    if (updateAvatar.isSuccess) {
      router.refresh();
      toast.success(updateAvatar?.data?.message || t("updated"));
    }
  }, [updateAvatar.isSuccess, router, updateAvatar?.data?.message, t]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error(t("imageSizeError"));
        return;
      }

      const formData = new FormData();
      formData.append("image", file); // Ensure the key matches what the backend expects

      // Debugging: Log the FormData content
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      updateAvatar.mutate(formData, {
        onSuccess: (data) => {
          toast.success(data?.message);
        },
        onError: (error) => {
          toast.error(t("failedToUploadImage"));
          console.error("Error uploading image:", error);
        },
      });
    }
  };

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Client-side validation
    const username = formData.get("username") as string;
    const gender = formData.get("gender") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const country = formData.get("country") as string;
    const fullAddress = city + ", " + state + ", " + country;
    formData.append("fullAddress", fullAddress);

    if (!username || !gender || !city || !state || !country) {
      toast.error(t("allFieldsRequired"));
      return;
    }

    if (username.length < 8) {
      toast.error(t("usernameMinLength"));
      return;
    }
    updateUserProfile.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data?.message);
      },
    });
  };

  if (isPending) {
    return <Loading />;
  }
  return (
    <Suspense fallback={<Loader2 className="animate-spin w-8" />}>
      <div className="w-full p-2">
        {!user?.verified && (
          <p className="bg-destructive text-white border-destructive/50 p-3 rounded-md mb-6 text-sm md:text-base">
            {t("emailVerificationMessage")}
          </p>
        )}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">{t("title")}</h2>
        <div className="flex gap-4 justify-start mb-4 relative">
          <div className="relative">
            {updateAvatar.isPending ? (
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-muted">
                <Loader2 className="animate-spin w-8 h-8 text-primary" />
              </div>
            ) : (
              <Image
                src={user?.avatar?.url || `/person_1.jpg`}
                alt={user?.username || "User"}
                width={64}
                height={64}
                className="rounded-full w-16 h-16 object-cover"
                unoptimized
                loading="lazy"
              />
            )}
            <input
              type="file"
              id="avatarUpload"
              name="image"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleImageChange}
              className="hidden"
              disabled={updateAvatar.isPending}
            />
            <label
              htmlFor="avatarUpload"
              className={`size-6 absolute bottom-0 start-0 p-1 cursor-pointer bg-primary/80 text-xs rounded-full ${
                updateAvatar.isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
        <form onSubmit={handleUpdateUser} className="space-y-6">
          <div>
            <Label htmlFor="name" className="block mb-2">
              {t("yourName")}{" "}
              <span className="text-destructive">{t("required")}</span>
            </Label>
            <Input
              defaultValue={user?.username}
              type="text"
              id="name"
              name="username"
              className="w-full"
              minLength={8}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              {t("nameMinLength")}
            </p>
          </div>
          <div>
            <Label className="block mb-2">{t("gender")}</Label>
            <RadioGroup
              defaultValue={user?.gender}
              name="gender"
              className="flex gap-4 items-center"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">{t("male")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">{t("female")}</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="city" className="block mb-2">
              {t("city")}
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
              {t("state")}
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
              {t("country")}
            </Label>
            <Input
              defaultValue={user?.location?.country || ""}
              type="text"
              id="country"
              name="country"
              className="w-full"
            />
          </div>

          {updateUserProfile.data && (
            <StatusMessage status={updateUserProfile.data} />
          )}

          <SubmitButton
            isLoading={updateUserProfile.isPending}
            loadingText={t("updating")}
            text={t("updateInfo")}
          />
        </form>
      </div>
    </Suspense>
  );
}
