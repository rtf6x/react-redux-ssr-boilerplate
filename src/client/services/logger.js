import uuid from 'uuid';

class Logger {
  constructor() {
    this.hash = uuid();
  }

  info = (...args) => {
    // Raven.captureException(new Error('Test!'));
    console.log(`[${this.hash}]`, ...args);
  };

  debug = (...args) => {
    // Raven.captureException(new Error('Test!'));
    console.debug(`[${this.hash}]`, ...args);
  };

  error = (...args) => {
    // Raven.captureException(new Error('Test!'));
    console.error(`[${this.hash}]`, ...args);
  };
}

export default new Logger();
