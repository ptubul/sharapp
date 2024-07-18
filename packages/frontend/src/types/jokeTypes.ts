export interface Joke {
  id: string;
  title: string;
  text: string;
  image?: string;
}

export interface Jokes {
  jokes: Joke[];
}
