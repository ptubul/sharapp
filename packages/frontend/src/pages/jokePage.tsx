import Header from "../components/Header";
import { useParams } from "react-router-dom";

const JokePage = () => {
  const { jokeId } = useParams();

  return (
    <div>
      <Header />
      <div>{jokeId}</div>
    </div>
  );
};

export default JokePage;
