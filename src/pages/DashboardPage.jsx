// src/pages/DashboardPage.jsx
import { formatCurrency } from "../utils/currencyUtils";
import CardsRow from "../components/dashboard/CardsRow";
import ActividadReciente from "../components/dashboard/ActividadReciente";
import { ExportIcon } from "../components/ui/Icons";

const months = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

const repartoFields = [
  { key: "total", label: "Total del mes" },
  { key: "cuota1", label: "Cuota 1" },
  { key: "cuota2", label: "Cuota 2" },
  { key: "pendiente", label: "Pendiente por pagar" },
];

export default function DashboardPage({
  kpis,
  shares,
  household,
  proximos,
  selectedMonth,
  setSelectedMonth,
}) {
  const handleChange = (field) => (event) => {
    const value = Number(event.target.value);
    setSelectedMonth((prev) => ({ ...prev, [field]: value }));
  };

  const users = [
    { name: household.userA.name, data: shares.userA },
    { name: household.userB.name, data: shares.userB },
  ];

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Dashboard</h2>
          <p className="text-sm text-slate-500">Resumen actualizado del mes seleccionado</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
          >
            <ExportIcon className="h-4 w-4" />
            Exportar
          </button>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <select
              value={selectedMonth.year}
              onChange={handleChange("year")}
              className="rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm font-medium text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {[2023, 2024, 2025, 2026].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth.month}
              onChange={handleChange("month")}
              className="rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm font-medium text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <CardsRow kpis={kpis} />

      <div className="grid gap-4 lg:grid-cols-2">
        {users.map((user) => (
          <article
            key={user.name}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-blue-500">Reparto 50/50</p>
                <h3 className="text-lg font-semibold text-slate-900">{user.name}</h3>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                {formatCurrency(user.data.total)}
              </span>
            </div>
            <dl className="mt-4 space-y-3">
              {repartoFields.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <dt className="text-sm text-slate-500">{label}</dt>
                  <dd className="text-sm font-semibold text-slate-800">{formatCurrency(user.data[key])}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <ActividadReciente proximos={proximos} />
    </section>
  );
}
