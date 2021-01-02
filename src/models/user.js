import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { validateUserURI } from '../channels/utils'

export const userSchema = new Schema({
  uuid: {
    type: String,
    default: () => (uuidv4().toString()),
    required: true
  },
  uris: {
    type: [
      {
        uri: {
          type: String,
          required: true,
          validate: validateUserURI
        },
        referencedAt: {
          type: Date,
          default: Date.now,
          required: true
        }
      }
    ],
    validate: {
      validator: value => (Array.isArray(value) && value.length > 0),
      message: () => ('URIs must be a list with a one item.')
    }
  },
  displayName: {
    type: String,
    default: () => (`User${parseInt(Math.random() * 100000)}`),
    required: true
  },
  registeredAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

userSchema.index({ uuid: 1 })

export default mongoose.model('User', userSchema)
