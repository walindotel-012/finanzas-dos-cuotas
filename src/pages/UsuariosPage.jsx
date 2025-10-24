import PageHeader from "../components/layout/PageHeader";
import { cardClass, labelClass, inputClass, mutedCardClass } from "../components/ui/tokens";
import { formatCurrency } from "../utils/currencyUtils";

export default function UsuariosPage({ household, updateHousehold, shares }) {
  const handleNameChange = (key) => (event) => {
    updateHousehold({
      ...household,
      [key]: { ...household[key], name: event.target.value },
    });
  };

  const repartoRows = [
    { label: "Total del mes", key: "total" },
    { label: "Cuota 1", key: "cuota1" },
    { label: "Cuota 2", key: "cuota2" },
    { label: "Pendiente por pagar", key: "pendiente" },
  ];

  return (
    <section className="space-y-6">
      <PageHeader
        title="Usuarios 50/50"
        subtitle="Ajusta los nombres de los usuarios y revisa el resumen de cuanto paga cada uno."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className={`${cardClass} space-y-4`}>
          <div>
            <p className={labelClass}>Configuracion</p>
            <h3 className="text-lg font-semibold text-slate-900">Datos de los usuarios</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-1">
              <span className={labelClass}>Nombre usuario A</span>
              <input
                value={household.userA.name}
                onChange={handleNameChange("userA")}
                className={inputClass}
              />
            </label>
            <label className="space-y-1">
              <span className={labelClass}>Nombre usuario B</span>
              <input
                value={household.userB.name}
                onChange={handleNameChange("userB")}
                className={inputClass}
              />
            </label>
          </div>
          <p className="text-xs text-slate-500">
            El reparto se mantiene fijo 50/50 sobre el total de gastos del mes seleccionado.
          </p>
        </div>

        <div className={`${cardClass} space-y-4`}>
          <div>
            <p className={labelClass}>Resumen</p>
            <h3 className="text-lg font-semibold text-slate-900">Cuanto paga cada uno</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ResumenCard nombre={household.userA.name} data={shares.userA} rows={repartoRows} />
            <ResumenCard nombre={household.userB.name} data={shares.userB} rows={repartoRows} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumenCard({ nombre, data, rows }) {
  return (
    <div className={mutedCardClass}>
      <p className="text-sm font-semibold text-slate-800">{nombre}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {rows.map((row) => (
          <li key={row.key} className="flex items-center justify-between text-slate-600">
            <span>{row.label}</span>
            <span className="font-semibold text-slate-900">{formatCurrency(data[row.key])}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
