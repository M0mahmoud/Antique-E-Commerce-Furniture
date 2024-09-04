import { verifySession } from "@/lib/session";
import { Link, redirect } from "@/navigation";
import { SignInForm } from "./SignInForm";

const SignIn = async () => {
  const { isAuth } = await verifySession();
  if (isAuth) {
    redirect("/user");
  }
  return (
    <div className="flex flex-col p-4 lg:w-1/3 min-h-dvh justify-center mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">SignIn</h1>
        <p className="text-gray-500">
          Enter your email below to SignIn to your account
        </p>
      </div>
      <div className="mt-6">
        <SignInForm />
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline" href="/auth/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
