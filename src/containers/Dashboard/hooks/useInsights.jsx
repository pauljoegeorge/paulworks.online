import { useState } from "react";
import moment from "moment";
import { get } from "../../../utils/api";

function useInsights() {
  const [isLoading, setLoading] = useState(false);
  const [expenseInsights, setExpenseInsights] = useState([]);

  const getExpenseInsights = async () => {
    setLoading(true);
    const currentDate = moment();
    const currentMonth = currentDate.startOf("month").format("YYYY-MM-DD");
    const response = await get(`expenses/insights?from=${currentMonth}`);
    setExpenseInsights(response);
    setLoading(false);
  };

  return {
    isLoading,
    expenseInsights,
    actions: {
      getExpenseInsights,
    },
  };
}

export { useInsights };
