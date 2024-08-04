import { Schema, model, Document } from "mongoose";

export interface UserModel extends Document {
  email: string;
  password: string;
  name?: string;
  imgPath: string;
  refreshTokens?: string[];
}

// Define schema for User model
const userSchema = new Schema<UserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshTokens: { type: [String] },
  name: { type: String, required: false },
  imgPath: { type: String },
});

// Create and export User model
const User = model<UserModel>("User", userSchema);

export default User;
