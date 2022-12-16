import mongoose from "mongoose";
import { IUser } from "types/IUser";

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  token: {
    type: String,
  },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
