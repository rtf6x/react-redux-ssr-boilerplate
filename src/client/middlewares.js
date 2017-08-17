import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from 'components/devTools';
import { routerMiddleware } from 'react-router-redux';

export default history => {
  const middlewares = [applyMiddleware(thunk, routerMiddleware(history))];
  let composeEnhancers = compose;

  if (_development_ && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  if (_development_ && typeof window === 'object' && !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    middlewares.push(DevTools.instrument());
  }

  return composeEnhancers(...middlewares);
};
