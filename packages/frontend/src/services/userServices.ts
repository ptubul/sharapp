import { Email } from "@mui/icons-material";
import { UserData } from "../types/userTypes";
import axiosInstance from "./apiClient";
import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";

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

const logout = async (): Promise<void> => {
  console.log(localStorage.getItem("refreshToken"));

  await axios.post(
    "http://localhost:3000/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    }
  );

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
};

const getUser = async (): Promise<UserData> => {
  const user = await axiosInstance.get("/user");
  return user.data;
};

const updateUser = async (userData: UserData): Promise<UserData> => {
  const formData = new FormData();
  formData.append("image", userData.image);
  // formData.append(
  //   "json",
  //   JSON.stringify({
  //     data: { email: userData.data.email, name: userData.data.name },
  //   })
  // );
  console.log(formData);
  // const user = await axiosInstance.put("/user", formData);
  const user = await axiosInstance.put(
    "/user",
    { image: userData.image },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return user.data;
};

export { logout, loginBasic, registerBasic, loginGoogle, getUser, updateUser };
