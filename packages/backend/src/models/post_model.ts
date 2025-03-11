import mongoose, { Schema, model } from "mongoose";

export interface CommentModel {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  text: string;
  rating: number;
  ownerId?: string;
}

export interface PostModel extends Document {
  owner: string;
  ownerId: string;
  title: string;
  text: string;
  url?: string;
  comments: CommentModel[];
}

const commentSchema = new Schema<CommentModel>({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: false },
  rating: { type: Number, required: false },
  text: { type: String, required: false },
  ownerId: { type: String, required: false },
});

const postSchema = new Schema<PostModel>({
  owner: { type: String, required: false },
  ownerId: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  url: { type: String, required: false },
  comments: { type: [commentSchema], default: [] },
});

const Post = model<PostModel>("Post", postSchema);

export default Post;
