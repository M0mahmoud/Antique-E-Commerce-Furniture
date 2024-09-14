import { cn } from "@/lib/utils";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader, Trash } from "lucide-react";
import { FC, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const basicKey = process.env.NEXT_PUBLIC_BASIC_KEY;

interface UploadProps {
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  buttonText?: string;
  className?: string;
}

const authenticator = async () => {
  try {
    const response = await fetch("/api/upload/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload: FC<UploadProps> = ({
  onSuccess,
  onError,
  buttonText = "Upload",
  className = "",
}) => {
  const ikUploadRef = useRef<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [res, setRes] = useState<IKUploadResponse>();

  const handleError = (err: any) => {
    setIsUploading(false);
    toast.error("Upload failed", {
      description: err.message || "An error occurred during upload",
    });
    if (onError) onError(err);
  };

  const handleSuccess = (res: IKUploadResponse) => {
    setIsUploading(false);
    setRes(res);
    toast.success("Upload successful");
    if (onSuccess) onSuccess(res);
  };

  const onUploadProgress = () => {
    setIsUploading(true);
  };

  const handleDeleteFie = async (fileId: string) => {
    try {
      const response = await fetch(
        `https://api.imagekit.io/v1/files/${fileId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",

            Authorization: `Basic ${basicKey}`,
          },
        }
      );
      if (response.status === 204) {
        setRes(undefined);
        toast.info("File Deleted Successful");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={handleError}
        onSuccess={handleSuccess}
        onUploadProgress={onUploadProgress}
        style={{ display: "none" }}
        ref={ikUploadRef}
      />
      <Button
        type="button"
        onClick={() => ikUploadRef.current.click()}
        className={cn(
          "text-white bg-primary px-3 py-1 font-semibold block",
          className
        )}
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <Loader className="inline-flex animate-spin w-5 h-5 text-white me-2" />{" "}
            Loading...
          </>
        ) : (
          buttonText
        )}
      </Button>
      {res?.filePath && (
        <div className="flex gap-1 items-center mt-2 ">
          <Trash
            onClick={() => handleDeleteFie(res.fileId)}
            className="w-6 h-6 text-destructive transition-colors cursor-pointer rounded-md"
          />
          <p className="bg-primary/20 text-dark py-1 px-2 w-fit rounded-md text-base mb-0">
            {res?.filePath}
          </p>
        </div>
      )}
    </ImageKitProvider>
  );
};

export default Upload;
