// src/components/layout/ProtectedApp.jsx
import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useHousehold } from "../../hooks/useHousehold";
import { useExpenses } from "../../hooks/useExpenses";
import { useCategories } from "../../hooks/useCategories";
import { useCards } from "../../hooks/useCards";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import DashboardPage from "../../pages/DashboardPage";
import TarjetaPage from "../../pages/TarjetaPage";
import EfectivoPage from "../../pages/EfectivoPage";
import UsuariosPage from "../../pages/UsuariosPage";
import HistorialPage from "../../pages/HistorialPage";
import CategoriesPage from "../../pages/CategoriesPage";
import CardsPage from "../../pages/CardsPage";

function LoadingScreen({ message }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="mt-3 text-sm font-medium text-slate-600">{message}</p>
      </div>
    </div>
  );
}

export default function ProtectedApp() {
  const [navOpen, setNavOpen] = useState(false);
  const { household, updateHousehold } = useHousehold("demo");
  const {
    expenses,
    loading: expensesLoading,
    addExpense,
    registerPayment,
    deleteExpense,
  } = useExpenses("demo");
  const { categories, loading: categoriesLoading } = useCategories("demo");
  const { cards, loading: cardsLoading } = useCards("demo");

  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const mesClave = `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, "0")}`;

  const kpis = useMemo(() => {
    const monthExpenses = expenses.filter((expense) => expense.mesClave === mesClave);
    const total = monthExpenses.reduce((sum, expense) => sum + expense.montoTotal, 0);
    const cuotas = monthExpenses.flatMap((expense) =>
      expense.cuotas.map((cuota) => ({
        ...cuota,
        expenseId: expense.id,
        descripcion: expense.descripcion,
      })),
    );
    const cuota1 = cuotas.filter((cuota) => cuota.quincena === 1).reduce((sum, cuota) => sum + cuota.monto, 0);
    const cuota2 = cuotas.filter((cuota) => cuota.quincena === 2).reduce((sum, cuota) => sum + cuota.monto, 0);
    const pagado = cuotas.reduce(
      (sum, cuota) =>
        sum + cuota.pagos.reduce((acc, pago) => acc + pago.monto, 0),
      0,
    );
    const pendiente = cuota1 + cuota2 - pagado;
    return { total, c1: cuota1, c2: cuota2, pagado, pendiente };
  }, [expenses, mesClave]);

  const shares = useMemo(() => {
    const half = (value) => Math.max(0, Math.round((value / 2) * 100) / 100);
    return {
      userA: {
        total: half(kpis.total),
        cuota1: half(kpis.c1),
        cuota2: half(kpis.c2),
        pendiente: half(kpis.pendiente),
      },
      userB: {
        total: half(kpis.total),
        cuota1: half(kpis.c1),
        cuota2: half(kpis.c2),
        pendiente: half(kpis.pendiente),
      },
    };
  }, [kpis]);

  const proximos = useMemo(() => {
    return expenses
      .flatMap((expense) =>
        expense.cuotas.map((cuota) => ({
          expenseId: expense.id,
          descripcion: expense.descripcion,
          quincena: cuota.quincena,
          fechaVencimiento: cuota.fechaVencimiento,
          estado: cuota.estado,
          monto: cuota.monto,
          indice: cuota.indice,
        })),
      )
      .filter(
        (cuota) =>
          cuota.estado === "pendiente" &&
          cuota.fechaVencimiento >= new Date().toISOString().slice(0, 10),
      )
      .sort((a, b) => a.fechaVencimiento.localeCompare(b.fechaVencimiento))
      .slice(0, 8);
  }, [expenses]);

  const loading = expensesLoading || categoriesLoading || cardsLoading;

  if (loading) {
    return <LoadingScreen message="Cargando datos..." />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <MobileDrawer navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <Sidebar />
        <main className="w-full flex-1 space-y-6 pb-16 lg:pb-0">
          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  kpis={kpis}
                  shares={shares}
                  household={household}
                  proximos={proximos}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                />
              }
            />
            <Route
              path="/tarjeta"
              element={
                <TarjetaPage
                  onSubmit={(formData) => addExpense(formData, mesClave)}
                  categories={categories}
                  cards={cards}
                />
              }
            />
            <Route
              path="/efectivo"
              element={
                <EfectivoPage
                  onSubmit={(formData) =>
                    addExpense({ ...formData, tipo: "efectivo", cardId: "" }, mesClave)
                  }
                  categories={categories}
                />
              }
            />
            <Route
              path="/usuarios"
              element={
                <UsuariosPage
                  household={household}
                  updateHousehold={updateHousehold}
                  shares={shares}
                />
              }
            />
            <Route
              path="/historial"
              element={
                <HistorialPage
                  expenses={expenses}
                  registerPayment={registerPayment}
                  cards={cards}
                  deleteExpense={deleteExpense}
                />
              }
            />
            <Route path="/categorias" element={<CategoriesPage />} />
            <Route path="/tarjetas" element={<CardsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <footer className="mx-auto w-full max-w-6xl px-4 pb-10 text-xs text-slate-500">
        Reparto: 50/50 para {household.userA.name} y {household.userB.name} - Mes {mesClave}
      </footer>
    </div>
  );
}
