import fs from 'fs'
import jsonwebtoken from 'jsonwebtoken'
import config from './config'

const privateKeyBuffer = fs.readFileSync(config.jwt.privateKeyFilePath)

export default {
  sign: payload => (jsonwebtoken.sign(
    payload,
    privateKeyBuffer,
    { algorithm: 'RS256'}
  )),
  verify: token => (jsonwebtoken.verify(
    token,
    privateKeyBuffer,
    { algorithms: ['RS256'] }
  ))
}
