import { Schema, model, Document } from "mongoose";

export interface UserModel extends Document {
  email: string;
  password: string;
  refreshTokens?: string[];
}

// Define schema for User model
const userSchema = new Schema<UserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshTokens: { type: [String], requiredPaths: false },
});

// Create and export User model
const User = model<UserModel>("User", userSchema);

export default User;
