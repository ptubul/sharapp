import axiosInstance from "./apiClient";

const loginBasic = async (email: string, password: string): Promise<void> => {
  const data = { email: email, password: password };
  const response = await axiosInstance.post("/auth/login", data);
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  return response.data;
};

const registerBasic = async (
  email: string,
  password: string
): Promise<void> => {
  const data = { email: email, password: password };
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export { loginBasic, registerBasic };
