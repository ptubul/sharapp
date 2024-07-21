import { Comment } from "../types/commentTypes";
import axiosInstance from "./apiClient";

interface CreateCommentResponse {
  message: string;
  commentId: string;
}

const createComment = async (
  jokeId: string,
  comment: Comment
): Promise<CreateCommentResponse> => {
  const data = { postId: jokeId, comment: comment };
  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzz");
  const response = await axiosInstance.post("/comments", data);
  return response.data;
};
export { createComment };
