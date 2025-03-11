import { Joke } from "../types/jokeTypes";
import axiosInstance from "./apiClient";

const createJoke = async (joke: Joke): Promise<Joke | undefined> => {
  // const data = { ...joke };
  try {
    const jokeForm = new FormData();
    if (joke.image) {
      jokeForm.append("file", joke.image);
    }
    console.log("here");
    if (joke.ownerId) jokeForm.append("ownerId", joke.ownerId);
    if (joke.text) jokeForm.append("text", joke.text);
    if (joke.title) jokeForm.append("title", joke.title);

    return await axiosInstance.post("/posts", jokeForm);
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
  const response = await axiosInstance.delete(`/posts/${jokeId}`);
  return response.data;
};

export { createJoke, getAllJokes, getJoke, deleteJoke, getMyJokes };
