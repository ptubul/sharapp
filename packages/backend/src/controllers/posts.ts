import { Response } from "express";
import Post from "../models/post_model";
import { AuthRequest } from "../middlewares/auth_middleware";
import User from "../models/user_model";
import mongoose from "mongoose";

const addPost = async (req: AuthRequest, res: Response) => {
  let imgUrl: string | null = null;
  if (req.file) {
    imgUrl = `${req.file.path}`;
    imgUrl = imgUrl.replace(/\\/g, "/");
  }

  const currentUser = await User.findById({ _id: req.user?._id });
  const newJoke = {
    title: req.body.title,
    text: req.body.text,
    ownerId: req.user?._id,
    owner: currentUser ? currentUser.name : "",
    url: imgUrl,
    comments: {
      _id: new mongoose.Types.ObjectId(),
    },
  };

  await Post.create(newJoke);
  const { url, ...rest } = newJoke;
  const returnedNewJoke = {
    url: req.file?.filename,
    rest,
  };

  return res.status(200).json(returnedNewJoke);
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
    ownerId: req.user?._id,
  });
  console.log(req.user?._id);

  if (delPost) {
    await Post.deleteOne({ _id: req.params.id });
    return res.status(200).send("delete");
  } else {
    return res.status(400).send("This post not exist in your account");
  }
};

const getAllPosts = async (req: AuthRequest, res: Response) => {
  const allPost = await Post.find({});
  for (const post of allPost) {
    post.url = post.url?.split("/").pop();
    if (post.comments.length === 1) post.comments = [];
  }
  return res.status(200).send(allPost);
};

const getMyPosts = async (req: AuthRequest, res: Response) => {
  const currUser = req.user?._id;

  let allPost = null;

  allPost = await Post.find({ ownerId: currUser });
  for (const post of allPost) {
    post.url = post.url?.split("/").pop();
    if (post.comments.length === 1) post.comments = [];
  }
  return res.status(200).send(allPost);
};

const getPost = async (req: AuthRequest, res: Response) => {
  const specPost = await Post.findOne({
    _id: req.params.id,
  });
  if (specPost) {
    specPost.url = specPost.url?.split("/").pop();
    if (specPost.comments.length === 1) specPost.comments = [];
  }
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
