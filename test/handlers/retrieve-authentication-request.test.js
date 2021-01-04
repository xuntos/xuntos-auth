import support from '../support'

import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { v4 as uuidv4 } from 'uuid'
import app from '../../src/app'
import AuthenticationRequest from '../../src/models/authentication-request'

chai.use(chaiHttp)
chai.should()

describe('handlers/retrieve-authentication-request', () => {
  let authenticationRequest

  support.applyMongoMemoryServer()

  beforeEach(async () => {
    authenticationRequest = new AuthenticationRequest({ userURI: 'email:xuntos@dgls.me' })
    await authenticationRequest.save()
  })

  describe('GET /authentication-request/:uuid', () => {
    let response

    describe('existing authentication request', () => {
      beforeEach(async () => {
        response = await chai
          .request(app)
          .get(`/authentication-request/${authenticationRequest.uuid}`)
      })

      it('status code 200', () => {
        response.should.have.status(200)
      })

      it('not render code', () => {
        expect(response.body.code).to.be.undefined
      })
    })

    describe('not found', () => {
      beforeEach(async () => {
        response = await chai
          .request(app)
          .get(`/authentication-request/${uuidv4().toString()}`)
      })

      it('status code 404', () => {
        response.should.have.status(404)
      })
    })
  })
})
