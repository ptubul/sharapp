import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import JokeCard from "./jokeCard";
import { Jokes } from "../types/jokeTypes";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid({ jokes }: Jokes) {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {jokes.map((joke) => (
          <Grid xs={3} key={joke.id}>
            <Item>
              <JokeCard joke={joke} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
