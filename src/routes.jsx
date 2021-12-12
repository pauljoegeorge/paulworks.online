import React from 'react';
import { Route } from 'react-router-dom';
import ErrorRoutes from './pages/Error/route';
import HomeRoutes from './pages/Home/route';
import BlogRoutes from './pages/Blogs/route';
import LayoutContainer from './containers/Layout';

const routes = [...HomeRoutes, ...BlogRoutes, ...ErrorRoutes];

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

export const routeGenerator = ({ ...props }) => routes.map((route) => renderRoute(route, {
  ...props,
}));
