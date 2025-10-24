// src/components/forms/CategoryForm.jsx
import { useState } from "react";
import { cardClass, labelClass, inputClass, primaryButtonClass } from "../ui/tokens";

export default function CategoryForm({ onSave }) {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nombre.trim()) return;
    onSave(nombre.trim());
    setNombre("");
  };

  return (
    <form onSubmit={handleSubmit} className={`${cardClass} space-y-4`}>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Nueva categoria</p>
        <h3 className="text-lg font-semibold text-slate-900">Organiza tus gastos por categorias</h3>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <label className="flex-1 space-y-1">
          <span className={labelClass}>Nombre de la categoria</span>
          <input
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            placeholder="Ej: Supermercado, Salud..."
            className={inputClass}
            required
          />
        </label>
        <button type="submit" className={primaryButtonClass}>
          Agregar
        </button>
      </div>
    </form>
  );
}
