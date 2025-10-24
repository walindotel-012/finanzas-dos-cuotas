// src/components/layout/MobileDrawer.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CloseIcon } from "../ui/Icons";
import { sidebarLinks } from "./sidebarLinks";
import { useAuth } from "../../context/AuthContext";
import { primaryButtonClass } from "../ui/tokens";

export default function MobileDrawer({ navOpen, setNavOpen }) {
  const { user, logout } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  if (!navOpen) return null;

  const initials =
    user?.displayName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "PD";

  const NavItem = ({ to, label, icon }) => {
    const IconComponent = icon;
    return (
      <NavLink
        to={to}
        onClick={() => setNavOpen(false)}
        className={({ isActive }) =>
          [
            "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
            isActive
              ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100"
              : "text-slate-600 hover:bg-slate-50 hover:text-blue-600",
          ].join(" ")
        }
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <IconComponent className="h-4 w-4" />
        </span>
        {label}
      </NavLink>
    );
  };

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
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setNavOpen(false)} />
      <aside className="absolute left-0 top-0 bottom-0 w-[88%] max-w-xs bg-white p-4 shadow-xl ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-600">Menu principal</span>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
            onClick={() => setNavOpen(false)}
            aria-label="Cerrar menu"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-3">
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
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {user?.displayName ?? "Usuario"}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {sidebarLinks.map(({ to, label, icon }) => (
            <NavItem key={to} to={to} label={label} icon={icon} />
          ))}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={signingOut}
          className={`${primaryButtonClass} mt-6 w-full justify-center`}
        >
          {signingOut ? "Cerrando..." : "Cerrar sesion"}
        </button>
      </aside>
    </div>
  );
}
