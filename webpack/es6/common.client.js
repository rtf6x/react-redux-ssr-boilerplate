import { clientConfiguration } from 'universal-webpack';
import settings from '../universal-webpack';
import configuration from './common.webpack';

export default options => {
  return clientConfiguration(configuration, settings, options);
};
