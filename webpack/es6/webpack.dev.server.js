import path from 'path';
import Express from 'express';
import cors from 'cors';
import webpack from 'webpack';

import clientConfig from './development.client';
import applicationConfig from '../../src/common/configuration';

global.rootFolder = path.resolve(__dirname, '..', '..');
const logger = require('../../src/common/log')('webpack-dev-server');

const compiler = webpack(clientConfig);
const devserver = new Express();

devserver.use(cors({ credentials: true }));

// http://webpack.github.io/docs/webpack-dev-server.html
devserver.use(require('webpack-dev-middleware')(compiler, {
  stats: {
    children: false,
    child: false,
    assets: false,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    errors: true,
    errorDetails: true,
  },

  // don’t output anything to the console
  quiet: true,

  // suppress boring information
  noInfo: true,

  // adds the HMR and switches server to hot mode
  hot: true,

  // also adds the webpack/hot/dev-server entry
  inline: true,

  // You can use it in two modes:
  // watch mode (default): The compiler recompiles on file change.
  // lazy mode: The compiler compiles on every request to the entry point.
  lazy: false,

  // network path for static files: fetch all statics from webpack development server
  publicPath: clientConfig.output.publicPath,

  headers: { 'Access-Control-Allow-Origin': '*' },
}));

devserver.use('/assets', Express.static(path.join(rootFolder, 'build', 'assets')));
devserver.use('/assets', Express.static(path.join(rootFolder, 'assets')));

devserver.use(require('webpack-hot-middleware')(compiler));

devserver.listen(applicationConfig.development_server.port, error => {
  if (error) {
    logger.error('Error!', error.stack || error);
    throw error;
  }

  logger.info('Listening at', applicationConfig.development_server.port);
});
