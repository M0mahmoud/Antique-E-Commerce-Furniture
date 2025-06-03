"use client"; // Error boundaries must be Client Components

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCcw } from "lucide-react";

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-destructive/20"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-destructive animate-spin"
                style={{ animationDuration: "3s" }}
              ></div>
              <AlertCircle className="w-16 h-16 text-destructive absolute inset-0 p-2" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Something went wrong!
              </h2>
              <p className="text-muted-foreground">
                {error.message ||
                  "An unexpected error occurred. Please try again later."}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <Link
              href="/"
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                "h-10 px-4 py-2 mt-4",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
