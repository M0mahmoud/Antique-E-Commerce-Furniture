import { Link } from "@/i18n/routing";
import img404 from "@/images/404.svg";
import Image from "next/image";

// Catching unknown routes
export default function NotFoundPage() {
  return (
    <div className="container grid m-auto text-center place-content-center min-h-dvh text-dark">
      <Image
        src={img404}
        width={288}
        height={156}
        loading="lazy"
        alt="404 Image"
        className="mx-auto bg-cover"
      />
      <h2 className="my-4 text-3xl font-bold capitalize">We lost that page</h2>
      <p className="text-lg">
        The page you are looking for was moved, removed or might never existed.
      </p>
      <Link
        className="px-3 py-2 my-4 text-white rounded-md bg-primary"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
