import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { Joke } from "../types/jokeTypes";
import { useNavigate } from "react-router-dom";
import placeHolder from "../assets/pngwing.com.png";

interface JokeCardProps {
  joke: Joke;
  isSingle?: boolean;
}

export default function JokeCard({ joke, isSingle = false }: JokeCardProps) {
  const navigate = useNavigate();
  // ? {
  //     title: "aaa",
  //     text: "bbbbb",
  //     _id: "3",
  //     image:
  //       "https://play-lh.googleusercontent.com/kCuoLGcYqdmZN_TvKVYrUjuF2C8uua2rfY83anNJw7YGzijReQc3yTlsqzvMdxs03IM=w240-h480-rw",
  //   }
  // : joke;

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
        <CardActionArea onClick={() => navigate(`/joke/${joke._id}`)}>
          {/* <Typography>{joke.owner}:</Typography> */}
          <CardMedia
            component="img"
            height="190"
            // image={joke.url}
            src={
              joke.url
                ? `http://localhost:3000/postsImages/${joke.url}`
                : placeHolder
            }
            alt="joke"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {joke.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {joke.text}
            </Typography>
            <Typography>{joke.comments.length} comments</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
