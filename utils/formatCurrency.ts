export default function formatterCurrency(amount: number) {
  // Formatter currency to idr
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return formatter.format(amount);
}
