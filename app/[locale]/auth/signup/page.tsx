import { verifySession } from "@/lib/session";
import { Link, redirect } from "@/navigation";
import SignupForm from "./SignupForm";

const SignUp = async () => {
  const { isAuth } = await verifySession();
  if (isAuth) {
    redirect("/user");
  }
  return (
    <div className="flex flex-col p-4 lg:w-1/3 min-h-dvh justify-center mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-500">Enter your information to get started</p>
      </div>
      <div className="mt-6">
        <SignupForm />
      </div>
      <div className="mt-6 text-center">
        Already have an account?{" "}
        <Link className="underline" href="/auth/signin">
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
