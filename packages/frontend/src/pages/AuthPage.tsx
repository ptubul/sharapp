/* eslint-disable @typescript-eslint/no-unused-vars */
// src/AuthPage.tsx
import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import {
  loginBasic,
  loginGoogle,
  registerBasic,
} from "../services/userServices";
import { useAuth } from "../context/CurrentUserContext";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

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
      navigate("/");
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

  const handleGoogleError = async () => {
    console.log("error in google login");
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      await loginGoogle(credentialResponse);
      navigate("/");
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
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleError}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default AuthPage;
