const toString = value => (value.toString())

const getEnv = (key, defaultValue = null, cast = toString) => (cast(process.env[`XUNTOS_AUTH_${key}`] || defaultValue))

export default {
  apiPort: getEnv('API_PORT', 3000, parseInt),
  logger: getEnv('LOGGER', 'consoleDev')
}
