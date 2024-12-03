import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddressPage = () => {
    return (
        <div className="w-full p-2">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Address Deatils
            </h2>
            <form>
                <div className="mb-4">
                    <Label htmlFor="firstName" className="">
                        Street Address *
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
                        Country *
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
                        Town / City *
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
                <div className="mb-4">
                    <Label htmlFor="email" className="">
                        State
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
                <div className="mb-4">
                    <Label htmlFor="email" className="">
                        Zip Code
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
        </div>
    );
};

export default AddressPage;
