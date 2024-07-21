import axiosInstance from "./apiClient";
import { CredentialResponse } from "@react-oauth/google";

interface UserData {
  userId: string;
  userName: string;
}

const loginBasic = async (
  email: string,
  password: string
): Promise<UserData> => {
  const data = { email: email, password: password };
  const response = await axiosInstance.post("/auth/login", data);

  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  return response.data.UserId, response.data.UserName;
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
): Promise<UserData> => {
  const response = await axiosInstance.post("/auth/google", credentialResponse);
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  const usrId = response.data.userId;
  const usrName = response.data.userName;
  return { userId: usrId, userName: usrName };
};

export { loginBasic, registerBasic, loginGoogle };
