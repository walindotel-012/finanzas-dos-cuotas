// src/components/dashboard/PaymentMiniForm.jsx
import { useState } from "react";
import { inputClass, primaryButtonClass } from "../ui/tokens";

export default function PaymentMiniForm({ onPay }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!amount) return;
    onPay(Number(amount));
    setAmount("");
  };

  return (
    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        type="number"
        inputMode="decimal"
        placeholder="Monto a pagar"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        className={`${inputClass} sm:max-w-[160px]`}
      />
      <button type="button" onClick={handleSubmit} className={primaryButtonClass}>
        Registrar pago
      </button>
    </div>
  );
}
