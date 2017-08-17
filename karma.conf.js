const webpack = require('webpack');

const regular_expressions = {
  javascript: /\.js$/,
  styles: /\.scss$/,
};

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'], // run in Chrome
    singleRun: false,
    frameworks: ['mocha'], // use mocha test framework
    files: [
      './src/client/**/*.spec.js' // test files
    ],
    plugins: ['karma-chrome-launcher', 'karma-mocha',
      'karma-webpack', 'karma-coverage',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      './src/client/**/*.spec.js': ['webpack'] // preprocess with webpack
    },
    reporters: ['mocha'], // report results
    webpack: {
      module: {
        loaders: [
          {
            test: /\.json$/,
            loader: 'json-loader',
          },
          {
            test: regular_expressions.javascript,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: regular_expressions.styles,
            loaders: [
              'style-loader',
              'css-loader?importLoaders=2&sourceMap',
              'postcss-loader',
              'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true',
            ],
          },
          {
            test: /\.(jpg|png|ico)$/,
            loaders: [
              'url-loader?limit=10000', // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
            ],
          },
        ]
      }
    },
    webpackServer: {
      noInfo: true, // don't spam the console when running in karma!
    }
  });
};