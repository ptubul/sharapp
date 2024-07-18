import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Joke } from "../types/jokeTypes";

interface JokeCardProps {
  joke: Joke;
}

export default function JokeCard({ joke }: JokeCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="190" image={joke.image} alt="joke" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {joke.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {joke.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
