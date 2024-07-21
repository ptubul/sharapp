import Header from "../components/Header";
import { useParams } from "react-router-dom";
import JokeCard from "../components/jokeCard";
import CommentsList from "../components/commentList";
import CommentForm from "../components/commentForm";
import { Comment } from "../types/commentTypes";
import { useEffect, useState } from "react";
import { useAuth } from "../context/CurrentUserContext";
import { getJoke } from "../services/postServices";
import { Joke } from "../types/jokeTypes";
import { createComment } from "../services/commentsServices";
import { CircularProgress } from "@mui/material";
// import { NewReleases } from "@mui/icons-material";

const JokePage = () => {
  const { jokeId } = useParams();
  const { userName } = useAuth();
  const [joke, setJoke] = useState<Joke | undefined>();
  //   { id: "1", text: "blablbabla", rate: 3, owner: "avi" },
  //   { id: "2", text: "blabldsaaaaaababla", rate: 3, owner: "asd" },
  //   { id: "3", text: "blablbabtyyyyyyyyyyla", rate: 5, owner: "ccc" },
  //   { id: "4", text: "blablbablyyyyyyyyyyyyyya", rate: 2, owner: "bbb" },
  //   { id: "5", text: "blablbayyyyyyyyyyyyybla", rate: 1, owner: "aaa" },
  // ]);

  // { id: "1", text: "blablbabla", rate: 3, owner: "avi" },
  //   { id: "2", text: "blabldsaaaaaababla", rate: 3, owner: "asd" },
  //   { id: "3", text: "blablbabtyyyyyyyyyyla", rate: 5, owner: "ccc" },
  //   { id: "4", text: "blablbablyyyyyyyyyyyyyya", rate: 2, owner: "bbb" },
  //

  useEffect(() => {
    const fetchData = async () => {
      if (jokeId) {
        return await getJoke(jokeId);
        // // setJoke((prevObj) => ({ ...prevObj, ...resJoke }));
        // setJoke(resJoke);
        // console.log(resJoke);
      }
    };

    fetchData().then((res: Joke | undefined) => {
      if (res != undefined) setJoke(res);
    });
  }, []);

  const addCommentHandler = async (commentText: string, rating: number) => {
    if (!joke) return;
    //   // call api for add comment
    const newComment: Comment = {
      owner: userName,
      rate: rating,
      text: commentText,
    };
    if (jokeId) {
      const res = await createComment(jokeId, newComment);
      newComment._id = res.commentId;
    }
    const newComments = [...joke.comments, newComment];
    setJoke({ ...joke, comments: newComments });
    // setJoke((prevState) => [...prevState, newComment]);
  };
  if (!joke) {
    return <CircularProgress />;
  }
  console.log(joke);
  return (
    <>
      <Header />
      <JokeCard joke={joke} />
      <CommentForm submitHandler={addCommentHandler} />
      <CommentsList comments={joke.comments} />
    </>
  );
};

export default JokePage;
