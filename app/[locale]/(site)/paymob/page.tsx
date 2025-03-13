"use client";

import { useCreateIntention } from "@/hooks/paymob";
import React from "react";

export default function PaymobPage() {
    const { isPending, mutate } = useCreateIntention();

    const handleTestPayment = async () => {
        mutate(
            { test: "test" },
            {
                onSuccess: (data) => {
                    window.open(
                        ` https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_jrWtWoHshgVAhZ8Yx4W6eSa5udsUlpwZ&clientSecret=${data.client_secret}`
                    );
                },
            }
        );
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Paymob Test Page</h1>
            <button
                onClick={handleTestPayment}
                disabled={isPending}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {isPending ? "Processing..." : "Test Paymob Payment"}
            </button>
        </div>
    );
}
