import { Typography } from "@mui/material";
import { Comment } from "../types/commentTypes";
import Rating from "@mui/material/Rating";

interface CommentProps {
  comment: Comment;
}
const CommentItem = ({ comment }: CommentProps) => {
  return (
    <div>
      <Typography sx={{ fontWeight: "bold" }}>{comment.owner}:</Typography>
      <Typography>{comment.text}</Typography>
      <div>
        <Rating name="read-only" value={comment.rate} readOnly />
      </div>
    </div>
  );
};

export default CommentItem;
