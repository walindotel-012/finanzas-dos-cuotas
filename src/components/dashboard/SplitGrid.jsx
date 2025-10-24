// src/components/dashboard/SplitGrid.jsx
import { formatCurrency } from "../../utils/currencyUtils";

export default function SplitGrid({ household, shares }) {
  const cards = [
    { 
      title: household.userA.name, 
      rows: [
        ["Total del mes", shares.userA.total],
        ["Cuota 1", shares.userA.cuota1],
        ["Cuota 2", shares.userA.cuota2],
        ["A pagar (pendiente)", shares.userA.pendiente],
      ], 
      accent: "blue"
    },
    { 
      title: household.userB.name, 
      rows: [
        ["Total del mes", shares.userB.total],
        ["Cuota 1", shares.userB.cuota1],
        ["Cuota 2", shares.userB.cuota2],
        ["A pagar (pendiente)", shares.userB.pendiente],
      ], 
      accent: "green"
    },
  ];

  const accentColors = {
    blue: { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-700" },
    green: { bg: "bg-green-50", border: "border-green-500", text: "text-green-700" },
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {cards.map((c) => (
        <div key={c.title} className={`rounded-2xl border ${accentColors[c.accent].border} p-4 bg-white shadow-md`}>
          <h3 className={`text-base font-bold mb-3 ${accentColors[c.accent].text}`}>{c.title}</h3>
          <ul className="space-y-2">
            {c.rows.map(([label, val]) => (
              <li key={label} className="flex items-center justify-between text-sm">
                <span className="text-zinc-600">{label}</span>
                <span className="font-semibold">{formatCurrency(val)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}