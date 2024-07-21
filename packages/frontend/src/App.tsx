import HomePage from "./pages/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JokePage from "./pages/jokePage";
import MyJokesPage from "./pages/myJokesPage";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import AuthPage from "./pages/AuthPage";

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
  { path: "/login", element: <AuthPage /> },
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
