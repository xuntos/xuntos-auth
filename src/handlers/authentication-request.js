import { validate as validateUuid } from 'uuid'
import logger from '../logger'
import AuthenticationRequest from '../models/authentication-request'

export default class AuthenticationRequestHandler {
  static async getAuthenticationRequest (uuidOrUserURI) {
    const findConditions = validateUuid(uuidOrUserURI)
      ? { uuid: uuidOrUserURI }
      : { userURI: uuidOrUserURI }
    const authenticationRequest = await AuthenticationRequest
      .findOne(findConditions)
      .sort({ requestedAt: -1 })
      .exec()
    return authenticationRequest
  }

  static async create (req, res, next) {
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

  static async retrieve (req, res) {
    const { uuidOrUserURI } = req.params
    const authenticationRequest = await AuthenticationRequestHandler.getAuthenticationRequest(uuidOrUserURI)
    if (!authenticationRequest) return res.status(404).send()
    res.send({
      ...authenticationRequest.toJSON(),
      code: undefined
    })
  }

  static async validate (req, res, next) {
    const { uuidOrUserURI } = req.params
    const authenticationRequest = await AuthenticationRequestHandler.getAuthenticationRequest(uuidOrUserURI)
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
}
