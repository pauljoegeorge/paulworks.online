import React from "react";
import { Route } from "react-router-dom";
import ErrorRoutes from "./pages/Error/route";
import HomeRoutes from "./pages/Home/route";
import BlogRoutes from "./pages/Blogs/route";
import LayoutContainer from "./containers/Layout";

const moneyProphetPaths = [
  "/sign_in",
  "/dashboard",
  "/expenses",
  "/new",
  "/chat",
  "/new/bill",
  "/budget",
  "/r_expenses",
  "/map",
  "/settings",
  "/insights",
  "/forecasts",
  "/budget-suggestions",
  "/income",
  "/fixed_expenses",
  "/unexpected_expenses",
];
const moneyProphetOrigin =
  import.meta.env.VITE_MONEY_PROPHET_URL || "https://moneyprophet.paulworks.online";

export const routeGenerator = (props) => [
  <Route
    key="money-prophet"
    exact
    path={moneyProphetPaths}
    render={({ location }) => {
      window.location.replace(
        `${moneyProphetOrigin.replace(/\/$/, "")}${location.pathname}${location.search}${location.hash}`,
      );
      return <p>Opening Money Prophet…</p>;
    }}
  />,
  ...[...HomeRoutes, ...BlogRoutes, ...ErrorRoutes].map((route) => (
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      render={(routeProps) =>
        route.type === "bare" ? (
          <route.component {...routeProps} {...props} />
        ) : (
          <LayoutContainer {...props}>
            <route.component {...routeProps} {...props} />
          </LayoutContainer>
        )
      }
    />
  )),
];
