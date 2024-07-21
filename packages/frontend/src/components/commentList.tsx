import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import CommentItem from "./comment";
import { Comment } from "../types/commentTypes";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface CommentsListProps {
  comments: Comment[] | undefined;
}
export default function CommentsList({ comments = [] }: CommentsListProps) {
  return (
    <Box sx={{ width: "70%" }}>
      <Stack spacing={2}>
        {comments.map((comment) => (
          <Item key={comment._id}>
            <CommentItem comment={{ ...comment }} />
          </Item>
        ))}
      </Stack>
    </Box>
  );
}
