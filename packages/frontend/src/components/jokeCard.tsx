import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { Joke } from "../types/jokeTypes";

interface JokeCardProps {
  joke: Joke;
  isSingle?: boolean;
}

export default function JokeCard({ joke, isSingle = false }: JokeCardProps) {
  // ? {
  //     title: "aaa",
  //     text: "bbbbb",
  //     _id: "3",
  //     image:
  //       "https://play-lh.googleusercontent.com/kCuoLGcYqdmZN_TvKVYrUjuF2C8uua2rfY83anNJw7YGzijReQc3yTlsqzvMdxs03IM=w240-h480-rw",
  //   }
  // : joke;

  console.log(joke.title);

  return (
    <Box
      sx={{
        display: isSingle ? "flex" : "block",
        justifyContent: isSingle ? "center" : "initial",
        alignItems: isSingle ? "center" : "initial",
        marginTop: isSingle ? 5 : 0.5,
        width: 700,
      }}
    >
      <Card
        sx={{
          maxWidth: 345,
        }}
      >
        <CardActionArea href={`/joke/${joke._id}`}>
          <CardMedia component="img" height="190" image={joke.url} alt="joke" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {joke.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {joke.text}
            </Typography>
            {joke.comments && <Typography>{joke.comments[0].owner}</Typography>}
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
