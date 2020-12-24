import config from '../config'
import redis from 'redis'

export default {
  redis: redis.createClient(config.queue.redisURL),
  isWorker: config.queue.isWorker
}
