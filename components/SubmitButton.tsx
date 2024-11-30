import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import React from "react";

interface SubmitButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading: boolean;
    loadingText: string;
    text: string;
}

export default function SubmitButton({
    isLoading,
    loadingText = "Loading...",
    className = "",
    text = "Submit",
    ...props
}: SubmitButtonProps) {
    return (
        <Button
            type="submit"
            className={`w-fit text-white py-2 px-4 ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader className="size-5 me-2 animate-spin" />
                    {" loadingText"}
                </>
            ) : (
                text
            )}
        </Button>
    );
}
