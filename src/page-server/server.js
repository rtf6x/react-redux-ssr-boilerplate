import path from 'path';
// koa related block
import Koa from 'koa';
import morgan from 'koa-morgan';
import Router from 'koa-router';
import cors from 'koa-cors';
import convert from 'koa-convert';
// react related block
import { renderToString } from 'react-dom/server';
import React from 'react';
import { createStore } from 'redux';
import Cookies from 'universal-cookie';
import { Helmet } from 'react-helmet';
import { AppContainer } from 'react-hot-loader';
// client related block
import routes from '../client/routes';
import middlewares from '../client/middlewares';
import reducer from '../client/reducers';
import App from '../client/index.server';
// server-side only related
import generateLayout from './layout';
import getRoutePromises from './getRoutePromises';

require('isomorphic-fetch');
global.configuration = require('../common/configuration');
global.logger = require('../common/log')('page-server');

global.rootFolder = path.resolve(__dirname, '..', '..');
global._development_ = process.env.MODE === 'dev';
global.webServer = `${configuration.web_server.host}:${configuration.web_server.port}`;

let params = {};
let store = {};

const app = new Koa();
const router = Router();

app.use(morgan(':method :url :status - :response-time ms', {
  stream: { write: message => logger.info(message.trim()) },
}));

app.use(convert(cors({ credentials: true })));

const promiseAllWrapper = promises => {
  return new Promise((success, reject) => {
    Promise.all(promises).then(data => success(data)).catch(error => reject(error));
  });
};

router.get('*', async (ctx, next) => {
  const context = {};

  global.cookie = ctx.headers.cookie;
  global.cookieStorage = new Cookies(ctx.headers.cookie);

  store = createStore(reducer, middlewares());
  const promises = getRoutePromises(routes, ctx, store.dispatch, [], context);

  await promiseAllWrapper(promises);
  const reactContent = renderToString(<AppContainer><App store={store} url={ctx.url} context={context} routes={routes}/></AppContainer>);

  const helmet = Helmet.renderStatic();

  if (context.url && context.url !== ctx.url) {
    return ctx.redirect(context.url);
  }

  const initialState = store.getState();

  // you can add something into the server initialState here...

  ctx.body = generateLayout(params, reactContent, helmet, initialState);
  ctx.status = 200;

  return next();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(configuration.webpage_server.port, err => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`Listening at ${configuration.webpage_server.port}`);
});

if (_development_ && module.hot) {
  logger.info('Server-side HMR enabled');

  module.hot.accept();

  module.hot.addStatusHandler(status => {
    if (status === 'abort') {
      setTimeout(() => process.exit(0), 0);
    }
  });
}

export default parameters => {
  params = parameters;
};
