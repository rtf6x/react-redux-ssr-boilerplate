require('../common/server.config');
global.logger = require('../common/log')('api-server');

require('./server');
