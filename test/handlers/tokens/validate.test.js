import support from '../../support'

import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../../src/app'
import User from '../../../src/models/user'

chai.use(chaiHttp)
chai.should()

describe('handlers/tokens/validate', () => {
  support.applyMongoMemoryServer()

  describe('GET /tokens/validate', () => {
    describe('valid token', () => {
      let user
      let token
      let response

      beforeEach(async () => {
        user = new User()
        await user.save()
        token = user.jwtSign().token
        response = await chai.request(app)
          .get('/tokens/validate')
          .set('Authorization', `Bearer ${token}`)
      })

      it('returns 200 status code', () => {
        response.should.have.status(200)
      })

      it('returns OK', () => {
        expect(response.text).to.be.equals('OK')
      })
    })
  })
})
