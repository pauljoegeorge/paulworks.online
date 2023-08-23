import Transactions from "./index";

const TransactionsRoutes = [
  {
    component: Transactions,
    path: "/new",
    exact: true,
    type: "private",
  },
];

export default TransactionsRoutes;
