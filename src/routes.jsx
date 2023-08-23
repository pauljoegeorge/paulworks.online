import React from "react";
import { Route, Redirect } from "react-router-dom";
import ErrorRoutes from "./pages/Error/route";
import HomeRoutes from "./pages/Home/route";
import BlogRoutes from "./pages/Blogs/route";
import LoginRoutes from "./pages/Login/routes";
import DashboardRoutes from "./pages/Dashboard/routes";
import FixedExpensesRoutes from "./pages/FixedExpenses/routes";
import UnexpectedExpensesRoutes from "./pages/UnexpectedExpenses/routes";
import IncomeRoutes from "./pages/Income/routes";
import ExpenseCategoriesRoutes from "./pages/ExpenseCategories/routes";
import Expenses from "./pages/Expenses/routes";
import TransactionsRoutes from "./pages/Transaction/routes";
import LayoutContainer from "./containers/Layout";
import AppLayout from "./containers/Layout/AppLayout";
import { getAuthToken } from "./utils/auth";

const routes = [
  ...HomeRoutes,
  ...BlogRoutes,
  ...LoginRoutes,
  ...DashboardRoutes,
  ...FixedExpensesRoutes,
  ...UnexpectedExpensesRoutes,
  ...IncomeRoutes,
  ...ExpenseCategoriesRoutes,
  ...TransactionsRoutes,
  ...Expenses,
  ...ErrorRoutes,
];

const renderRoute = (route, props) => (
  <Route
    key={route.path}
    path={route.path}
    exact={route.exact}
    render={(restProps) => (
      <LayoutContainer {...props}>
        <route.component {...restProps} {...props} />
      </LayoutContainer>
    )}
  />
);

const renderPrivateRoute = (route, props) => (
  <Route
    key={route.path}
    path={route.path}
    exact={route.exact}
    render={(restProps) => {
      const authenticated = getAuthToken();
      if (authenticated)
        return (
          <AppLayout {...props}>
            <route.component {...restProps} {...props} />
          </AppLayout>
        );
      return <Redirect to={{ pathname: "/sign_in" }} />;
    }}
  />
);

export const routeGenerator = ({ ...props }) =>
  routes.map((route) =>
    route.type === "public"
      ? renderRoute(route, { ...props })
      : renderPrivateRoute(route, { ...props })
  );
