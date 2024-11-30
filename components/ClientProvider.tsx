"use client";
import { AuthProvider } from "@/context/usercontext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    );
};

export default ClientProvider;
