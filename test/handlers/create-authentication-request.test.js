import support from '../support'

import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app'

chai.use(chaiHttp)
chai.should()

describe('handlers/create-authentication-request', () => {
  support.applyMongoMemoryServer()

  describe('POST /authentication-request', () => {
    let response

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/authentication-request')
        .type('json')
        .send({
          userURI: 'email:xuntos@dgls.me'
        })
    })

    it('status code 201', () => {
      response.should.have.status(201)
    })

    it('not render code', () => {
      expect(response.body.code).to.be.undefined
    })
  })
})
