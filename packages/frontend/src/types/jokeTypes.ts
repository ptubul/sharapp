export interface Joke {
  _id: string | null;
  title?: string;
  text?: string;
  url?: string;
  image?: File | null;
}

export interface Jokes {
  jokes: Joke[];
}
