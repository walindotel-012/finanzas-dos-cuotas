import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { primaryButtonClass } from "../components/ui/tokens";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithPopup(auth, googleProvider);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setError("No pudimos iniciar sesion. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <div className="space-y-3 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
            <span className="text-2xl font-semibold">PD</span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">Piscinas Duran</h1>
          <p className="text-sm text-slate-500">
            Inicia sesion con tu cuenta de Google para acceder al panel de gestion.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`${primaryButtonClass} w-full justify-center`}
          >
            {loading ? "Conectando..." : "Iniciar sesion con Google"}
          </button>
          {error ? <p className="text-center text-xs text-rose-600">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
