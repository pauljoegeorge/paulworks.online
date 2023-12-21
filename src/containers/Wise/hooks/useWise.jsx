import { useState } from "react";
import { get, post } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

function useWise() {
  const [isLoading, setLoading] = useState(false);
  const [isAllowed, setAllowed] = useState(false);

  const checkPermission = async () => {
    const response = await get("integrations/wise/transactions");
    if (response.data === "ok") {
      setAllowed(true);
    }
  };

  const saveCardTransactions = async (values) => {
    try {
      setLoading(true);
      const response = await post("integrations/wise/transactions", values);
      if (response.data === "") {
        Notify.success("Saved card transactions to expenses!");
      } else {
        Notify.error(response.data);
      }
      setLoading(false);
    } catch {
      setLoading(false);
      Notify.error();
    }
  };

  return {
    isLoading,
    isAllowed,
    actions: {
      saveCardTransactions,
      checkPermission,
    },
  };
}

export { useWise };
