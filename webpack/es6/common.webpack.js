// This is the base Webpack configuration file

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// project folder
const rootFolder = path.resolve(__dirname, '..', '..');

// where all the (source) assets reside
let client_source = path.resolve(rootFolder, 'src/client');
let commonRedux_source = path.resolve(rootFolder, 'src/client/redux');
let components_source = path.resolve(rootFolder, 'src/client/components');
let pages_source = path.resolve(rootFolder, 'src/client/pages');
let services_source = path.resolve(rootFolder, 'src/client/services');
let modals_source = path.resolve(rootFolder, 'src/client/modals');
let wrappers_source = path.resolve(rootFolder, 'src/client/wrappers');
let assets_source = path.resolve(rootFolder, 'assets');

try {
  fs.accessSync(path.resolve(rootFolder, 'app'));
  client_source = path.resolve(rootFolder, 'app/client');
  commonRedux_source = path.resolve(rootFolder, 'app/client/redux');
  components_source = path.resolve(rootFolder, 'app/src/client/components');
  pages_source = path.resolve(rootFolder, 'app/src/client/pages');
  services_source = path.resolve(rootFolder, 'app/src/client/services');
  modals_source = path.resolve(rootFolder, 'app/src/client/modals');
  wrappers_source = path.resolve(rootFolder, 'app/src/client/wrappers');
} catch (e) {
}

const configuration = {
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

  // resolve all relative paths from the project root folder
  context: rootFolder,

  // https://webpack.github.io/docs/multiple-entry-points.html
  entry: {
    main: path.resolve(rootFolder, 'src/client/index.js'),
  },

  output: {
    // filesystem path for static files
    path: path.resolve(rootFolder, 'build/assets'),

    // network path for static files
    publicPath: '/assets/',

    // file name pattern for entry scripts
    filename: '[name].[hash].js',

    // file name pattern for chunk scripts
    chunkFilename: '[name].[hash].js',
  },
  // maybe some kind of a progress bar during compilation

  resolve: {
    // root: rootFolder, modulesDirectories: [ "./node_modules", './src/client' ],
    alias: {
      commonRedux: commonRedux_source,
      client: client_source,
      components: components_source,
      pages: pages_source,
      services: services_source,
      assets: assets_source,
      modals: modals_source,
      wrappers: wrappers_source,
    },
    // you can now require('file') instead of require('file.[extension]')
    // extensions: ['', '.json', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.woff$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]',
      }, {
        test: /\.woff2$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]',
      }, {
        test: /\.[ot]tf$/,
        loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]',
      }, {
        test: /\.eot$/,
        loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]',
      }, {
        test: /\.json$/,
        exclude: /node_modules/,
        use: [{
          loader: 'json-loader',
        }],
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      }, {
        test: /\.(jpg|png|ico|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240, // Any <10Kb png or woff will be converted to inline base64
          },
        }],
      }, {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            minimize: true,
            importLoaders: 3,
            sourceMap: false, // fixes url() in css
          },
        }, {
          loader: 'resolve-url-loader',
          options: {
            debug: false,
            silent: true,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded',
            sourceMap: true,
            sourceMapContents: true,
          },
        }],
      }, {
        test: /\.(css)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            minimize: true,
            importLoaders: 2,
            sourceMap: false, // fixes url() in css
          },
        }, {
          loader: 'resolve-url-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        }],
      }, {
        // DO NOT USE SVG IN FONTS DECLARATION!
        test: /\.svg$/,
        //   loader: 'svg-url-loader?mimetype=image/svg+xml&name=public/fonts/[name].[ext]'
        use: [{
          loader: 'babel-loader',
        }, {
          loader: 'react-svg-loader',
          options: {
            es5: false,
            svgo: {
              pretty: true,
              plugins: [
                { removeStyleElement: true },
              ],
            },
          },
        }],
      },
    ],
  },
  plugins: [],
};

configuration.plugins.push(
  new webpack.LoaderOptionsPlugin({
    test: /\.(scss|css)$/,
    debug: false,
    options: {
      // A temporary workaround for `scss-loader`
      // https://github.com/jtangelder/sass-loader/issues/298
      output: {
        path: configuration.output.path,
      },

      // A temporary workaround for `css-loader`. Can also supply `query.context`
      // parameter.
      context: process.cwd(),
    },
  }),
);

module.exports = configuration;
