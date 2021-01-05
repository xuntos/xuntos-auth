import support from '../support'

import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { v4 as uuidv4 } from 'uuid'
import app from '../../src/app'
import User from '../../src/models/user'
import jwt from '../../src/jwt'

chai.use(chaiHttp)
chai.should()

describe('middlewares/check-auth', () => {
  support.applyMongoMemoryServer()

  describe('bearer method', () => {
    describe('authorized', () => {
      describe('GET /user/me', () => {
        let user
        let response

        beforeEach(async () => {
          user = new User()
          user.save()
          const token = jwt.sign({ userUuid: user.uuid })
          response = await chai.request(app)
            .get('/users/me')
            .set({ authorization: `Bearer ${token}` })
        })

        it('returns 200 status code', () => {
          response.should.have.status(200)
        })
      })
    })

    describe('unauthorized', () => {
      describe('invalid token', () => {
        describe('GET /user/me', () => {
          let response

          beforeEach(async () => {
            response = await chai.request(app)
              .get('/users/me')
              .set({ authorization: 'Bearer abc' })
          })

          it('returns 401 status code', () => {
            response.should.have.status(401)
          })

          it('type is invalid_token', () => {
            expect(response.body.type).to.be.equals('invalid_token')
          })
        })
      })

      describe('user not found', () => {
        describe('GET /user/me', () => {
          let response

          beforeEach(async () => {
            const token = jwt.sign({ userUuid: uuidv4().toString() })
            response = await chai.request(app)
              .get('/users/me')
              .set({ authorization: `Bearer ${token}` })
          })

          it('returns 401 status code', () => {
            response.should.have.status(400)
          })

          it('correct details', () => {
            expect(response.body.details).to.be.equals('Error: user not found')
          })
        })
      })
    })
  })

  describe('not has authorization header', () => {
    describe('GET /user/me', () => {
      let response

      beforeEach(async () => {
        response = await chai.request(app).get('/users/me')
      })

      it('returns 401 status code', () => {
        response.should.have.status(401)
      })

      it('type is unauthorized', () => {
        expect(response.body.type).to.be.equals('unauthorized')
      })
    })
  })
})
