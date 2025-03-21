import { useEffect, useState } from "react";
import Header from "../components/Header";
import BasicGrid from "../components/grid";
import JokeForm from "../components/jokeForm";
import { Joke } from "../types/jokeTypes";
import { Typography } from "@mui/material";
import { createJoke, getMyJokes } from "../services/postServices";

const MyJokesPage = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const givenJokes = await getMyJokes();
      setJokes(givenJokes);
    };

    fetchData();
  }, []);

  const addJokeHandler = async (joke: Joke) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await createJoke(joke);
    console.log(result.data);

    if (result)
      setJokes((prevState) => [
        ...prevState,
        {
          ...result.data.rest,
          url: result.data.url,
        },
      ]);
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
