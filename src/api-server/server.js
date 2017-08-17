import rootRoutes from './routes';
import Koa from 'koa';
import convert from 'koa-convert';
import cors from 'koa-cors';
import cookie from 'koa-cookie';
import koaBody from 'koa-body';
import morgan from 'koa-morgan';

require('isomorphic-fetch');

const app = new Koa();

app.use(cookie());

app.use(morgan(':method :url :status - :response-time ms', {
  stream: { write: (message, encoding) => logger.info(message.trim()) },
}));

app.use(convert(cors({ credentials: true })));
app.use(koaBody({ multipart: true }));

app.use(rootRoutes.routes()).use(rootRoutes.allowedMethods());

app.on('error', error => {
  logger.error('API Server error:', error);
});

app.listen(configuration.api_server.port, () => {
  logger.info(`Listening at ${configuration.api_server.port}`);
});


process.on('uncaughtException', err => {
  logger.error(err);
});
