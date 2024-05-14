import { Request, Response } from "express-serve-static-core";
import User from "../models/user_model";
import zuser_schema from "../models/zuser_model";
import { ZodError } from "zod";
import { MongooseError } from "mongoose";

const login = async (req: Request, res: Response) => {
  req.body;

  res.send("success");
};

const logout = async (req: Request, res: Response) => {
  res.send("logout");
};

const register = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    zuser_schema.parse(user);
  } catch (error) {
    const zodError = error as ZodError;
    return res.status(400).send(zodError);
  }

  const newUser = new User(user);
  try {
    await newUser.save();
    return res.status(200).send(newUser);
  } catch (error) {
    const mongooseError = error as MongooseError;
    console.log(mongooseError);
    return res.status(400).send("registration failed");
  }
};

export default {
  login,
  logout,
  register,
};
