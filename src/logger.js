import winston from 'winston'
import config from './config'

const loggerOpts = {
  consoleDev: {
    level: 'debug',
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.cli()
    )
  }
}

export default winston.createLogger(loggerOpts[config.logger])
