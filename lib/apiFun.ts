import { apiClient } from "./apiClient";

export async function loginAction(_: any, formData: FormData) {
  return await apiClient("/auth/login", {
    method: "POST",
    body: {
      email: formData.get("email"),
      password: formData.get("password"),
    },
  });
}

export async function signupAction(_: any, formData: FormData) {
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
    body: {
      email,
    },
  });
}

export async function verifyOTPAction(_: any, formData: FormData) {
  return await apiClient("/auth/verify-email", {
    method: "POST",
    body: {
      email: formData.get("email"),
      code: formData.get("code"),
    },
  });
}

export async function forgetPasswordAction(_: any, formData: FormData) {
  return await apiClient("/auth/forgot-password", {
    method: "POST",
    body: {
      email: formData.get("email"),
    },
  });
}

export async function resetPasswordAction(_: any, form: FormData) {
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

export async function GetUser() {
  return await apiClient("/user/profile", {
    method: "GET",
  });
}
export async function updateUserAction(_: any, form: FormData) {
  return await apiClient("/user/profile", {
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

export async function updateEmailAction(_: any, formData: FormData) {
  return await apiClient("/user/change-email", {
    method: "PUT",
    body: {
      newEmail: formData.get("email"),
    },
  });
}
