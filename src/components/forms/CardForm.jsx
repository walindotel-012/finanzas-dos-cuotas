// src/components/forms/CardForm.jsx
import { cardClass, labelClass, inputClass, primaryButtonClass, ghostButtonClass } from "../ui/tokens";

export default function CardForm({ formData, setFormData, onSave, onCancel, isEditing }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave();
  };

  const updateField = (field) => (value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={`${cardClass} space-y-5`}>
      <header className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          {isEditing ? "Editar tarjeta" : "Nueva tarjeta"}
        </p>
        <h3 className="text-lg font-semibold text-slate-900">
          {isEditing ? "Actualiza los datos de la tarjeta" : "Registra una tarjeta para dividir los pagos"}
        </h3>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input label="Entidad" value={formData.entidad} onChange={updateField("entidad")} />
        <Input label="Alias" value={formData.alias} onChange={updateField("alias")} />
        <Input
          label="Numero (enmascarado)"
          placeholder="**** 1234"
          value={formData.numeroEnmascarado}
          onChange={updateField("numeroEnmascarado")}
        />
        <Input
          label="Limite de credito (DOP)"
          type="number"
          value={formData.limiteCredito}
          onChange={updateField("limiteCredito")}
        />
        <Input
          label="Dia de corte"
          type="number"
          min="1"
          max="31"
          value={formData.fechaCorte}
          onChange={updateField("fechaCorte")}
        />
        <Input
          label="Dia limite de pago"
          type="number"
          min="1"
          max="31"
          value={formData.fechaLimitePago}
          onChange={updateField("fechaLimitePago")}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="submit" className={primaryButtonClass}>
          {isEditing ? "Actualizar" : "Guardar"}
        </button>
        {onCancel ? (
          <button type="button" onClick={onCancel} className={ghostButtonClass}>
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "", min, max }) {
  return (
    <label className="space-y-1">
      <span className={labelClass}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className={inputClass}
        required
      />
    </label>
  );
}
