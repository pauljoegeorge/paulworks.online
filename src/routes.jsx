import React from "react";
import { Route } from "react-router-dom";
import ErrorRoutes from "./pages/Error/route";
import HomeRoutes from "./pages/Home/route";
import BlogRoutes from "./pages/Blogs/route";
import LoginRoutes from "./pages/Login/routes";
import DashboardRoutes from "./pages/Dashboard/routes";
import FixedExpensesRoutes from "./pages/FixedExpenses/routes";
import UnexpectedExpensesRoutes from "./pages/UnexpectedExpenses/routes";
import IncomeRoutes from "./pages/Income/routes";
import LayoutContainer from "./containers/Layout";
import MoneyProphetContainer from "./containers/Layout/MoneyProphet";

const routes = [
  ...HomeRoutes,
  ...BlogRoutes,
  ...LoginRoutes,
  ...DashboardRoutes,
  ...FixedExpensesRoutes,
  ...UnexpectedExpensesRoutes,
  ...IncomeRoutes,
  ...ErrorRoutes,
];

const renderRoute = (route, props) => (
  <Route
    key={route.path}
    path={route.path}
    exact={route.exact}
    render={(restProps) => (
      <MoneyProphetContainer {...props}>
        <route.component {...restProps} {...props} />
      </MoneyProphetContainer>
    )}
  />
);

export const routeGenerator = ({ ...props }) =>
  routes.map((route) =>
    renderRoute(route, {
      ...props,
    })
  );
