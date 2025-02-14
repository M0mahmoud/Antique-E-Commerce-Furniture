import {
  forgetPasswordAction,
  loginAction,
  resendVerificationCodeAction,
  resetPasswordAction,
  signupAction,
  verifyOTPAction,
} from "@/app/api/auth/register";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => loginAction(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: (formData: FormData) => signupAction(formData),
  });
}

export function useResendVerificationCode() {
  return useMutation({
    mutationFn: resendVerificationCodeAction,
  });
}

export function useVerifyOTP() {
  return useMutation({
    mutationFn: (formData: FormData) => verifyOTPAction(formData),
  });
}

export function useForgetPassword() {
  return useMutation({
    mutationFn: (formData: FormData) => forgetPasswordAction(formData),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (formData: FormData) => resetPasswordAction(formData),
  });
}
