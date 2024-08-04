import HomePage from "./pages/homePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import JokePage from "./pages/jokePage";
import ProtectedRoute from "./components/protectedRoute";
import MyJokesPage from "./pages/myJokesPage";
import { AuthProvider } from "./context/CurrentUserContext";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/profilePage";
import PostPage from "./components/jokeCardExt";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/joke/:jokeId" element={<JokePage />} />
            <Route path="/myJokes" element={<MyJokesPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
