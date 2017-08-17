import React from 'react';
import Switch from 'react-router/Switch';
import Route from 'react-router/Route';

const renderRouteComponent = (props, route) => (<route.component {...props} route={route}/>);

const renderRoute = (route, i) => {
  return (
    <Route
      key={i}
      path={route.path}
      exact={route.exact}
      strict={route.strict}
      render={props => renderRouteComponent(props, route)}
    />);
};

const renderRoutes = routes => {
  return routes ? (
    <Switch>
      {routes.map(renderRoute)}
    </Switch>) : null;
};

export default renderRoutes;
