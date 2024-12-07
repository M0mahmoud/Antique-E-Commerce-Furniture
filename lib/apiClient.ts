import { ApiResponse, RequestOptions } from "@/types/api";
import cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API;

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    console.log("🚀 ~ data:", data);

    if (!response.ok) {
        return {
            status: false,
            message: data.message || "An error occurred",
            data: null,
            error: {
                status: response.status,
                message: data.message || "An error occurred",
            },
        };
    }

    return {
        status: true,
        message: data.message || "",
        data: data.data,
    };
}

export async function apiClient<T = any>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<ApiResponse<T>> {
    const { method = "GET", body, headers = {} } = options;

    const requestHeaders: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token") || ""}`,
        ...headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers: requestHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });

        return handleResponse<T>(response);
    } catch (error) {
        return {
            status: false,
            message: "Network error or server is unreachable",
            data: null,
            error: {
                status: 500,
                message: "Network error or server is unreachable",
            },
        };
    }
}
