import { Request, Response } from "express";
import Post, { CommentModel } from "../models/post_model";
import { v4 as uuidv4 } from "uuid";

const addComment = async (req: Request, res: Response) => {
  const editedPost = await Post.findById({ _id: req.body.postId });

  const comment: CommentModel = { ...req.body.comment, _id: uuidv4() };
  editedPost?.commments?.push(comment);
  console.log(editedPost?.commments);
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
