import support from '../support'

import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { v4 as uuidv4 } from 'uuid'
import app from '../../src/app'
import AuthenticationRequest from '../../src/models/authentication-request'

chai.use(chaiHttp)
chai.should()

describe('handlers/validate-authentication-request', () => {
  support.applyMongoMemoryServer()

  describe('POST /authentication-request/:uuid/validate', () => {
    describe('exists authentication request', () => {
      let authenticationRequest

      beforeEach(async () => {
        authenticationRequest = new AuthenticationRequest({ userURI: 'email:xuntos@dgls.me' })
        await authenticationRequest.save()
      })

      describe('valid code', () => {
        let response

        beforeEach(async () => {
          response = await chai.request(app)
            .post(`/authentication-request/${authenticationRequest.uuid}/validate`)
            .type('json')
            .send({
              code: authenticationRequest.code
            })
        })

        it('returns 200 status code', () => {
          response.should.have.status(200)
        })

        it('has token', () => {
          expect(response.body.token).to.be.not.undefined
        })
      })

      describe('invalid code', () => {
        let response

        beforeEach(async () => {
          response = await chai.request(app)
            .post(`/authentication-request/${authenticationRequest.uuid}/validate`)
            .type('json')
            .send({
              code: '0000'
            })
        })

        it('returns 404 status code', () => {
          response.should.have.status(404)
        })
      })
    })

    describe('not found authentication request', () => {
      let response

      beforeEach(async () => {
        response = await chai.request(app)
          .post(`/authentication-request/${uuidv4().toString()}/validate`)
          .type('json')
          .send({
            code: '0000'
          })
      })

      it('returns 404 status code', () => {
        response.should.have.status(404)
      })
    })
  })
})
