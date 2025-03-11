import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Rating,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Comment } from "../types/commentTypes";
import { deleteJoke, getJoke } from "../services/postServices";
import { Joke } from "../types/jokeTypes";
import { useNavigate, useParams } from "react-router-dom";
import { createComment } from "../services/commentsServices";
import placeHolder from "../assets/pngwing.com.png";

const PostPage: React.FC = () => {
  const defaultComment = {
    name: localStorage.getItem("userName"),
    text: "",
    rating: 0,
    ownerId: localStorage.getItem("userId"),
  };
  const navigate = useNavigate();
  const isOwner = true;
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<Comment>(defaultComment);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [post, setPost] = useState<Joke>({
    _id: "",
    url: "../assets/pngwing.com.png",
    owner: "",
    title: "Post Title",
    text: "Post text goes here. This is a sample post.",
    comments: [],
  });
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const { jokeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (jokeId) {
        return await getJoke(jokeId);
      }
    };

    fetchData().then((res: Joke | undefined) => {
      if (res != undefined) {
        setComments(res.comments);
        setPost(res);
      }
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setNewComment({ ...newComment, rating: value || 0 });
  };

  const handleSave = async () => {
    if (jokeId) {
      console.log(newComment);
      const res = await createComment(jokeId, newComment);
      newComment._id = res.commentId;
      setComments([...comments, newComment]);
      setNewComment(defaultComment);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (jokeId) {
      deleteJoke(jokeId);
      navigate(-1);
      setOpenDeleteDialog(false);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditSave = () => {
    // Perform edit save action here
    if (newPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost({ ...post, photo: reader.result as string });
      };
      reader.readAsDataURL(newPhoto);
    }
    setOpenEditDialog(false);
  };

  const handleEditCancel = () => {
    setOpenEditDialog(false);
  };

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewPhoto(file);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, padding: 2 }}>
      <Box sx={{ flex: 1 }}>
        <Card>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="300"
              src={
                post.url
                  ? `http://localhost:3000/postsImages/${post.url}`
                  : placeHolder
              }
              alt="Post Image"
            />
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* <IconButton color="primary" onClick={handleEditClick}>
                <EditIcon />
              </IconButton> */}
              <IconButton color="error" onClick={handleDeleteClick}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.text}
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Text"
            name="text"
            value={newComment.text}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Rating
              name="rating"
              value={newComment.rating}
              onChange={handleRatingChange}
            />
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{ flexGrow: 1 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ flexGrow: 1 }}
              >
                Back
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ flex: 1, maxHeight: "400px", overflowY: "auto" }}>
        <Stack spacing={2}>
          {comments.map((comment, index) => (
            <Paper key={index} sx={{ p: 2 }}>
              <Typography variant="h6">{comment.name}</Typography>
              <Typography variant="body1">{comment.text}</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Rating:
                </Typography>
                <Rating value={comment.rating} readOnly />
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditCancel}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              sx={{ mb: 2 }}
            />
            {newPhoto && (
              <Box sx={{ mb: 2 }}>
                <img
                  src={URL.createObjectURL(newPhoto)}
                  alt="Preview"
                  style={{
                    width: "200px",
                    height: "130px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
            <TextField
              label="Title"
              name="title"
              value={post.title}
              onChange={handlePostChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Text"
              name="text"
              value={post.text}
              onChange={handlePostChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PostPage;
