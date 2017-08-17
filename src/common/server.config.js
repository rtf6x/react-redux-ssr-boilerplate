const path = require('path');

// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird');

global.configuration = require('./configuration');

global.rootFolder = path.resolve(__dirname, '..', '..');
global._development_ = process.env.MODE === 'dev';

require('babel-register')({
  // Exclude `node_modules` anywhere in the path,
  // and also the `[project-root]/build` folder
  // (which is where `universal-webpack` outputs server-side bundle).
  //
  // Babel excludes all `node_modules` by default,
  // so by overriding the default behavior it must be duplicated.
  // https://github.com/babel/babel/blob/c8bd9e3ffb23e216d92fb70188fcf105381b8bb8/packages/babel-register/src/node.js#L90-L96
  //
  // Excluding the `build` folder is said to speed up things a bit.
  // https://github.com/halt-hammerzeit/webpack-react-redux-isomorphic-render-example/issues/5
  //
  ignore(filename) {
    const relativePath = path.relative(global.rootFolder, filename);
    let folder = path.dirname(relativePath);

    // If it's a `node_modules` folder, ignore it
    if (folder.split(path.sep).indexOf('node_modules') >= 0) {
      return true;
    }

    const slashIndex = folder.indexOf(path.sep);

    if (slashIndex >= 0) {
      folder = folder.substring(0, slashIndex);
    }

    return (folder === 'build');
  },
});

require('bluebird').promisifyAll(require('fs-extra'));
