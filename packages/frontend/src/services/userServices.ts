import { userData } from "../types/userTypes";
import axiosInstance from "./apiClient";
import { CredentialResponse } from "@react-oauth/google";

const loginBasic = async (email: string, password: string): Promise<void> => {
  const data = { email: email, password: password };
  const response = await axiosInstance.post("/auth/login", data);

  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  localStorage.setItem("userId", response.data.userId);
  localStorage.setItem("userName", response.data.userName);
};

const registerBasic = async (
  email: string,
  password: string
): Promise<void> => {
  const data = { email: email, password: password };
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

const loginGoogle = async (
  credentialResponse: CredentialResponse
): Promise<void> => {
  const response = await axiosInstance.post("/auth/google", credentialResponse);
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  localStorage.setItem("userId", response.data.userId);
  localStorage.setItem("userName", response.data.userName);
};

const getUser = async (): Promise<userData> => {
  const user = await axiosInstance("/user");
  return user.data;
};

export { loginBasic, registerBasic, loginGoogle, getUser };
