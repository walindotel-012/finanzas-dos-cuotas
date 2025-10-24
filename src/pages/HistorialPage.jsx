import { useMemo } from "react";
import PageHeader from "../components/layout/PageHeader";
import HistorialList from "../components/dashboard/HistorialList";
import { cardClass } from "../components/ui/tokens";

export default function HistorialPage({ expenses, registerPayment, cards, deleteExpense }) {
  const cardMap = useMemo(() => {
    const map = new Map();
    cards.forEach((card) => map.set(card.id, card));
    return map;
  }, [cards]);

  if (!expenses.length) {
    return (
      <section className="space-y-6">
        <PageHeader
          title="Historial de gastos"
          subtitle="Consulta cada gasto registrado y las cuotas asociadas."
        />
        <div className={`${cardClass} text-sm text-slate-500`}>Aun no hay gastos. Agrega uno desde el modulo de gastos.</div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Historial de gastos"
        subtitle="Lleva control de las cuotas, pagos realizados y montos pendientes."
      />
      <HistorialList
        expenses={expenses}
        registerPayment={registerPayment}
        cardMap={cardMap}
        deleteExpense={deleteExpense}
      />
    </section>
  );
}
