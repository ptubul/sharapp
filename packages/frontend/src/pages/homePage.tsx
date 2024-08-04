import Header from "../components/Header";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import BasicGrid from "../components/grid";
import { Joke } from "../types/jokeTypes";
import { getAllJokes } from "../services/postServices";

export function SimpleContainer() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} />
      </Container>
    </>
  );
}

const HomePage = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const givenJokes = await getAllJokes();
      setJokes(givenJokes);
    };

    fetchData();
  }, []);

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
