import _ from 'lodash';
import base_configuration from './common.server';
import applicationConfig from '../../src/common/configuration';
let configuration = _.clone(base_configuration);

// Network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${applicationConfig.development_server.host}:${applicationConfig.development_server.port}${configuration.output.publicPath}`;

export default configuration;
