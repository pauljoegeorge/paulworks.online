import { useState } from "react";
import { get, put } from "../../../utils/api";
import { getBeginningOfMonth } from "../../../utils/date";
import { Notify } from "../../../components/Notify";

function useUnexpectedExpense() {
  const beginningOfMonth = getBeginningOfMonth();
  const [isLoading, setLoading] = useState(false);
  const [unexpectedExpenses, setUnexpectedExpenses] = useState([
    { name: "overall", amount: 0 },
  ]);

  const getUnexpectedExpense = async () => {
    const response = await get(`unexpected_expenses?from=${beginningOfMonth}`);
    if (response.length !== 0) {
      setUnexpectedExpenses();
    }
  };

  const updateUnexpectedExpense = async (values) => {
    try {
      setLoading(true);
      const data = {
        from: beginningOfMonth,
        expenses: values.unexpectedExpenses,
      };
      const response = await put("unexpected_expenses", data);
      setUnexpectedExpenses(response);
      setLoading(false);
      Notify.success();
    } catch {
      setLoading(false);
      Notify.error();
    }
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
