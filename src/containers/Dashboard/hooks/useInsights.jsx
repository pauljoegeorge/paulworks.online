import { useState } from "react";
import moment from "moment";
import { get } from "../../../utils/api";

function useInsights() {
  const [isLoading, setLoading] = useState(false);
  const [insights, setInsights] = useState([]);

  const getInsights = async () => {
    setLoading(true);
    const currentDate = moment();
    const currentMonth = currentDate.startOf("month").format("YYYY-MM-DD");
    const response = await get(`expenses?from=${currentMonth}`);
    setInsights(response);
    setLoading(false);
  };

  return {
    isLoading,
    insights,
    actions: {
      getInsights,
    },
  };
}

export { useInsights };
