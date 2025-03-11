import { Response } from "express";
import Post, { CommentModel } from "../models/post_model";
import User from "../models/user_model";
import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";
import { AuthRequest } from "../middlewares/auth_middleware";

const addComment = async (req: AuthRequest, res: Response) => {
  const editedPost = await Post.findById({ _id: req.body.postId });

  const user = await User.findById({ _id: req.user?._id });
  const username = user?.name ? user.name : "Anonymous";
  try {
    const comment: CommentModel = {
      ...req.body.comment,
      ownerId: req.user?._id,
      name: username,
      _id: new mongoose.Types.ObjectId(),
    };

    editedPost?.comments.push(comment);

    editedPost?.save();

    return res.status(200).send({ message: "comment added" });
  } catch {
    console.log("error in add comment");
  }
};

export { addComment };
