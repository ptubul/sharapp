import { Schema, model } from "mongoose";

export interface PostModel extends Document {
  owner: string;
  title: string;
  text: string;
  url?: string;
  commments?: string[];
}

const postSchema = new Schema<PostModel>({
  owner: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  url: { type: String, required: false },
  commments: { type: [String], required: false },
});

const Post = model<PostModel>("Post", postSchema);

export default Post;
