export function parseToBrl(num: number) {
  const parsed = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(num);

  return parsed;
}
