import mongoose, { Schema } from "mongoose";
import { UserType } from "../types/user";

const reqString = {
  type: String,
  required: true,
};

const UserSchema = new Schema<UserType>(
  {
    user: {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      username: String,
      discriminator: String,
      iconURL: String,
      email: String,
      accessToken: reqString,
      refreshToken: reqString,
    },
    guilds: [],
  },
  { versionKey: false }
);

export default mongoose.model("users", UserSchema);
