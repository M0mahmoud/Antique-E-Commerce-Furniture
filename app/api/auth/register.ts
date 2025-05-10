import { apiClient } from "@/lib/apiClient";

export async function loginAction(formData: FormData) {
  return await apiClient("/auth/login", {
    method: "POST",
    body: {
      email: formData.get("email"),
      password: formData.get("password"),
    },
  });
}

export async function signupAction(formData: FormData) {
  return await apiClient("/auth/signup", {
    method: "POST",
    body: {
      email: formData.get("email"),
      password: formData.get("password"),
      username: formData.get("username"),
    },
  });
}

export async function resendVerificationCodeAction(email: string) {
  return await apiClient("/auth/resend-code", {
    method: "POST",
    body: { email },
  });
}

export async function verifyOTPAction(formData: FormData) {
  return await apiClient("/auth/verify-email", {
    method: "POST",
    body: {
      email: formData.get("email"),
      code: formData.get("code"),
    },
  });
}

export async function forgetPasswordAction(formData: FormData) {
  return await apiClient("/auth/forgot-password", {
    method: "POST",
    body: {
      email: formData.get("email"),
    },
  });
}

export async function resetPasswordAction(form: FormData) {
  return await apiClient(
    `/auth/reset-password/${form.get("userID")}/${form.get("resetToken")}`,
    {
      method: "POST",
      body: {
        newPassword: form.get("newPassword"),
      },
    }
  );
}
