import mongoose, { Schema } from 'mongoose'
import config from '../config'
import { v4 as uuidv4 } from 'uuid'
import logger from '../logger'
import { validateUserURI } from '../channels/utils'
import dispatchCodeQueue from '../queues/dispatch-code'
import {
  AuthenticationRequestAlreadyValidated,
  AuthenticationRequestExpired
} from '../errors'
import User, { UserURI } from './user'

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
    default: () => (new Date(Date.now() + config.authenticationRequestTTL)),
    required: true
  },
  validatedAt: {
    type: Date,
    default: null,
    required: false
  }
})

authenticationRequestSchema.index({
  uuid: 3,
  userURI: 2,
  code: 1
})

authenticationRequestSchema._preSave = (authenticationRequest, next) => {
  if (!authenticationRequest.isNew) return next()
  next()
  logger.debug(
    `pre save to authenticationRequestSchema: ${authenticationRequest.uuid}`,
    {
      type: 'authentication-request-schema-pre-save',
      authenticationRequest: authenticationRequest.toJSON()
    }
  )
  dispatchCodeQueue.createJob(authenticationRequest.toJSON())
    .retries(2)
    .save()
}

authenticationRequestSchema.pre('save', function (next) {
  authenticationRequestSchema._preSave(this, next)
})

const AuthenticationRequest = mongoose.model('AuthenticationRequest', authenticationRequestSchema)

AuthenticationRequest.prototype.turnValidated = async function () {
  if (this.validatedAt) throw new AuthenticationRequestAlreadyValidated()
  if (this.validUntil < Date.now()) throw new AuthenticationRequestExpired()
  this.validatedAt = Date.now()
  await this.save()
}

AuthenticationRequest.prototype.getOrCreateUserFromUserURI = async function () {
  if (!this.validatedAt) throw new Error('the authentication request has not been validated yet')
  const user = await User.findByURI(this.userURI)
  if (user) return user
  const createdUser = new User()
  await createdUser.save()
  const userURI = new UserURI({
    user: createdUser._id,
    uri: this.userURI
  })
  await userURI.save()
  return createdUser
}

AuthenticationRequest.prototype.validateAndGetToken = async function () {
  await this.turnValidated()
  const user = await this.getOrCreateUserFromUserURI()
  const { token, tokenExpirationDate } = user.jwtSign()
  return {
    token,
    tokenExpirationDate,
    user
  }
}

export default AuthenticationRequest
