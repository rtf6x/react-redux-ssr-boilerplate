import path from 'path';
import fs from 'fs-extra';
import winston from 'winston';
import moment from 'moment';
import colors from 'colors';

colors.enabled = true;

require('winston-daily-rotate-file');

module.exports = function create(name) {
  const rootFolder = path.resolve(__dirname, '..', '..');
  const logPath = path.resolve(rootFolder, 'log', `${name}.txt`);

  fs.ensureDirSync(path.dirname(logPath));

  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: () => moment(new Date()).format('DD/MM/YYYY hh:mm:ss'),
        formatter: options => {
          const format = `[${name.toUpperCase()}] [${options.timestamp()}] [${options.level.toUpperCase()}] ${
            options.message ? options.message : ''
            }${options.meta && Object.keys(options.meta).length ? `\n\t${JSON.stringify(options.meta)}` : ''}`;

          return options.colorize ? winston.config.colorize(options.level, format) : format;
        },
      }),
      new (winston.transports.File)({
        filename: logPath,
        prepend: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
        json: false,
        timestamp: () => moment(new Date()).format('DD/MM/YYYY hh:mm:ss'),
        formatter: options => {
          const format = `[${name.toUpperCase()}] [${options.timestamp()}] [${options.level.toUpperCase()}] ${
            options.message ? options.message : ''
            }${options.meta && Object.keys(options.meta).length ? `\n\t${JSON.stringify(options.meta)}` : ''}`;

          return options.colorize ? winston.config.colorize(options.level, format) : format;
        },
      }),
    ],
    exitOnError: false,
  });
};
