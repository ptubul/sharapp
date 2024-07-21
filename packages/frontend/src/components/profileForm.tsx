import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  IconButton,
  Container,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../context/CurrentUserContext";
import { getUser, updateUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";
const Input = styled("input")({
  display: "none",
});

const ProfileForm: React.FC = () => {
  const userData = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("user@example.com");
  const [avatar, setAvatar] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setName(user.name);
      setEmail(user.email);
    };
    fetchUser();
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  const handleSave = async () => {
    // Save logic here
    await updateUser({ data: { email: email, name: name }, image: avatar });
    console.log("Saved", { name, email, avatar });
  };

  const handleCancel = () => {
    // Reset to initial state or fetch current data again
    setName("");
    setAvatar(null);
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "16px", marginTop: "40px" }}>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Avatar
              alt="Avatar"
              src={avatar || "https://via.placeholder.com/150"}
              style={{ width: 180, height: 180, margin: "0 auto" }}
            />
            <div>
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <IconButton
                color="secondary"
                aria-label="remove picture"
                onClick={handleRemoveAvatar}
              >
                <Delete />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Name"
              value={name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              value={email}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfileForm;
