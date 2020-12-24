import winston from 'winston'
import config from './config'

const loggerOptsProfiles = {
  consoleDev: {
    level: 'debug',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.cli()
        )
      })
    ]
  }
}

const loggerOpts = loggerOptsProfiles[config.logger.profile]

const logger = winston.createLogger(loggerOpts)

if (config.logger.httpTransport.enable) {
  logger.add(new winston.transports.Http({
    host: config.logger.httpTransport.host,
    port: config.logger.httpTransport.port,
    path: config.logger.httpTransport.path
  }))
}

export default logger
