import { Logger as WinstonLogger } from 'winston';

class Logger {
  private logger: WinstonLogger;

  constructor(logger: WinstonLogger) {
    this.logger = logger;
  }

  info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  error(message: string, meta?: any) {
    this.logger.error(message, meta);
  }

  debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }
}

export default Logger;