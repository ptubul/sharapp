import { Joke } from "../types/jokeTypes";
import axiosInstance from "./apiClient";

const createJoke = async (joke: Joke): Promise<void> => {
  const data = { ...joke };
  try {
    const response = await axiosInstance.post("/posts", data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const getAllJokes = async (): Promise<Joke[]> => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

export { createJoke, getAllJokes };
