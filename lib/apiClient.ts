import type { ApiResponse, RequestOptions } from "@/types/api";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API;

async function handleResponse<T>(
  response: AxiosResponse
): Promise<ApiResponse<T>> {
  const data = response.data;

  if (response.status >= 400) {
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

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.get("token") || ""}`,
  };

  // Safely merge additional headers
  Object.entries(headers).forEach(([key, value]) => {
    if (typeof value === "string") {
      requestHeaders[key] = value;
    }
  });

  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: requestHeaders,
      data: body,
    });

    return handleResponse<T>(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return {
        status: false,
        message:
          axiosError.response?.data?.message ||
          axiosError.message ||
          "Network error or server is unreachable",
        data: null,
        error: {
          status: axiosError.response?.status || 500,
          message:
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Network error or server is unreachable",
        },
      };
    } else {
      return {
        status: false,
        message: "An unexpected error occurred",
        data: null,
        error: {
          status: 500,
          message: "An unexpected error occurred",
        },
      };
    }
  }
}
