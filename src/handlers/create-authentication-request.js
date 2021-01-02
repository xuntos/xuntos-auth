import logger from '../logger'
import AuthenticationRequest from '../models/authentication-request'

export default async (req, res, next) => {
  logger.info(
    `authentication-request: ${JSON.stringify(req.body)}`,
    {
      type: 'authentication-request',
      body: req.body
    }
  )
  const { userURI } = req.body || {}
  const authenticationRequest = new AuthenticationRequest({
    userURI,
    locale: req.locale
  })
  try {
    await authenticationRequest.save()
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
