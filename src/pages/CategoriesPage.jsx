import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import PageHeader from "../components/layout/PageHeader";
import CategoryForm from "../components/forms/CategoryForm";
import {
  cardClass,
  labelClass,
  secondaryButtonClass,
  dangerButtonClass,
  inputClass,
  ghostButtonClass,
} from "../components/ui/tokens";

export default function CategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory, loading } = useCategories("demo");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (id, nombre) => {
    setEditingId(id);
    setEditValue(nombre);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editValue.trim()) return;
    await updateCategory(editingId, editValue.trim());
    setEditingId(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  if (loading) {
    return (
      <div className={`${cardClass} text-center text-sm text-slate-500`}>
        Cargando categorias...
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Categorias"
        subtitle="Clasifica tus gastos para obtener reportes mas claros al cierre de cada mes."
      />

      <CategoryForm onSave={addCategory} />

      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className={labelClass}>Listado</p>
            <h3 className="text-lg font-semibold text-slate-900">
              Categorias actuales ({categories.length})
            </h3>
          </div>
        </div>

        {categories.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No hay categorias creadas.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                {editingId === cat.id ? (
                  <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(event) => setEditValue(event.target.value)}
                      className={`${inputClass} sm:flex-1`}
                      autoFocus
                    />
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={handleSaveEdit} className={secondaryButtonClass}>
                        Guardar
                      </button>
                      <button type="button" onClick={handleCancelEdit} className={ghostButtonClass}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-sm font-semibold text-slate-800">{cat.nombre}</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(cat.id, cat.nombre)}
                        className={ghostButtonClass}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCategory(cat.id)}
                        className={dangerButtonClass}
                      >
                        Eliminar
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
