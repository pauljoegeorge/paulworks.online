import { useState } from "react";
import { get, put } from "../../../utils/api";
import { getBeginningOfMonth } from "../../../utils/date";

function useUnexpectedExpense() {
  const beginningOfMonth = getBeginningOfMonth();
  const [isLoading, setLoading] = useState(false);
  const [unexpectedExpenses, setUnexpectedExpenses] = useState([]);

  const getUnexpectedExpense = async () => {
    const response = await get(`unexpected_expenses?from=${beginningOfMonth}`);
    setUnexpectedExpenses(response);
  };

  const updateUnexpectedExpense = async (values) => {
    setLoading(true);
    const data = {
      from: beginningOfMonth,
      expenses: values.unexpectedExpenses,
    };
    const response = await put("unexpected_expenses", data);
    setUnexpectedExpenses(response);
    setLoading(false);
  };

  return {
    isLoading,
    unexpectedExpenses,
    actions: {
      getUnexpectedExpense,
      updateUnexpectedExpense,
    },
  };
}

export { useUnexpectedExpense };
