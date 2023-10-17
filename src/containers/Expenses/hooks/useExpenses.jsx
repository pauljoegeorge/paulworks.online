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

  const getGroupedExpenses = async (month) => {
    const response = await get(`expenses/map_view?from=${month}`);
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

  const exportExpenses = async (month) => {
    try {
      setLoading(true);
      const response = await get(`expenses/export?from=${month}`);

      const blob = new Blob([response], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${month}_expenses.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

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
      getGroupedExpenses,
      updateExpenses,
      createExpense,
      exportExpenses,
    },
  };
}

export { useExpenses };
