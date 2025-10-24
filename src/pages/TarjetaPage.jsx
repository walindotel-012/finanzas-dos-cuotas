import { useState } from "react";
import { toISODate } from "../utils/dateUtils";
import PageHeader from "../components/layout/PageHeader";
import FormularioGasto from "../components/forms/FormularioGasto";

export default function TarjetaPage({ onSubmit, categories, cards }) {
  const today = toISODate(new Date());
  const initialCardId = cards.length > 0 ? cards[0].id : "";
  const initialCategory = categories.length > 0 ? categories[0].nombre : "";

  const [form, setForm] = useState({
    tipo: "tarjeta",
    cardId: initialCardId,
    categoria: initialCategory,
    descripcion: "",
    montoTotal: 0,
    modoPago: "dos_cuotas_mes_actual",
    fechaGasto: today,
    mismaQuincena: false,
    quincenaPreferida: "auto",
  });

  return (
    <section className="space-y-6">
      <PageHeader
        title="Registrar gasto con tarjeta"
        subtitle="Carga los consumos de tarjetas para mantener el control de las cuotas del mes."
      />
      <div className="max-w-3xl">
        <FormularioGasto
          form={form}
          setForm={setForm}
          tipo="tarjeta"
          categories={categories}
          cards={cards}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
}
