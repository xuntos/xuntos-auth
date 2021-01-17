import support from '../../support'

import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { v4 as uuidv4 } from 'uuid'
import app from '../../../src/app'
import AuthenticationRequest from '../../../src/models/authentication-request'

chai.use(chaiHttp)
chai.should()

describe('handlers/authentication-request/retrieve', () => {
  describe('GET /authentication-request/:uuidOrUserURI', () => {
    let response

    support.applyMongoMemoryServer()

    describe('existing authentication request', () => {
      let authenticationRequest

      beforeEach(async () => {
        authenticationRequest = new AuthenticationRequest({ userURI: 'email:xuntos@dgls.me' })
        await authenticationRequest.save()
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

    describe('found by user uri', () => {
      describe('just one', () => {
        let authenticationRequest

        beforeEach(async () => {
          authenticationRequest = new AuthenticationRequest({ userURI: 'email:xuntos@dgls.me' })
          await authenticationRequest.save()
          response = await chai
            .request(app)
            .get(`/authentication-request/${authenticationRequest.userURI}`)
        })

        it('status code 200', () => {
          response.should.have.status(200)
        })

        it('expected uuid', () => {
          expect(response.body.uuid).to.be.equals(authenticationRequest.uuid)
        })
      })

      describe('last authentication request', () => {
        const userURI = 'email:xuntos@dgls.me'
        let authenticationRequestFirst
        let authenticationRequestLast

        beforeEach(async () => {
          authenticationRequestFirst = new AuthenticationRequest({ userURI })
          await authenticationRequestFirst.save()
          authenticationRequestLast = new AuthenticationRequest({ userURI })
          await authenticationRequestLast.save()
          response = await chai
            .request(app)
            .get(`/authentication-request/${userURI}`)
        })

        it('status code 200', () => {
          response.should.have.status(200)
        })

        it('expected uuid', () => {
          expect(response.body.uuid).to.be.equals(authenticationRequestLast.uuid)
        })
      })
    })
  })
})
