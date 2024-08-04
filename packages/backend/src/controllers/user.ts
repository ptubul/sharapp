import { Response } from "express";
import { AuthRequest } from "../middlewares/auth_middleware";
import User from "../models/user_model";

const getUser = async (req: AuthRequest, res: Response) => {
  console.log(req.user);
  const reqUser = await User.findById({ _id: req.user?._id });
  if (reqUser) {
    return res.status(200).send(reqUser);
  }
};

const updateUser = async (req: AuthRequest, res: Response) => {
  const updatedUser = User.findById({ _id: req.user?._id });
  console.log(updatedUser);
  updatedUser.updateOne({ ...req.body });

  // take the image of user if exist from the storage and return the object
  return res.status(200).send("r");
};
export { getUser, updateUser };
