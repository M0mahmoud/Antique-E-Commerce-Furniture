"use client";

import Loading from "@/components/Loading";
import { useRouter } from "@/i18n/routing";
import { GetUser } from "@/lib/apiFun";
import { User } from "@/types/user";
import Cookies from "js-cookie";
import {
    createContext,
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
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUser = useCallback(async () => {
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
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, []);

    const isAuthenticated = useMemo(() => !!user && !!token, [user, token]);
    const setAuth = (newUser: User, newToken: string) => {
        setUser(newUser);
        setToken(newToken);
        Cookies.set("token", newToken);
    };

    const clearAuth = () => {
        setUser(null);
        setToken(null);
        Cookies.remove("token");
        router.replace("/auth/signin");
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <AuthContext
            value={{
                user,
                token,
                setAuth,
                clearAuth,
                isAuthenticated,
            }}
        >
            {children}
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
