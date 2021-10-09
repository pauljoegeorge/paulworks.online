import React from 'react';
import { Route } from 'react-router-dom';
import ErrorRoutes from './pages/Error/route';
import HomeRoutes from './pages/Home/route';
import SettingRoutes from './pages/Setting/route';
import LayoutContainer from './containers/Layout';

const routes = [...HomeRoutes, ...SettingRoutes, ...ErrorRoutes];

const renderRoute = (route, props) => (
  <LayoutContainer {...props}>
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      render={(restProps) => <route.component {...restProps} {...props} />}
    />
  </LayoutContainer>
);

export const routeGenerator = ({ ...props }) => routes.map((route) => renderRoute(route, {
  ...props,
}));
