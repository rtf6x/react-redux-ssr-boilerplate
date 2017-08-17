// import language from '../src/common/language'
import path from 'path';

import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import baseConfiguration from './common.client';

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `extract-text-webpack-plugin`
// (this behaviour can be disabled with `css_bundle: false`)
// (the filename can be customized with `css_bundle: "filename.css"`)
const configuration = baseConfiguration({
  development: false,
});

configuration.devtool = 'source-map';

configuration.plugins = configuration.plugins.concat(
  // clears the output folder
  new CleanPlugin([path.relative(configuration.context, configuration.output.path)], {
    root: configuration.context,
  }),

  // environment variables
  new webpack.DefinePlugin({
    'process.env': {
      // Useful to reduce the size of client-side libraries, e.g. react
      // development to see non-minified React errors
      NODE_ENV: JSON.stringify('production'),
      npm_package_version: JSON.stringify(process.env.npm_package_version),
    },

    _development_: false,
    _production_: true,
    _development_tools_: false,  // enable/disable redux-devtools
  }),

  // Omit duplicate modules
  // new webpack.optimize.DedupePlugin(), // - this plugin has been removed from webpack

  // Assign the module and chunk ids by occurrence count.
  // Ids that are used often get lower (shorter) ids.
  // This make ids predictable, reduces to total file size and is recommended.
  new webpack.optimize.OccurrenceOrderPlugin(),

  // // extracts common javascript into a separate file (works)
  // new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js'),

  // Compresses javascript files
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
);

export default configuration;
