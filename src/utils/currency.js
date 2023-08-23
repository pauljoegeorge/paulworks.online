export const formattedCurrency = (amount) => {
  return amount.toLocaleString("ja-JP", {
    style: "currency",
    currency: "JPY",
    minimumFractionDigits: 0,
  });
};
