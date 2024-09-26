import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-dvh grid place-content-center">
      <Loader className="text-primary w-10 h-w-10 animate-spin" />
    </div>
  );
};

export default Loading;
