// src/components/dashboard/HistorialList.jsx
import { formatCurrency } from "../../utils/currencyUtils";
import PaymentMiniForm from "./PaymentMiniForm";
import { cardClass, mutedCardClass, dangerButtonClass } from "../ui/tokens";

export default function HistorialList({ expenses, registerPayment, cardMap, deleteExpense }) {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => {
        const card = expense.cardId ? cardMap.get(expense.cardId) : null;
        const tarjetaLabel = card
          ? `${card.entidad} (${card.numeroEnmascarado})`
          : expense.tipo === "tarjeta"
          ? "Tarjeta no disponible"
          : "Efectivo";

        return (
          <article key={expense.id} className={cardClass}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">{expense.descripcion}</p>
                <p className="text-xs text-slate-500">
                  {tarjetaLabel} - {expense.categoria} - {expense.fechaGasto}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(expense.montoTotal)}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Eliminar este gasto? Esta accion no se puede deshacer.")) {
                      deleteExpense(expense.id);
                    }
                  }}
                  className={dangerButtonClass}
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {expense.cuotas.map((cuota) => (
                <div key={cuota.indice} className={mutedCardClass}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">
                      Cuota {cuota.indice} - Q{cuota.quincena}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        cuota.estado === "pagado"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {cuota.estado}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatCurrency(cuota.monto)}</p>
                  <p className="text-xs text-slate-500">Vence: {cuota.fechaVencimiento}</p>
                  {cuota.estado !== "pagado" ? (
                    <PaymentMiniForm onPay={(monto) => registerPayment(expense.id, cuota.indice, monto)} />
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
