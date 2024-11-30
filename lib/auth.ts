import { User } from "@/types/user";

export const AUTH_TOKEN_KEY = "auth_token";
export const USER_DATA_KEY = "user_data";

export const authStorage = {
    setToken: (token: string) => {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    },

    getToken: () => {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    },

    setUser: (user: User) => {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    },

    getUser: (): User | null => {
        const user = localStorage.getItem(USER_DATA_KEY);
        return user ? JSON.parse(user) : null;
    },

    clearAuth: () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
    },
};
