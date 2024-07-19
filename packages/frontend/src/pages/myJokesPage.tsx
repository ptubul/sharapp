import Header from "../components/Header";
import BasicGrid from "../components/grid";
import JokeForm from "../components/jokeForm";
import { Joke } from "../types/jokeTypes";
import { Typography } from "@mui/material";

const jokes: Joke[] = [
  {
    title: "aaa",
    text: "bbbbb",
    id: "1",
    image:
      "https://play-lh.googleusercontent.com/kCuoLGcYqdmZN_TvKVYrUjuF2C8uua2rfY83anNJw7YGzijReQc3yTlsqzvMdxs03IM=w240-h480-rw",
  },
  { title: "assss", text: "bbbbb", id: "2" },
];

const MyJokesPage = () => {
  return (
    <div>
      <Header />
      <Typography variant="h4" sx={{ textAlign: "center", marginY: 3 }}>
        My jokes
      </Typography>
      <JokeForm />
      <BasicGrid jokes={jokes} />
    </div>
  );
};

export default MyJokesPage;
