import 'source-map-support/register';

import { server } from 'universal-webpack';
import settings from '../../webpack/universal-webpack';
import configuration from '../../webpack/es6/common.webpack';

server(configuration, settings);
