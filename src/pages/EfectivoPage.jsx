import { useState } from "react";
import { toISODate } from "../utils/dateUtils";
import PageHeader from "../components/layout/PageHeader";
import FormularioGasto from "../components/forms/FormularioGasto";

export default function EfectivoPage({ onSubmit, categories }) {
  const today = toISODate(new Date());
  const initialCategory = categories.length > 0 ? categories[0].nombre : "";

  const [form, setForm] = useState({
    tipo: "efectivo",
    cardId: "",
    categoria: initialCategory,
    descripcion: "",
    montoTotal: 0,
    modoPago: "dos_cuotas_mes_actual",
    fechaGasto: today,
    mismaQuincena: false,
    quincenaPreferida: "auto",
  });

  const handleSubmit = (values) => {
    onSubmit({ ...values, tipo: "efectivo", cardId: "" });
  };

  return (
    <section className="space-y-6">
      <PageHeader
        title="Registrar gasto en efectivo"
        subtitle="Agrega los pagos en efectivo o transferencias para mantener actualizado el balance."
      />
      <div className="max-w-3xl">
        <FormularioGasto
          form={form}
          setForm={setForm}
          tipo="efectivo"
          categories={categories}
          cards={[]}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
