import Header from "../components/Header";
// import JokeCard from "../components/jokeCard";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import BasicGrid from "../components/grid";
import { Joke } from "../types/jokeTypes";

export function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} />
      </Container>
    </React.Fragment>
  );
}

const HomePage = () => {
  const jokes: Joke[] = [
    {
      title: "aaa",
      text: "bbbbb",
      id: "1",
      image:
        "https://play-lh.googleusercontent.com/kCuoLGcYqdmZN_TvKVYrUjuF2C8uua2rfY83anNJw7YGzijReQc3yTlsqzvMdxs03IM=w240-h480-rw",
    },
    { title: "assss", text: "bbbbb", id: "2" },
    {
      title: "aaa",
      text: "bbbbb",
      id: "3",
      image:
        "https://play-lh.googleusercontent.com/kCuoLGcYqdmZN_TvKVYrUjuF2C8uua2rfY83anNJw7YGzijReQc3yTlsqzvMdxs03IM=w240-h480-rw",
    },
    { title: "assss", text: "bbbbb", id: "4" },
    { title: "aaa", text: "bbbbb", id: "5" },
    { title: "assss", text: "bbbbb", id: "6" },
    { title: "aaa", text: "bbbbb", id: "7" },
    { title: "assss", text: "bbbbb", id: "8" },
    { title: "aaa", text: "bbbbb", id: "9" },
    { title: "assss", text: "bbbbb", id: "10" },
    { title: "aaa", text: "bbbbb", id: "11" },
    { title: "assss", text: "bbbbb", id: "12" },
  ];

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <BasicGrid jokes={jokes} />
      </div>
    </div>
  );
};

export default HomePage;
