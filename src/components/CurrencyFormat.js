import React from "react";
import { constants } from "../utils/constants";

function CurrencyFormat({ amount }) {
  const formattedAmount = amount.toLocaleString("ja-JP", {
    style: "currency",
    currency: constants.defaultCurrency,
  });

  return <span>{formattedAmount}</span>;
}

export default CurrencyFormat;
