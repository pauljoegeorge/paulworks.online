import Home from './index';

const ErrorRoutes = [
  {
    component: Home,
    path: '*',
    exact: true,
    type: 'public',
  },
];

export default ErrorRoutes;
