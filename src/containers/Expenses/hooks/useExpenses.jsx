import { useState } from "react";
import { get, put, post } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

function useExpenses() {
  const [isLoading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const getExpenses = async (month) => {
    const response = await get(`expenses?from=${month}`);
    setExpenses(response);
  };

  const createExpense = async (values) => {
    try {
      setLoading(true);
      const data = { expense: values.expenses };
      await post("expenses", data);
      setLoading(false);
      Notify.success("Saved! Ready to add new one?");
    } catch {
      setLoading(false);
      Notify.error();
    }
  };

  const updateExpenses = async (values, month) => {
    try {
      setLoading(true);
      const data = { from: month, expenses: values.expenses };
      const response = await put("expenses", data);
      setExpenses(response);
      setLoading(false);
      Notify.success();
    } catch {
      setLoading(false);
      Notify.error();
    }
  };

  return {
    isLoading,
    expenses,
    actions: {
      getExpenses,
      updateExpenses,
      createExpense,
    },
  };
}

export { useExpenses };
