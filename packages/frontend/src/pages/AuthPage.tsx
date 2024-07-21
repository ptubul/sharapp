// src/AuthPage.tsx
import React, { useState, ChangeEvent } from "react";
// import { auth, googleProvider } from "./firebase-config";
// import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { loginBasic, registerBasic } from "../services/userServices";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setIsLogin(newValue === 0);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      await loginBasic(email, password);
      alert("Logged in successfully!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleRegister = async () => {
    try {
      await registerBasic(email, password);
      alert("Registered successfully!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      //   await signInWithPopup(auth, googleProvider);
      alert("Logged in with Google!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" align="center">
          Welcome
        </Typography>
        <Tabs
          value={isLogin ? 0 : 1}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
          />
          {isLogin ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegister}
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
            sx={{ mt: 2 }}
          >
            Login with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthPage;
