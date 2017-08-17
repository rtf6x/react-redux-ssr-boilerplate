import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import Cookies from 'universal-cookie';
import { createStore } from 'redux';
import { AppContainer } from 'react-hot-loader';

import App from './index.client';
import reducer from './reducers';
import middlewares from './middlewares';

global.webServer = window.location.host;
global.cookieStorage = new Cookies();

const rootEl = document.getElementById('root');
const initState = window.__INITIAL_STATE__;
const history = createHistory();
const store = createStore(reducer, initState, middlewares(history));

const render = Component => ReactDOM.render(
  <AppContainer>
    <Component store={store} history={history}/>
  </AppContainer>, rootEl);

render(App);

if (module.hot) {
  module.hot.accept('./index.client', () => {
    const NextApp = require('./index.client');
    render(NextApp);
  });

  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    store.replaceReducer(nextRootReducer);
  });
}
