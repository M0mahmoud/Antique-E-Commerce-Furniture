import { createIntention } from "@/app/api/paymob";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateIntention() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (form: { test: string }) => createIntention(form),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [""] });
        },
    });
}
