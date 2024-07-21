import { useEffect, useState } from "react";
import Header from "../components/Header";
import BasicGrid from "../components/grid";
import JokeForm from "../components/jokeForm";
import { Joke } from "../types/jokeTypes";
import { Typography } from "@mui/material";
import { createJoke } from "../services/postServices";

const MyJokesPage = () => {
  const [jokes, setJokes] = useState<Joke[]>([
    {
      title: "aaa",
      text: "bbbbb",
      _id: "1",
      url: "https://play-lh.googleusercontent.com/kCuoLGcYqdmZN_TvKVYrUjuF2C8uua2rfY83anNJw7YGzijReQc3yTlsqzvMdxs03IM=w240-h480-rw",
      comments: [],
    },
  ]);

  useEffect(() => {
    // create an api
  }, [jokes]);

  const addJokeHandler = async (joke: Joke) => {
    await createJoke(joke);
    setJokes((prevState) => [...prevState, joke]);
  };

  return (
    <div>
      <Header />
      <Typography variant="h4" sx={{ textAlign: "center", marginY: 3 }}>
        My jokes
      </Typography>
      <JokeForm submitHandler={addJokeHandler} />
      <BasicGrid jokes={jokes} />
    </div>
  );
};

export default MyJokesPage;
