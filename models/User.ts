import { UserDocument } from "@/lib/definitions";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    emailConfirmed: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = models?.User || model<UserDocument>("User", UserSchema);
export default User;