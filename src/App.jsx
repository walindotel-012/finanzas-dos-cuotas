// src/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedApp from "./components/layout/ProtectedApp";
import LoginPage from "./pages/LoginPage";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="mt-3 text-sm font-medium text-slate-600">Preparando tu experiencia...</p>
      </div>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/*"
        element={user ? <ProtectedApp /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}
