import { useState } from "react";
import { get, put } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

function useBudget() {
  const [isLoading, setLoading] = useState(false);
  const [fixedExpenseCategories, setFixedExpenseCategories] = useState([]);

  const getExpenseCategories = async (month) => {
    const response = await get(`fixed_expense_categories?from=${month}`);
    setFixedExpenseCategories(response);
  };

  const updateExpenseCategories = async (values, month) => {
    try {
      setLoading(true);
      const data = { from: month, categories: values.fixedExpenseCategories };
      const response = await put("fixed_expense_categories", data);
      setFixedExpenseCategories(response);
      setLoading(false);
      Notify.success();
    } catch {
      setLoading(false);
      Notify.error();
    }
  };

  return {
    isLoading,
    fixedExpenseCategories,
    actions: {
      getExpenseCategories,
      updateExpenseCategories,
    },
  };
}

export { useBudget };
