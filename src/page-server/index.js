require('../common/server.config');
global.logger = require('../common/log')('page-server');

global.webServer = `${configuration.web_server.host}:${configuration.web_server.port}`;

require('./start');
