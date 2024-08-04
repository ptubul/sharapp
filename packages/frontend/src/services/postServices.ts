import { Joke } from "../types/jokeTypes";
import axiosInstance from "./apiClient";

const createJoke = async (joke: Joke): Promise<void> => {
  const data = { ...joke };
  try {
    const response = await axiosInstance.post("/posts", data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const getAllJokes = async (): Promise<Joke[]> => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

const getMyJokes = async (): Promise<Joke[]> => {
  const response = await axiosInstance.get("/posts/myPosts");
  return response.data;
};

const getJoke = async (jokeId: string): Promise<Joke> => {
  const response = await axiosInstance.get(`/posts/${jokeId}`);
  return response.data;
};

const deleteJoke = async (jokeId: string): Promise<void> => {
  await axiosInstance.delete(`/posts/${jokeId}`);
  // return response.data;
};

export { createJoke, getAllJokes, getJoke, deleteJoke, getMyJokes };
