import mongoose, { Schema } from 'mongoose'
import config from '../config'
import { v4 as uuidv4 } from 'uuid'
import logger from '../logger'
import { validateUserURI } from '../channels/utils'
import dispatchCodeQueue from '../queues/dispatch-code'

export const authenticationRequestSchema = new Schema({
  uuid: {
    type: String,
    default: () => (uuidv4().toString()),
    required: true
  },
  userURI: {
    type: String,
    required: true,
    validate: validateUserURI
  },
  locale: {
    type: String,
    default: 'en',
    required: true
  },
  code: {
    type: String,
    default: () => ((Math.floor(Math.random() * 8999) + 1000).toString()),
    required: true
  },
  requestedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  validUntil: {
    type: Date,
    default: () => (new Date(new Date() + config.authenticationRequestTTL * 60 * 1000)),
    required: true
  },
  validatedAt: {
    type: Date,
    default: null,
    required: false
  }
})

authenticationRequestSchema.pre('save', function (next) {
  if (!this.isNew) return next()
  next()
  logger.debug(
    `pre save to authenticationRequestSchema: ${this.uuid}`,
    {
      type: 'authentication-request-schema-pre-save',
      authenticationRequest: this.toJSON()
    }
  )
  dispatchCodeQueue.createJob(this.toJSON())
    .retries(2)
    .save()
})

export default mongoose.model('AuthenticationRequest', authenticationRequestSchema)
