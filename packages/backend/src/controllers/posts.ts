import { Response } from "express";
import Post from "../models/post_model";
import { AuthRequest } from "../middlewares/auth_middleware";
import User from "../models/user_model";

const addPost = async (req: AuthRequest, res: Response) => {
  let imgUrl: string | null = null;
  if (req.file) {
    imgUrl = `${req.file.path}`;
    imgUrl = imgUrl.replace(/\\/g, "/");
  }

  const currentUser = await User.findById({ _id: req.user?._id });

  if (currentUser) {
    await Post.create({
      title: req.body.title,
      text: req.body.text,
      ownerId: req.user?._id,
      owner: currentUser.name,
      url: imgUrl,
      comments: [],
    });
  }

  return res.status(200).send("Created");
};

const updatePost = async (req: AuthRequest, res: Response) => {
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

const deletePost = async (req: AuthRequest, res: Response) => {
  const delPost = await Post.findOne({
    _id: req.params.id,
    owner: req.user?._id,
  });
  console.log(req.user?._id);
  if (delPost) {
    await Post.deleteOne({ _id: req.params.id });
    return res.status(200).send("delete");
  } else {
    return res.status(400).send("This post not exist in you account");
  }
};

const getAllPosts = async (req: AuthRequest, res: Response) => {
  const allPost = await Post.find({});
  return res.status(200).send(allPost);
};

const getMyPosts = async (req: AuthRequest, res: Response) => {
  const allPost = await Post.find({ owner: req.user?._id });
  return res.status(200).send(allPost);
};

const getPost = async (req: AuthRequest, res: Response) => {
  const specPost = await Post.findOne({
    _id: req.params.id,
  });
  console.log(specPost);
  return res.status(200).send(specPost);
};

export default {
  addPost,
  deletePost,
  updatePost,
  getAllPosts,
  getMyPosts,
  getPost,
};
