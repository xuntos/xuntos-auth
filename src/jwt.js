import fs from 'fs'
import jsonwebtoken, {
  TokenExpiredError,
  JsonWebTokenError
} from 'jsonwebtoken'
import config from './config'
import {
  TokenExpired,
  InvalidToken
} from './errors'

const privateKeyBuffer = fs.readFileSync(config.jwt.privateKeyFilePath)

export default {
  sign: payload => ({
    token: jsonwebtoken.sign(
      payload,
      privateKeyBuffer,
      {
        algorithm: 'RS256',
        expiresIn: config.jwt.tokenExpiresIn
      }
    ),
    tokenExpirationDate: new Date(Date.now() + config.jwt.tokenExpiresIn)
  }),
  verify: token => {
    try {
      return jsonwebtoken.verify(
        token,
        privateKeyBuffer,
        { algorithms: ['RS256'] }
      )
    } catch (err) {
      if (err instanceof TokenExpiredError) throw new TokenExpired()
      if (err instanceof JsonWebTokenError) throw new InvalidToken()
      throw err
    }
  }
}
