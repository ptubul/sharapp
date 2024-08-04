import { Response } from "express";
import Post, { CommentModel } from "../models/post_model";
import { v4 as uuidv4 } from "uuid";
import { AuthRequest } from "../middlewares/auth_middleware";

const addComment = async (req: AuthRequest, res: Response) => {
  const editedPost = await Post.findById({ _id: req.body.postId });

  const comment: CommentModel = { ...req.body.comment, _id: uuidv4() };
  editedPost?.comments.push(comment);
  console.log(editedPost?.comments);
  try {
    editedPost?.save();

    return res
      .status(200)
      .send({ message: "comment added", commentId: comment._id });
  } catch {
    console.log("error in add comment");
  }
};

export { addComment };
