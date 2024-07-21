export interface Comment {
  _id?: string;
  text: string;
  rate: number;
  owner: string;
}

export interface CommentHandler {
  commentText: string;
  rating: number;
}
