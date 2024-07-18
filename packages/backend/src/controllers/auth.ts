import { Request, Response } from "express";
import User, { UserModel } from "../models/user_model";
import { MongooseError } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser == null) {
    return res.status(400).send("user not existing");
  }

  const match = await bcrypt.compare(req.body.password, existingUser.password);
  if (!match) {
    return res.status(401).send("email or password is incorrect");
  }
  const tokens = await genTokens(existingUser);
  res.status(200).send(tokens);
};

const logout = async (req: Request, res: Response) => {
  res.send("logout");
};

const register = async (req: Request, res: Response) => {
  const user = req.body;
  const newUser = new User(user);

  if (!newUser.email || !newUser.password) {
    return res.status(400).send("Fill email and password");
  }

  const existingUser = await User.findOne({ email: newUser.email });
  if (existingUser != null) {
    return res.status(400).send("user also registered");
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(newUser.password, salt);
  newUser.password = encryptedPassword;

  try {
    await newUser.save();
    return res.status(200).send(newUser);
  } catch (error) {
    const mongooseError = error as MongooseError;
    console.log(mongooseError);
    return res.status(400).send("registration failed");
  }
};

const genTokens = async (user: UserModel) => {
  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );

  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.JWT_REFRESH_SECRET as Secret
  );
  if (user.refreshTokens == null) {
    user.refreshTokens = [refreshToken];
  } else {
    user.refreshTokens.push(refreshToken);
  }

  await user.save();
  return { accessToken, refreshToken };
};

export default {
  login,
  logout,
  register,
};
