import logger from '../logger'
import AuthenticationRequest from '../models/authentication-request'

export default async (req, res, next) => {
  const { uuid } = req.params
  const { code } = req.body || {}
  const authenticationRequest = await AuthenticationRequest.findOne({ uuid, code }).exec()
  if (!authenticationRequest) return res.status(404).send()
  try {
    const { token, tokenExpirationDate, user } = await authenticationRequest.validateAndGetToken()
    logger.info(
      `validate authentication request ${authenticationRequest.uuid} using code ${authenticationRequest.code}`,
      {
        type: 'validate-authentication-request',
        uuid: authenticationRequest.uuid,
        code: authenticationRequest.code
      }
    )
    res
      .status(200)
      .send({
        token,
        tokenExpirationDate,
        user,
        authenticationRequest: authenticationRequest.toJSON()
      })
  } catch (error) {
    next(error)
  }
}
