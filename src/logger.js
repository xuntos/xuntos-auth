import winston from 'winston'
import config from './config'

const loggerOpts = {
  consoleDev: {
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.cli()
    ),
    msg: "HTTP {{req.method}} {{req.url}}"
  }
}

export default winston.createLogger(loggerOpts[config.logger])