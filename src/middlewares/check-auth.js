import {
  Unauthorized,
  InvalidAuthenticationMethod
} from '../errors'
import jwt from '../jwt'
import User from '../models/user'

const requireUser = req => {
  if (!req.userUuid) throw new Unauthorized()
}

const getUser = async (req) => {
  if (!req.userUuid) throw new Unauthorized()
  const user = await User.findOne({ uuid: req.userUuid }).exec()
  if (!user) throw new Error('user not found')
  return user
}

const authenticationMethodFns = {
  bearer: async token => {
    const { userUuid } = jwt.verify(token)
    const userExists = await User.exists({ uuid: userUuid })
    if (!userExists) throw new Error('user not found')
    return userUuid
  }
}

const raiseInvalidAuthenticationMethod = async () => {
  throw new InvalidAuthenticationMethod()
}

export default async (req, res, next) => {
  req.requireUser = requireUser.bind(null, req)
  req.getUser = getUser.bind(null, req)
  const { authorization } = req.headers
  if (!authorization) return next()
  const [method, token] = authorization.split(' ', 2)
  try {
    req.userUuid = await (authenticationMethodFns[method.toLowerCase()] || raiseInvalidAuthenticationMethod)(token)
    res.set('X-Xuntos-Auth-User-UUID', req.userUuid)
    next()
  } catch (err) {
    next(err)
  }
}
