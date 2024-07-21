import { Response } from "express";
import { AuthResquest } from "../middlewares/auth_middleware";
import User from "../models/user_model";

const getUser = async (req: AuthResquest, res: Response) => {
  console.log(req.user);
  const reqUser = await User.findById({ _id: req.user?._id });
  if (reqUser) {
    return res.status(200).send(reqUser);
  }
};

const updateUser = async (req: AuthResquest, res: Response) => {
  const updatedUser = req.body;

  // take the image of user if exist from the storage and return the object
  return res.status(200);
};
export { getUser, updateUser };
