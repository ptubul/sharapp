import { Comment } from "./commentTypes";

export interface Joke {
  _id: string | null;
  title?: string;
  text?: string;
  url?: string;
  image?: File | null;
  comments: Comment[];
}

export interface Jokes {
  jokes: Joke[];
}
