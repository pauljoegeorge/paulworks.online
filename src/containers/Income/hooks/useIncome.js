import { useState } from "react";
import { get, put } from "../../../utils/api";
import { getBeginningOfMonth } from "../../../utils/date";
import { Notify } from "../../../components/Notify";

function useIncome() {
  const beginningOfMonth = getBeginningOfMonth();
  const [isLoading, setLoading] = useState(false);
  const [incomes, setIncomes] = useState([]);

  const getIncomes = async () => {
    const response = await get(`incomes?from=${beginningOfMonth}`);
    setIncomes(response);
  };

  const updateIncomes = async (values) => {
    try {
      setLoading(true);
      const data = { from: beginningOfMonth, incomes: values.incomes };
      const response = await put("incomes", data);
      setIncomes(response);
      setLoading(false);
      Notify.success();
    } catch {
      setLoading(false);
      Notify.error();
    }
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
