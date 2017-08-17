import { server_configuration } from 'universal-webpack';
import settings from '../universal-webpack';
import configuration from './common.webpack';

export default server_configuration(configuration, settings);
