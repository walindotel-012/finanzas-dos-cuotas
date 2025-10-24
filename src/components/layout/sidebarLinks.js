// src/components/layout/sidebarLinks.js
import {
  DashboardIcon,
  CreditCardIcon,
  CashIcon,
  UsersIcon,
  HistoryIcon,
  CategoryIcon,
  WalletIcon,
} from "../ui/Icons";

export const sidebarLinks = [
  { to: "/", label: "Dashboard", icon: DashboardIcon },
  { to: "/tarjeta", label: "Gasto (Tarjeta)", icon: CreditCardIcon },
  { to: "/efectivo", label: "Gasto (Efectivo)", icon: CashIcon },
  { to: "/usuarios", label: "Usuarios 50/50", icon: UsersIcon },
  { to: "/historial", label: "Historial", icon: HistoryIcon },
  { to: "/categorias", label: "Categorias", icon: CategoryIcon },
  { to: "/tarjetas", label: "Tarjetas", icon: WalletIcon },
];
