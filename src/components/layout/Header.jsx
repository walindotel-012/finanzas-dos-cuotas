// src/components/layout/Header.jsx
import { useState } from "react";
import { MenuIcon } from "../ui/Icons";
import { useAuth } from "../../context/AuthContext";
import { ghostButtonClass } from "../ui/tokens";

export default function Header({ navOpen, setNavOpen }) {
  const { user, logout } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const initials =
    user?.displayName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "PD";

  const handleLogout = async () => {
    try {
      setSigningOut(true);
      await logout();
      setNavOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 md:hidden"
            onClick={() => setNavOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={navOpen}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <div>
            <p className="text-lg font-semibold leading-none text-slate-900">Piscinas Duran</p>
            <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
              Sistema de Gestion Profesional
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:flex">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? "Usuario"}
                className="h-10 w-10 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-sm font-semibold text-blue-600">
                {initials}
              </div>
            )}
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800">
                {user?.displayName ?? "Usuario"}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className={`${ghostButtonClass} hidden sm:inline-flex`}
            disabled={signingOut}
          >
            {signingOut ? "Saliendo..." : "Cerrar sesion"}
          </button>
        </div>
      </div>
    </header>
  );
}
