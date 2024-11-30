"use client";

import { authStorage } from "@/lib/auth";
import { User } from "@/types/user";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

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

    useEffect(() => {
        const storedToken = authStorage.getToken();
        const storedUser = authStorage.getUser();

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
        }
    }, []);

    const setAuth = (newUser: User, newToken: string) => {
        setUser(newUser);
        setToken(newToken);
        authStorage.setToken(newToken);
        authStorage.setUser(newUser);
        Cookies.set("token", newToken);
    };

    const clearAuth = () => {
        setUser(null);
        setToken(null);
        authStorage.clearAuth();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                setAuth,
                clearAuth,
                isAuthenticated: !!token && !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
