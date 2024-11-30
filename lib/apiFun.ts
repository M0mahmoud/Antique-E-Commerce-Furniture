import { apiClient } from "./apiClient";

export async function loginAction(_: any, formData: FormData) {
    return await apiClient("/api/auth/login", {
        method: "POST",
        body: {
            email: formData.get("email"),
            password: formData.get("password"),
        },
    });
}

export async function signupAction(_: any, formData: FormData) {
    return await apiClient("/api/auth/signup", {
        method: "POST",
        body: {
            email: formData.get("email"),
            password: formData.get("password"),
            username: formData.get("username"),
        },
    });
}

export async function resendVerificationCodeAction(email: string) {
    return await apiClient("/api/auth/signup/resend-code", {
        method: "POST",
        body: {
            email,
        },
    });
}

export async function verifyOTPAction(_: any, formData: FormData) {
    return await apiClient("/api/auth/verify-email", {
        method: "POST",
        body: {
            email: formData.get("email"),
            code: formData.get("code"),
        },
    });
}

export async function forgetPasswordAction(_: any, formData: FormData) {
    return await apiClient("/api/auth/forgot-password", {
        method: "POST",
        body: {
            email: formData.get("email"),
        },
    });
}

export async function resetPasswordAction(_: any, form: FormData) {
    console.log("🚀 ~ resetPasswordAction ~ form:", form.get("userID"));
    console.log("🚀 ~ resetPasswordAction ~ form:", form.get("resetToken"));
    return await apiClient(
        `/api/auth/reset-password/${form.get("userID")}/${form.get(
            "resetToken",
        )}`,
        {
            method: "POST",
            body: {
                newPassword: form.get("newPassword"),
            },
        },
    );
}
