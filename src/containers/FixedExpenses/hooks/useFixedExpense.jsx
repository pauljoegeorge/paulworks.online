import { useState } from "react";
import { get, put } from "../../../utils/api";
import { getBeginningOfMonth } from "../../../utils/date";
import { Notify } from "../../../components/Notify";

function useFixedExpense() {
  const beginningOfMonth = getBeginningOfMonth();
  const [isLoading, setLoading] = useState(false);
  const [fixedExpenses, setFixedExpenses] = useState([]);

  const getFixedExpenses = async () => {
    const response = await get(`fixed_expenses?from=${beginningOfMonth}`);
    setFixedExpenses(response);
  };

  const updateFixedExpenses = async (values) => {
    try {
      setLoading(true);
      const data = { from: beginningOfMonth, expenses: values.fixedExpenses };
      const response = await put("fixed_expenses", data);
      setFixedExpenses(response);
      setLoading(false);
      Notify.success();
    } catch {
      setLoading(false);
      Notify.error();
    }
  };

  return {
    isLoading,
    fixedExpenses,
    actions: {
      getFixedExpenses,
      updateFixedExpenses,
    },
  };
}

export { useFixedExpense };
