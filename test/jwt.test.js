import './support'
import jwt from '../src/jwt'
import { expect } from 'chai'

describe('jwt', () => {
  const payload = { foo: 'bar' }

  it('sign and verify', () => {
    const token = jwt.sign(payload)
    expect(token).to.be.not.null
    const out = jwt.verify(token)
    expect({
      ...out,
      iat: undefined
    }).to.be.deep.equal({
      ...payload,
      iat: undefined
    })
  })
})
