import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserDocument } from "@/lib/definitions";
import { getUser } from "@/server/user";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

const UserPage = async () => {
  const user: UserDocument = await getUser();
  return (
    <>
      {!user?.emailConfirmed && (
        <p className="bg-destructive text-white border-destructive/50 p-3 rounded-md">
          Please confirm your email address by clicking the link we've sent to
          your inbox. If you didn't receive the email, be sure to check your
          spam or junk folder.
        </p>
      )}
      <div className="flex gap-4 justify-start mb-4 border-b pb-8">
        <Image
          src="https://placecats.com/bella/500/500"
          alt="User profile"
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-1">
            {user?.emailConfirmed && (
              <ShieldCheck className="text-primary inline-block w-6 me-1" />
            )}{" "}
            {user?.name}
          </h2>
        </div>
      </div>
      <UserForm />
    </>
  );
};

const UserForm = () => {
  return (
    <form>
      <h2 className="text-xl">Edit Your Personal Data</h2>
      <div className="mb-4">
        <Label htmlFor="firstName" className="">
          First Name *
        </Label>
        <Input
          required
          type="text"
          id="firstName"
          name="firstName"
          className=""
          placeholder="First name"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="lastName" className="">
          Last Name *
        </Label>
        <Input
          required
          type="text"
          id="lastName"
          name="lastName"
          className=""
          placeholder="Last name"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="email" className="">
          Email *
        </Label>
        <Input
          required
          type="email"
          id="email"
          name="email"
          className=""
          placeholder="Email"
        />
      </div>
      <Button type="submit" className="bg-primary text-white">
        Save Changes
      </Button>
    </form>
  );
};
export default UserPage;
