// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { sidebarLinks } from "./sidebarLinks";

export default function Sidebar() {
  return (
    <aside className="hidden shrink-0 md:block md:w-56 lg:w-64">
      <nav className="rounded-2xl bg-white/95 p-3 shadow-sm ring-1 ring-slate-100">
        <ul className="space-y-1">
          {sidebarLinks.map(({ to, label, icon }) => {
            const IconComponent = icon;
            return (
              <li key={to}>
                <NavLink
                  to={to}
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
                  <span className="truncate">{label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
