import webpack from 'webpack';
import clientConfiguration from './common.client';

import appConfig from '../../src/common/configuration';

const configuration = clientConfiguration({
  development: true, css_bundle: true,
});

configuration.devtool = 'inline-source-map';

configuration.plugins.push(
  // environment variables
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      MODE: JSON.stringify('dev'),
      BABEL_ENV: JSON.stringify('development/client'),
      npm_package_version: JSON.stringify(process.env.npm_package_version),
    },
    REDUX_DEVTOOLS: true,
    _development_: true,
    _production_: false,
    _development_tools_: true,  // enable/disable redux-devtools
  }),

  // faster code reload on changes
  new webpack.HotModuleReplacementPlugin(),

  // prints more readable module names in the browser console on HMR updates
  new webpack.NamedModulesPlugin(),

  // // extracts common javascript into a separate file (works)
  // new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js')
);

// enable webpack development server
configuration.entry.main = [
  `webpack-hot-middleware/client?path=http://${appConfig.development_server.host}:${appConfig.development_server.port}/__webpack_hmr`,
  'react-hot-loader/patch',
  configuration.entry.main,
];

// network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${appConfig.development_server.host}:${appConfig.development_server.port}${configuration.output.publicPath}`;

export default configuration;
