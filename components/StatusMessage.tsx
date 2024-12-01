import { cn } from "@/lib/utils";
import { ApiResponse } from "@/types/api";
import React from "react";

interface StatusMessageProps {
    status: ApiResponse;
    className?: string;
}

export function StatusMessage({ status, className }: StatusMessageProps) {
    return (
        <>
            {status && (
                <p
                    className={cn(
                        "text-sm",
                        status.status ? "text-green-500" : "text-red-500",
                        className,
                    )}
                >
                    {status.message}
                </p>
            )}
        </>
    );
}
