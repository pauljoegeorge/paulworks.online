import moment from "moment";

export const getBeginningOfMonth = () => {
  const now = moment();
  const beginningOfMonth = now.startOf("month");
  return beginningOfMonth.format("YYYY-MM-DD");
};
