const toString = value => (value.toString())

const castBoolean = value => (['true', '1', 'y', 'yes'].includes(value.toLowerCase()))

const getEnv = (key, defaultValue = null, cast = toString) => (cast(process.env[`XUNTOS_AUTH_${key}`] || defaultValue))

export default {
  apiPort: getEnv('API_PORT', 3000, parseInt),
  logger: getEnv('LOGGER', 'consoleDev'),
  databaseURI: getEnv('DATABASE_URI', 'mongodb://xuntos:xuntos@localhost:27017/xuntos-auth'),
  authenticationRequestTTL: getEnv('AUTHENTICATION_REQUEST_TTL', 30, parseInt),
  queue: {
    redisURL: getEnv('QUEUE_REDIS_URL', 'redis://localhost:6379/0'),
    isWorker: getEnv('QUEUE_IS_WORKER', true, castBoolean)
  }
}
