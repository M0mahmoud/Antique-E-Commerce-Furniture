import { apiClient } from "@/lib/apiClient";

export async function GetUser() {
    return await apiClient("/api/user/profile", {
        method: "GET",
    });
}

export async function updateUserAction(form: FormData) {
    return await apiClient("/api/user/profile", {
        method: "PUT",
        body: {
            username: form.get("username"),
            gender: form.get("gender"),
            location: {
                fullAddress: form.get("fullAddress"),
                state: form.get("state"),
                city: form.get("city"),
                country: form.get("country"),
            },
        },
    });
}

export async function updateUserAvatar(form: FormData) {
    console.log("🚀 ~ updateUserAvatar ~ form:", form.get("image"));
    return await apiClient("/api/user/avatar", {
        method: "PUT",
        body: form,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export async function updateEmailAction(formData: FormData) {
    return await apiClient("/api/user/change-email", {
        method: "PUT",
        body: {
            newEmail: formData.get("email"),
        },
    });
}
