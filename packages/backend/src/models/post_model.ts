import { Schema, model } from "mongoose";

export interface CommentModel {
  _id: object;
  owner: string;
  text: string;
  rate: number;
  ownerId?: string;
}

export interface PostModel extends Document {
  owner: string;
  title: string;
  text: string;
  url?: string;
  comments: CommentModel[];
}

const commentSchema = new Schema<CommentModel>({
  _id: { type: Object, required: true, unique: true },
  owner: { type: String, required: true },
  rate: { type: Number, required: true },
  text: { type: String, required: true },
  ownerId: { type: String, required: false },
});

const postSchema = new Schema<PostModel>({
  owner: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  url: { type: String, required: false },
  comments: { type: [commentSchema], required: false },
});

const Post = model<PostModel>("Post", postSchema);

export default Post;
