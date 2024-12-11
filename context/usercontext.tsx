"use client";

import Loading from "@/components/Loading";
import { GetUser } from "@/lib/apiFun";
import { User } from "@/types/user";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, {
    createContext,
    Suspense,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

interface AuthContextType {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    clearAuth: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    const fetchUser = useCallback(async () => {
        if (user) return; // Skip if user is already loaded
        try {
            const savedToken = Cookies.get("token");
            if (savedToken) {
                setToken(savedToken);
                const user = await GetUser();
                if (user.status) {
                    setUser(user.data);
                }
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            clearAuth();
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const isAuthenticated = useMemo(() => !!user && !!token, [user, token]);

    const setAuth = useCallback((newUser: User, newToken: string) => {
        setUser(newUser);
        setToken(newToken);
        Cookies.set("token", newToken);
    }, []);

    const clearAuth = useCallback(() => {
        setUser(null);
        setToken(null);
        Cookies.remove("token");
        router.replace("/auth/signin");
    }, [router]);

    const contextValue = useMemo(
        () => ({
            user,
            token,
            setAuth,
            clearAuth,
            isAuthenticated,
        }),
        [user, token, setAuth, clearAuth, isAuthenticated]
    );

    return (
        <AuthContext value={contextValue}>
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </AuthContext>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
