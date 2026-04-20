import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home       from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import JoinQuiz   from "./pages/JoinQuiz";
import QuizRoom   from "./pages/QuizRoom";
import Results    from "./pages/Results";
import Login      from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"           element={<Home />} />
        <Route path="/join"       element={<JoinQuiz />} />
        <Route path="/room/:id"   element={<QuizRoom />} />
        <Route path="/results/:id" element={<Results />} />

        {/* Redirect to /create if already logged in */}
        <Route path="/login" element={user ? <Navigate to="/create" replace /> : <Login />} />

        {/* Protected */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}