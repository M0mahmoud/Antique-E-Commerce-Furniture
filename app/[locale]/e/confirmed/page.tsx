import { Link } from "@/navigation";
import { CheckCircle } from "lucide-react";
import React from "react";

const Confirmed = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-2xl font-semibold text-green-500 mt-4">
          Email Confirmed
        </h2>
        <p className="text-gray-600 mt-2">
          Your email has been successfully confirmed. You can now proceed.
        </p>
        <Link
          href="/user"
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Confirmed;
