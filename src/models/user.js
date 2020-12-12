import mongoose, { Schema } from 'mongoose'
import { getChannel } from '../channels'

export const userSchema = new Schema({
  uris: {
    type: [
      {
        uri: {
          type: String,
          required: true,
          validate: {
            validator: value => (!!getChannel(value)),
            message: ({ value }) => (`${value} is not a valid URI.`)
          }
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
  registeredAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

export default mongoose.model('User', userSchema)
