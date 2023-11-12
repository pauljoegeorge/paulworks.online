import moment from "moment";

export const getBeginningOfMonth = () => {
  const now = moment();
  const beginningOfMonth = now.startOf("month");
  return beginningOfMonth.format("YYYY-MM-DD");
};

export const getEndOfMonth = () => {
  const now = moment();
  const endOfMonth = now.endOf("month");
  return endOfMonth.format("YYYY-MM-DD");
};

export const currentDate = () => moment().format("YYYY-MM-DD");
