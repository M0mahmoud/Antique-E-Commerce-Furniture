import { XCircle } from "lucide-react";
import React from "react";

const Expired = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <XCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h1 className="text-2xl font-semibold text-red-500 mt-4">
          Link Expired
        </h1>
        <p className="text-gray-600 mt-2">
          The confirmation link has expired. Please request a new confirmation
          link.
        </p>
      </div>
    </div>
  );
};

export default Expired;
