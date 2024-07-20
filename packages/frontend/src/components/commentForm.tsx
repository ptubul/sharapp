import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Rating, Typography } from "@mui/material";

interface HandlerProps {
  submitHandler: (commentText: string, rating: number) => void;
}

export default function CommentForm({ submitHandler }: HandlerProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setRating(0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [rating, setRating] = React.useState<number | null>(0);

  return (
    <React.Fragment>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(
              (formData as FormData).entries()
            );
            submitHandler(formJson.text.toString(), Number(formJson.rating));
            handleClose();
          },
        }}
      >
        <DialogTitle>Add comment</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill your opinion here.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="text"
            label="Your comment"
            type="input"
            multiline
            fullWidth
            variant="standard"
          />
          <Typography sx={{ marginY: 1 }}>Your rating:</Typography>
          <Rating
            name="rating"
            aria-required
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit"> save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
