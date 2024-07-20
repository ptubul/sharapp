import HomePage from "./pages/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JokePage from "./pages/jokePage";
import MyJokesPage from "./pages/myJokesPage";
import { CurrentUserProvider } from "./context/CurrentUserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  { path: "/myJokes", element: <MyJokesPage /> },
  {
    path: "/joke/:jokeId",
    element: <JokePage />,
  },
]);

function App() {
  return (
    <CurrentUserProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </CurrentUserProvider>
  );
}

export default App;
