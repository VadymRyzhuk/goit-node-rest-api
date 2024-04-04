import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";
import { emailRegexp } from "../constants/user-constants.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
