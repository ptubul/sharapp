export interface Joke {
  id: string | null;
  title?: string;
  text?: string;
  image?: string;
}

export interface Jokes {
  jokes: Joke[];
}
