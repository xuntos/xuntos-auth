import BeeQueue from 'bee-queue'
import logger from '../logger'
import queueBaseConfig from './queue-base-config'
import { getChannel } from '../channels'

const dispatchCodeQueue = new BeeQueue('dispatch-code', queueBaseConfig)

dispatchCodeQueue.process(async ({ data: authenticationRequest }) => {
  logger.info(`[dispatchCodeQueue] dispatching code to ${authenticationRequest}`, { authenticationRequest })
  const channel = getChannel(authenticationRequest.userURI)
  if (!channel) throw new Error(`Channel not found to ${authenticationRequest} user URI`)
  await channel.dispatchCode()
})

dispatchCodeQueue.on('error', error => {
  logger.error(`[queue dispatch-code] error happened: ${error.message}`, { error })
})

dispatchCodeQueue.on('failed', (job, error) => {
  logger.error(`[queue dispatch-code] job ${job.id} failed with error: ${error.message}`, { job, error })
})

export default dispatchCodeQueue
