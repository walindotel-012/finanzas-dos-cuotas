// src/components/forms/FormularioGasto.jsx
import { useState } from "react";
import { formatCurrency, splitTwoQuotas } from "../../utils/currencyUtils";
import { endOfMonth, toISODate } from "../../utils/dateUtils";
import {
  cardClass,
  labelClass,
  inputClass,
  selectClass,
  checkboxClass,
  primaryButtonClass,
  mutedCardClass,
} from "../ui/tokens";

export default function FormularioGasto({ form, setForm, tipo, categories, cards, onSubmit }) {
  const isTarjeta = tipo === "tarjeta";
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
    setShowPreview(false);
  };

  const handleMontoChange = (event) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, montoTotal: value }));
    if (value && !Number.isNaN(Number(value)) && Number(value) > 0) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  };

  const fieldLabel = (text) => <span className={labelClass}>{text}</span>;

  return (
    <form onSubmit={handleSubmit} className={`${cardClass} space-y-5`}>
      <header className="space-y-1">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
          Nuevo gasto - {isTarjeta ? "Tarjeta" : "Efectivo"}
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Completa los detalles del movimiento</h3>
        <p className="text-sm text-slate-500">
          Registra el gasto para que se reparta correctamente en las cuotas del mes.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {isTarjeta && (
          <div className="space-y-1">
            {fieldLabel("Tarjeta")}
            <select
              required
              value={form.cardId}
              onChange={(event) =>
                setForm((current) => ({ ...current, cardId: event.target.value, tipo: "tarjeta" }))
              }
              className={selectClass}
            >
              <option value="">Selecciona una tarjeta</option>
              {cards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.entidad} ({card.numeroEnmascarado})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-1">
          {fieldLabel("Categoria")}
          <select
            required
            value={form.categoria}
            onChange={(event) => setForm((current) => ({ ...current, categoria: event.target.value }))}
            className={selectClass}
          >
            <option value="">Selecciona una categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1 sm:col-span-2">
          {fieldLabel("Descripcion")}
          <input
            value={form.descripcion}
            onChange={(event) => setForm((current) => ({ ...current, descripcion: event.target.value }))}
            placeholder={isTarjeta ? "Compra con tarjeta" : "Gasto en efectivo"}
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          {fieldLabel("Monto total (DOP)")}
          <input
            type="number"
            inputMode="decimal"
            min={0.01}
            step={0.01}
            required
            value={form.montoTotal}
            onChange={handleMontoChange}
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          {fieldLabel("Fecha del gasto")}
          <input
            type="date"
            required
            value={form.fechaGasto}
            onChange={(event) => setForm((current) => ({ ...current, fechaGasto: event.target.value }))}
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          {fieldLabel("Modo de pago")}
          <select
            value={form.modoPago}
            onChange={(event) => setForm((current) => ({ ...current, modoPago: event.target.value }))}
            className={selectClass}
          >
            <option value="dos_cuotas_mes_actual">Dos cuotas (mismo mes)</option>
            <option value="una_cuota_mes_actual">Una cuota (mismo mes)</option>
          </select>
        </div>

        <div className="space-y-1">
          {fieldLabel("Preferencia de quincena")}
          <select
            value={form.quincenaPreferida}
            onChange={(event) => setForm((current) => ({ ...current, quincenaPreferida: event.target.value }))}
            className={selectClass}
          >
            <option value="auto">Automatico</option>
            <option value="1">Quincena 1 (1-15)</option>
            <option value="2">Quincena 2 (16-fin)</option>
          </select>
        </div>

        {form.modoPago === "dos_cuotas_mes_actual" && (
          <label className="flex items-center gap-2 sm:col-span-2">
            <input
              id="mismaQ"
              type="checkbox"
              checked={form.mismaQuincena}
              onChange={(event) => setForm((current) => ({ ...current, mismaQuincena: event.target.checked }))}
              className={checkboxClass}
            />
            <span className="text-sm font-medium text-slate-600">Pagar las dos cuotas en la misma quincena</span>
          </label>
        )}
      </div>

      {showPreview && <CuotasPreview form={form} />}

      <div className="flex justify-end">
        <button type="submit" className={primaryButtonClass}>
          Guardar gasto
        </button>
      </div>
    </form>
  );
}

function CuotasPreview({ form }) {
  const total = Number(form.montoTotal || 0);
  if (!total || total <= 0) return null;

  const [cuota1, cuota2] =
    form.modoPago === "dos_cuotas_mes_actual" ? splitTwoQuotas(total) : [total, 0];
  const finMes = endOfMonth(new Date(form.fechaGasto));
  const quincena1Vence = toISODate(new Date(finMes.getFullYear(), finMes.getMonth(), 15));
  const quincena2Vence = toISODate(finMes);
  const mismaQuincena = form.modoPago === "dos_cuotas_mes_actual" && form.mismaQuincena;
  const preferencia = form.quincenaPreferida;
  const q1 = mismaQuincena ? (preferencia === "2" ? 2 : 1) : 1;
  const q2 = mismaQuincena ? q1 : 2;

  return (
    <div className={mutedCardClass}>
      <p className="text-sm font-semibold text-slate-700">Vista previa de cuotas</p>
      <p className="mt-2 text-sm text-slate-600">
        C1 {formatCurrency(cuota1)} - Q{q1} - vence {q1 === 1 ? quincena1Vence : quincena2Vence}
        {form.modoPago === "dos_cuotas_mes_actual" && (
          <>
            <br />
            C2 {formatCurrency(cuota2)} - Q{q2} - vence {q2 === 1 ? quincena1Vence : quincena2Vence}
          </>
        )}
      </p>
    </div>
  );
}
