import { useState } from "react";
import { useCards } from "../hooks/useCards";
import PageHeader from "../components/layout/PageHeader";
import CardForm from "../components/forms/CardForm";
import { cardClass, labelClass, dangerButtonClass, ghostButtonClass } from "../components/ui/tokens";
import { formatCurrency } from "../utils/currencyUtils";

export default function CardsPage() {
  const { cards, addCard, updateCard, deleteCard, loading } = useCards("demo");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    entidad: "",
    alias: "",
    numeroEnmascarado: "",
    limiteCredito: "",
    fechaCorte: "",
    fechaLimitePago: "",
  });

  const handleEdit = (card) => {
    setEditingId(card.id);
    setFormData({
      entidad: card.entidad,
      alias: card.alias,
      numeroEnmascarado: card.numeroEnmascarado,
      limiteCredito: card.limiteCredito,
      fechaCorte: card.fechaCorte,
      fechaLimitePago: card.fechaLimitePago,
    });
  };

  const resetForm = () => {
    setFormData({
      entidad: "",
      alias: "",
      numeroEnmascarado: "",
      limiteCredito: "",
      fechaCorte: "",
      fechaLimitePago: "",
    });
  };

  const handleSave = async () => {
    const payload = {
      ...formData,
      limiteCredito: Number(formData.limiteCredito),
      fechaCorte: Number(formData.fechaCorte),
      fechaLimitePago: Number(formData.fechaLimitePago),
    };

    if (editingId) {
      await updateCard(editingId, payload);
      setEditingId(null);
    } else {
      await addCard(payload);
    }
    resetForm();
  };

  const handleCancel = () => {
    setEditingId(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className={`${cardClass} text-center text-sm text-slate-500`}>
        Cargando tarjetas...
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Tarjetas"
        subtitle="Administra tus tarjetas para tener siempre presente el limite, la fecha de corte y la fecha limite de pago."
      />

      <CardForm
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onCancel={editingId ? handleCancel : undefined}
        isEditing={Boolean(editingId)}
      />

      <div className={cardClass}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={labelClass}>Resumen</p>
            <h3 className="text-lg font-semibold text-slate-900">
              Tarjetas registradas ({cards.length})
            </h3>
          </div>
        </div>

        {cards.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Todavia no has agregado tarjetas.</p>
        ) : (
          <div className="mt-4 grid gap-3">
            {cards.map((card) => (
              <article
                key={card.id}
                className="rounded-xl border border-slate-200 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{card.entidad}</p>
                    <p className="text-xs text-slate-500">
                      {card.alias} - {card.numeroEnmascarado}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Limite: {formatCurrency(card.limiteCredito)} | Corte: {card.fechaCorte} | Limite pago:{" "}
                      {card.fechaLimitePago}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(card)}
                      className={ghostButtonClass}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCard(card.id)}
                      className={dangerButtonClass}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
