import Header from "../components/Header";
import { useParams } from "react-router-dom";
import JokeCard from "../components/jokeCard";
import CommentsList from "../components/commentList";
import CommentForm from "../components/commentForm";
import { Comment } from "../types/commentTypes";
import React from "react";
import { useCurrentUser } from "../context/CurrentUserContext";

const JokePage = () => {
  const { jokeId } = useParams();
  const { currentUser } = useCurrentUser();
  const [jokeComments, setJokeComments] = React.useState<Comment[]>([
    { id: "1", text: "blablbabla", rate: 3, owner: "avi" },
    { id: "2", text: "blabldsaaaaaababla", rate: 3, owner: "asd" },
    { id: "3", text: "blablbabtyyyyyyyyyyla", rate: 5, owner: "ccc" },
    { id: "4", text: "blablbablyyyyyyyyyyyyyya", rate: 2, owner: "bbb" },
    { id: "5", text: "blablbayyyyyyyyyyyyybla", rate: 1, owner: "aaa" },
  ]);
  const addCommentHandler = (commentText: string, rating: number) => {
    //   // call api for add comment

    const newComment: Comment = {
      id: "1234",
      owner: currentUser?.name,
      rate: rating,
      text: commentText,
    };
    setJokeComments((prevState) => [...prevState, newComment]);
  };
  return (
    <>
      <Header />
      <JokeCard joke={{ id: jokeId ? jokeId : null }} isSingle={true} />
      <CommentForm submitHandler={addCommentHandler} />
      <CommentsList comments={jokeComments} />
    </>
  );
};

export default JokePage;
