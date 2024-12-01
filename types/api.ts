export type ApiResponse<T = any> = {
    status: boolean;
    message: string;
    data: T | null;
    error?: {
        status: number;
        message: string;
    };
};

export type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: HeadersInit;
};

export type SessionPayload = {
    userID: string | number;
};