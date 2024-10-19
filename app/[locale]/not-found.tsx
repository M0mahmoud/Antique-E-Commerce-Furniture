import { Link } from "@/i18n/routing";
import img404 from "@/images/404.svg";
import Image from "next/image";

// Catching unknown routes
export default function NotFoundPage() {
  return (
    <div className="grid place-content-center w-full min-h-dvh text-center text-dark py-12">
      <Image
        src={img404}
        width={288}
        height={156}
        loading="lazy"
        alt="404 Image"
        className="bg-cover mx-auto"
      />
      <h2 className="capitalize text-3xl my-4 font-bold">We lost that page</h2>
      <p className="text-lg">
        The page you are looking for was moved, removed or might never existed.
      </p>
      <Link
        className="bg-primary text-white px-3 py-2 my-4 rounded-md"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
