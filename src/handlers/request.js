import logger from '../logger'
import AuthenticationRequest from '../models/authentication-request'

export default async (req, res, next) => {
  logger.info(`request to authenticate: ${JSON.stringify(req.body)}`)
  const { userURI } = req.body || {}
  const authenticationRequest = new AuthenticationRequest({ userURI })
  try {
    await authenticationRequest.save()
    res
      .status(201)
      .send({
        ...authenticationRequest.toJSON(),
        code: undefined
      })
  } catch (error) {
    next(error)
  }
}
