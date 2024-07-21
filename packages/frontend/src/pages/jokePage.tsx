import Header from "../components/Header";
import { useParams } from "react-router-dom";
import JokeCard from "../components/jokeCard";
import CommentsList from "../components/commentList";
import CommentForm from "../components/commentForm";
import { Comment } from "../types/commentTypes";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { getJoke } from "../services/postServices";
import { Joke } from "../types/jokeTypes";
import { createComment } from "../services/commentsServices";
// import { NewReleases } from "@mui/icons-material";

const JokePage = () => {
  const { jokeId } = useParams();
  const { currentUser } = useCurrentUser();
  const [joke, setJoke] = useState<Joke>({ _id: "0" });
  const [jokeComments, setJokeComments] = useState<Comment[]>([
    //   { id: "1", text: "blablbabla", rate: 3, owner: "avi" },
    //   { id: "2", text: "blabldsaaaaaababla", rate: 3, owner: "asd" },
    //   { id: "3", text: "blablbabtyyyyyyyyyyla", rate: 5, owner: "ccc" },
    //   { id: "4", text: "blablbablyyyyyyyyyyyyyya", rate: 2, owner: "bbb" },
    //   { id: "5", text: "blablbayyyyyyyyyyyyybla", rate: 1, owner: "aaa" },
  ]);

  // { id: "1", text: "blablbabla", rate: 3, owner: "avi" },
  //   { id: "2", text: "blabldsaaaaaababla", rate: 3, owner: "asd" },
  //   { id: "3", text: "blablbabtyyyyyyyyyyla", rate: 5, owner: "ccc" },
  //   { id: "4", text: "blablbablyyyyyyyyyyyyyya", rate: 2, owner: "bbb" },
  //

  useEffect(() => {
    const fetchData = async () => {
      if (jokeId) {
        const resJoke = await getJoke(jokeId);
        // setJoke((prevObj) => ({ ...prevObj, ...resJoke }));
        setJoke(resJoke);
        console.log(joke);
      }
    };

    fetchData();
  }, [jokeId, jokeComments]);

  const addCommentHandler = async (commentText: string, rating: number) => {
    //   // call api for add comment
    const newComment: Comment = {
      owner: currentUser?.name,
      rate: rating,
      text: commentText,
    };
    if (jokeId) {
      const res = await createComment(jokeId, newComment);
      newComment._id = res.commentId;
    }

    setJokeComments((prevState) => [...prevState, newComment]);
  };
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
