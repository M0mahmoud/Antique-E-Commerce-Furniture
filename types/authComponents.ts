import { Dispatch, SetStateAction } from "react";
import { ApiResponse } from "./api";

export type EmailFormProps = {
    action: (formData: FormData) => void;
    isPending: boolean;
    state: ApiResponse | null;
    setEmail: Dispatch<SetStateAction<string>>;
};

export type UpdateEmailFormProps = {
    setEmail: Dispatch<SetStateAction<string>>;
    emailAction: (form: FormData) => void;
    isEmailPending: boolean;
    emailState: ApiResponse | null;
    email: string;
};

export type OTPFormProps = {
    action: (formData: FormData) => void;
    isPending: boolean;
    state: ApiResponse | null;
    email: string;
};

export type ResetFormProps = {
    action: (formData: FormData) => void;
    isPending: boolean;
    state: ApiResponse | null;
    resetData: {
        resetToken: string;
        userID: string;
    };
};
