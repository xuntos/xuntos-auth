import logger from '../logger'
import AuthenticationRequest from '../models/authentication-request'

export default async (req, res, next) => {
  const { userURI } = req.body || {}
  const authenticationRequest = new AuthenticationRequest({
    userURI,
    locale: req.locale
  })
  try {
    await authenticationRequest.save()
    logger.info(
      `authentication request created ${authenticationRequest.uuid} to ${authenticationRequest.userURI}`,
      {
        type: 'authentication-request',
        uuid: authenticationRequest.uuid,
        userURI: authenticationRequest.userURI
      }
    )
    res
      .status(201)
      .set('Content-Location', `/authentication-request/${authenticationRequest.uuid}`)
      .send({
        ...authenticationRequest.toJSON(),
        code: undefined
      })
  } catch (error) {
    next(error)
  }
}
