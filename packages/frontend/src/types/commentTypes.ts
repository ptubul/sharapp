export interface Comment {
  _id?: string;
  text: string;
  rating: number;
  name: string | null;
  ownerId: string | null;
}

export interface CommentHandler {
  commentText: string;
  rating: number;
}
