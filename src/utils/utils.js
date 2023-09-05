import moment from "moment";
import { getBeginningOfMonth } from "./date";

export const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /mobile|android|ios|iphone|ipad|ipod|windows phone|iemobile|blackberry|opera mini/i.test(
    userAgent
  );
};

export const addDateToUrl = () => {
  const currentDate = moment(getBeginningOfMonth());
  const urlSearchParams = new URLSearchParams(window.location.search);
  const dateParam = urlSearchParams.get("date");
  const providedDate = moment(dateParam).startOf("month");

  const finalDate =
    !dateParam || providedDate.isBefore(currentDate, "month")
      ? currentDate
      : providedDate;

  const formattedDate = finalDate.format("YYYY-MM-DD");
  const urlWithDate = `${window.location.pathname}?date=${formattedDate}`;

  window.history.pushState(null, "", urlWithDate);
  return formattedDate;
};

export const appendUrlToDate = (date) => {
  const urlWithDate = `${window.location.pathname}?date=${date}`;
  window.history.pushState(null, "", urlWithDate);
  return urlWithDate;
};

export const formattedDate = (date) => {
  if (!date) return "";
  return date.format("YYYY-MM-DD");
};

export const getExpenseVisibility = () => {
  const visibilities = localStorage.getItem("expenseVisibility");
  if(visibilities)
    return JSON.parse(visibilities);

  const defaultValues = { todays: true, balance: true, weekly: true };
  setExpenseVisibility(defaultValues);
  return defaultValues;
};

export const setExpenseVisibility = (visibilities) => {
  localStorage.setItem("expenseVisibility", JSON.stringify(visibilities));
};
