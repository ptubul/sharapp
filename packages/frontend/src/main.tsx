import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import JokePage from "./pages/jokePage";
import HomePage from "./pages/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/joke/:jokeId",
    element: <JokePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
