import {
  Unauthorized,
  InvalidAuthenticationMethod
} from '../errors'
import jwt from '../jwt'
import User from '../models/user'

const requireUser = (req) => {
  if (!req.user) throw new Unauthorized()
}

const authenticationMethodFns = {
  bearer: async token => {
    const { userUuid } = jwt.verify(token)
    const user = await User.findOne({ uuid: userUuid }).exec()
    if (!user) throw new Error('user not found')
    return user
  }
}

const raiseInvalidAuthenticationMethod = async () => {
  throw new InvalidAuthenticationMethod()
}

export default async (req, res, next) => {
  req.requireUser = requireUser.bind(null, req)
  const { authorization } = req.headers
  if (!authorization) return next()
  const [method, token] = authorization.split(' ', 2)
  try {
    req.user = await (authenticationMethodFns[method.toLowerCase()] || raiseInvalidAuthenticationMethod)(token)
    next()
  } catch (err) {
    next(err)
  }
}
