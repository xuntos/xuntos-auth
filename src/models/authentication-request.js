import mongoose, { Schema } from 'mongoose'
import { validateUserURI } from '../channels/utils'

export const authenticationRequestSchema = new Schema({
  userURI: {
    type: String,
    required: true,
    validate: validateUserURI
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
  validatedAt: {
    type: Date,
    default: null,
    required: false
  }
})

export default mongoose.model('AuthenticationRequest', authenticationRequestSchema)
