import { Request, Response } from "express";
import Post from "../models/post_model";
import { AuthResquest } from "../middlewares/auth_middleware";

const addPost = async (req: AuthResquest, res: Response) => {
  let imgUrl: string | null = null;

  if (req.file) {
    imgUrl = `${req.file.path}`;
    imgUrl = imgUrl.replace(/\\/g, "/");
  }

  await Post.create({
    title: req.body.title,
    text: req.body.text,
    owner: req.user?._id,
    url: imgUrl,
  });

  return res.sendStatus(200);
};

const updatePost = async (req: AuthResquest, res: Response) => {
  const updatedPost = await Post.findOne({
    _id: req.params.id,
    owner: req.user?._id,
  });

  if (updatedPost) {
    await Post.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).send("Updated");
  } else {
    return res.status(400).send("This post not exist in your account");
  }
};

const deletePost = async (req: AuthResquest, res: Response) => {
  const delPost = await Post.findOne({
    _id: req.params.id,
    owner: req.user?._id,
  });

  if (delPost) {
    await Post.deleteOne({ _id: req.params.id });
    return res.status(200).send("delete");
  } else {
    return res.status(400).send("This post not exist in you account");
  }
};

export default {
  addPost,
  deletePost,
  updatePost,
};
