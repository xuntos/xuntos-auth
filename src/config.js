import path from 'path'
import ms from 'ms'

const toString = value => (value.toString())

const castBoolean = value => (['true', '1', 'y', 'yes'].includes(value.toString().toLowerCase()))

const getEnv = (key, defaultValue = null, cast = toString) => (cast(process.env[`XUNTOS_AUTH_${key}`] || defaultValue))

export default {
  apiPort: getEnv('API_PORT', 3000, parseInt),
  logger: {
    profile: getEnv('LOGGER_PROFILE', 'consoleDev'),
    httpTransport: {
      enabled: getEnv('LOGGER_HTTP_TRANSPORT_ENABLED', false, castBoolean),
      host: getEnv('LOGGER_HTTP_TRANSPORT_HOST', 'input.logging.xuntos.dgls.me'),
      port: getEnv('LOGGER_HTTP_TRANSPORT_PORT', 80, parseInt),
      path: getEnv('LOGGER_HTTP_TRANSPORT_PATH', '/auth')
    }
  },
  databaseURI: getEnv('DATABASE_URI', 'mongodb://xuntos:xuntos@db.xuntos.dgls.me/xuntos-auth'),
  authenticationRequestTTL: getEnv('AUTHENTICATION_REQUEST_TTL', '30m', ms),
  queue: {
    redisURL: getEnv('QUEUE_REDIS_URL', 'redis://redis.xuntos.dgls.me/0'),
    isWorker: getEnv('QUEUE_IS_WORKER', true, castBoolean)
  },
  channels: {
    email: {
      enabled: getEnv('CHANNELS_EMAIL_ENABLED', true, castBoolean),
      from: getEnv('CHANNELS_EMAIL_FROM', 'no-reply@auth.xuntos.dgls.me'),
      smtp: {
        uri: getEnv('CHANNELS_EMAIL_SMTP_URI', 'smtps://xuntos:xuntos@mail.xuntos.dgls.me:25')
      }
    }
  },
  i18n: {
    localeDirectory: getEnv('I18N_LOCALES_DIRECTORY', path.join(__dirname, '../locales'))
  },
  templatesDirectory: getEnv('TEMPLATES_DIRECTORY', path.join(__dirname, '../templates')),
  jwt: {
    privateKeyFilePath: getEnv('JWT_PRIVATE_KEY_FILE_PATH', path.join(__dirname, '../jwt-private.key')),
    tokenExpiresIn: getEnv('JWT_TOKEN_EXPIRES_IN', '2h', ms)
  }
}
