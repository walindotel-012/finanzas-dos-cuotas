// src/components/dashboard/CardsRow.jsx
import { formatCurrency } from "../../utils/currencyUtils";
import { InfoIcon, CheckIcon, DollarIcon } from "../ui/Icons";

const cards = [
  {
    title: "Facturas Pendientes",
    description: "Montos aun por cobrar",
    icon: InfoIcon,
    accent: "bg-blue-100 text-blue-600",
    valueKey: "pendiente",
  },
  {
    title: "Facturas Cobradas",
    description: "Pagos registrados",
    icon: CheckIcon,
    accent: "bg-emerald-100 text-emerald-600",
    valueKey: "pagado",
  },
  {
    title: "Total a Cobrar",
    description: "Monto del mes actual",
    icon: DollarIcon,
    accent: "bg-purple-100 text-purple-600",
    valueKey: "total",
  },
];

export default function CardsRow({ kpis }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map(({ title, description, icon, accent, valueKey }) => {
        const IconComponent = icon;
        return (
          <article
            key={title}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {formatCurrency(kpis[valueKey] ?? 0)}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {description}
                </p>
              </div>
              <span className={`flex h-12 w-12 items-center justify-center rounded-full ${accent}`}>
                <IconComponent className="h-5 w-5" />
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
