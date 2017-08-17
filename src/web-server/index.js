require('../common/server.config');
global.logger = require('../common/log')('web-server');

require('./server');
