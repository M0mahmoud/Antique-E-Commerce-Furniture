import {
  GetUser,
  updateEmailAction,
  updateUserAction,
  updateUserAvatar,
} from "@/app/api/user";
import { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUser() {
  return useQuery<{ data: User }>({
    queryKey: ["user"],
    queryFn: GetUser,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => updateUserAction(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => updateUserAvatar(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useUpdateEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => updateEmailAction(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
