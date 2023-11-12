import React from "react";

function CurrencyFormat({ amount }) {
  const formattedAmount = amount.toLocaleString("ja-JP", {
    style: "currency",
    currency: "JPY",
  });

  return <span>{formattedAmount}</span>;
}

export default CurrencyFormat;
