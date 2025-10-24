// src/hooks/useExpenses.js
import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { splitTwoQuotas } from "../utils/currencyUtils";
import { endOfMonth, toISODate } from "../utils/dateUtils";

export function useExpenses(uid = "demo") {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "expenses"), where("uid", "==", uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setExpenses(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error en useExpenses:", error);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [uid]);

  const addExpense = async (formData, mesClave) => {
    const total = Number(formData.montoTotal);
    if (!total || total <= 0) throw new Error("Monto inválido");

    const [c1, c2] = formData.modoPago === "dos_cuotas_mes_actual" ? splitTwoQuotas(total) : [total, 0];
    const finMes = endOfMonth(new Date(formData.fechaGasto));
    const q1Vence = new Date(finMes.getFullYear(), finMes.getMonth(), 15);
    const q2Vence = finMes;

    const put = (indice, monto, quincena, dueDate) => ({
      indice,
      monto,
      quincena,
      estado: monto > 0 ? "pendiente" : "n/a",
      fechaVencimiento: toISODate(dueDate),
      pagos: [],
    });

    let cuotas = [];
    if (formData.modoPago === "una_cuota_mes_actual") {
      const q = formData.quincenaPreferida === "2" ? 2 : 1;
      cuotas.push(put(1, c1, q, q === 1 ? q1Vence : q2Vence));
    } else {
      if (formData.mismaQuincena) {
        const q = formData.quincenaPreferida === "2" ? 2 : 1;
        cuotas.push(put(1, c1, q, q === 1 ? q1Vence : q2Vence));
        const d2 = new Date((q === 1 ? q1Vence : q2Vence).getTime());
        d2.setDate(d2.getDate() - 3);
        cuotas.push(put(2, c2, q, d2));
      } else {
        cuotas.push(put(1, c1, 1, q1Vence));
        cuotas.push(put(2, c2, 2, q2Vence));
      }
    }

    const newExpense = {
      uid,
      tipo: formData.tipo,
      cardId: formData.tipo === "tarjeta" ? formData.cardId : null,
      categoria: formData.categoria,
      descripcion: formData.descripcion || (formData.tipo === "tarjeta" ? "Compra con tarjeta" : "Gasto en efectivo"),
      montoTotal: total,
      modoPago: formData.modoPago,
      fechaGasto: formData.fechaGasto,
      mesClave,
      cuotas,
      creadoEn: Date.now(),
    };

    await addDoc(collection(db, "expenses"), newExpense);
  };

  const registerPayment = async (expenseId, indiceCuota, monto) => {
    const expenseRef = doc(db, "expenses", expenseId);
    const expense = expenses.find(e => e.id === expenseId);
    if (!expense) return;

    const cuotas = expense.cuotas.map(c => ({ ...c }));
    const c = cuotas.find(x => x.indice === indiceCuota);
    if (!c) return;

    const pagado = c.pagos.reduce((s, p) => s + p.monto, 0) + monto;
    if (pagado - c.monto > 0.009) throw new Error("El pago supera el saldo");

    c.pagos.push({ monto, fecha: toISODate(new Date()) });
    if (pagado >= c.monto - 0.001) c.estado = "pagado";

    await updateDoc(expenseRef, { cuotas });
  };

  // ✅ FUNCIÓN PARA ELIMINAR GASTO
  const deleteExpense = async (expenseId) => {
    const expenseRef = doc(db, "expenses", expenseId);
    await deleteDoc(expenseRef);
  };

  // ✅ ASEGÚRATE DE QUE deleteExpense ESTÉ EN EL RETURN
  return { expenses, loading, addExpense, registerPayment, deleteExpense };
}