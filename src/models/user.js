import mongoose, { Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { validateUserURI } from '../channels/utils'
import jwt from '../jwt'

export const userURISchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
})

userURISchema.index({ uri: 1 })

export const UserURI = mongoose.model('UserURI', userURISchema)

export const userSchema = new Schema({
  uuid: {
    type: String,
    default: () => (uuidv4().toString()),
    required: true
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

const User = mongoose.model('User', userSchema)

User.findByURI = async (uri) => {
  const userURI = await UserURI.findOne({ uri }).populate('user').exec()
  if (!userURI) return null
  return userURI.user
}

User.prototype.jwtSign = function () {
  return jwt.sign({ userUuid: this.uuid })
}

export default User
