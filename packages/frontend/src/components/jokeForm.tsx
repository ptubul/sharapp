import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Joke } from "../types/jokeTypes";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface HandlerProps {
  submitHandler: (joke: Joke) => void;
}

export default function JokeForm({ submitHandler }: HandlerProps) {
  const imgPlaceholder = "https://via.placeholder.com/300x200";
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState(imgPlaceholder);
  const [title, setTitle] = React.useState("");
  const [jokeText, setJokeText] = React.useState("");
  const jokeId = "111111111";

  const handleRemoveClick = () => {
    setImageUrl(imgPlaceholder);
    setFile(null);
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);
    console.log(uploadedFile);
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        reader.result?.toString()
          ? setImageUrl(reader.result?.toString())
          : null;
      };
      reader.readAsDataURL(uploadedFile);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

            const newJoke: Joke = {
              id: jokeId,
              text: formJson.text.toString(),
              title: formJson.title.toString(),
              image: file,
            };
            console.log(newJoke.text);
            submitHandler(newJoke);
            handleClose();
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>Add joke</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="input"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="text"
            label="Your joke"
            type="input"
            fullWidth
            multiline
            variant="standard"
          />
          <Box
            component="img"
            sx={{
              width: 300,
              height: 200,
              objectFit: "cover",
              borderRadius: 2,
            }}
            alt="Example Image"
            src={imageUrl}
          />
          <Fab color="error" aria-label="add" onClick={handleRemoveClick}>
            <HighlightOffIcon />
          </Fab>
          <div>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleUploadImage} />
            </Button>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit"> save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
