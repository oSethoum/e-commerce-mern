import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  isAdmin: boolean;
  address: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  address: {
    type: String,
  },
  avatar: {
    type: String,
    default: "profile.png",
  },
  password: {
    type: String,
    min: 4,
    max: 30,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
