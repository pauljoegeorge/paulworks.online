import { useState } from "react";
import { get, put } from "../../../utils/api";
import { getBeginningOfMonth } from "../../../utils/date";

function useIncome() {
  const beginningOfMonth = getBeginningOfMonth();
  const [isLoading, setLoading] = useState(false);
  const [incomes, setIncomes] = useState([]);

  const getIncomes = async () => {
    const response = await get(`incomes?from=${beginningOfMonth}`);
    setIncomes(response);
  };

  const updateIncomes = async (values) => {
    setLoading(true);
    const data = { from: beginningOfMonth, incomes: values.incomes };
    const response = await put("incomes", data);
    setIncomes(response);
    setLoading(false);
  };

  return {
    isLoading,
    incomes,
    actions: {
      getIncomes,
      updateIncomes,
    },
  };
}

export { useIncome };
