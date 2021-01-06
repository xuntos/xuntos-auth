import './support'
import { expect } from 'chai'
import jwt from '../src/jwt'
import {
  TokenExpired,
  InvalidToken
} from '../src/errors'
import config from '../src/config'

describe('jwt', () => {
  const payload = { foo: 'bar' }

  it('sign and verify', () => {
    const { token, tokenExpirationDate } = jwt.sign(payload)
    expect(token).to.be.not.null
    expect(tokenExpirationDate).to.be.not.undefined
    expect(tokenExpirationDate).to.be.a('date')
    const out = jwt.verify(token)
    expect({
      ...out,
      iat: undefined,
      exp: undefined
    }).to.be.deep.equal({
      ...payload,
      iat: undefined,
      exp: undefined
    })
  })

  describe('verify', () => {
    describe('invalid code', () => {
      it('raise InvalidToken', () => {
        expect(() => {
          jwt.verify('abc')
        }).to.throw(InvalidToken)
      })
    })

    describe('token expired', () => {
      let tokenExpiresIn = config.jwt.tokenExpiresIn
      let token

      beforeEach(() => {
        config.jwt.tokenExpiresIn = -1
        token = jwt.sign(payload).token
      })

      afterEach(() => {
        config.jwt.tokenExpiresIn = tokenExpiresIn
      })

      it('raise TokenExpired', () => {
        expect(() => {
          jwt.verify(token)
        }).to.throw(TokenExpired)
      })
    })
  })
})
