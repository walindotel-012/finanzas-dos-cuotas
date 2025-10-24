// src/components/dashboard/ActividadReciente.jsx
import { formatCurrency } from "../../utils/currencyUtils";

const statusStyles = {
  pagado: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-600",
    label: "Cobrado",
  },
  pendiente: {
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-600",
    label: "Pendiente",
  },
};

export default function ActividadReciente({ proximos }) {
  if (!proximos || proximos.length === 0) {
    return (
      <section className="rounded-2xl bg-white p-5 text-sm text-slate-500 shadow-sm ring-1 ring-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">Actividad Reciente</h3>
        <p className="mt-3 text-sm text-slate-500">No hay cuotas pendientes. Bien hecho!</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Actividad Reciente</h3>
      </div>
      <ul className="mt-4 divide-y divide-slate-100">
        {proximos.map((cuota) => {
          const styles = statusStyles[cuota.estado] ?? statusStyles.pendiente;

          return (
            <li key={`${cuota.expenseId}_${cuota.indice}`} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${styles.dot}`} />
                <div>
                  <p className="text-sm font-medium text-slate-800">{cuota.descripcion}</p>
                  <p className="text-xs text-slate-500">
                    Quincena {cuota.quincena} - Vence: {cuota.fechaVencimiento}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(cuota.monto)}</span>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles.badge}`}>
                  {styles.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
