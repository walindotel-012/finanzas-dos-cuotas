export function formatCurrency(n) {
  return new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" }).format(n || 0);
}

export function splitTwoQuotas(total) {
  const c1 = Math.floor((total / 2) * 100) / 100;
  const c2 = Math.round((total - c1) * 100) / 100;
  return [c1, c2];
}
