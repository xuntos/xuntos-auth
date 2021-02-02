import support from '../../support'

import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../../src/app'
import User from '../../../src/models/user'
import jwt from '../../../src/jwt'

chai.use(chaiHttp)
chai.should()

describe('handlers/tokens/refresh', () => {
  support.applyMongoMemoryServer()

  describe('GET /tokens/refresh', () => {
    describe('valid token', () => {
      let user
      let token
      let response

      beforeEach(async () => {
        user = new User()
        await user.save()
        token = user.jwtSign().token
        response = await chai.request(app)
          .post('/tokens/refresh')
          .set('Authorization', `Bearer ${token}`)
      })

      it('returns 200 status code', () => {
        response.should.have.status(200)
      })

      it('returns new valid token', () => {
        expect(response.body.token).to.be.not.undefined
        const newToken = response.body.token
        const out = jwt.verify(newToken)
        expect(out.userUuid).to.be.not.undefined
        expect(out.userUuid).to.be.equals(user.uuid)
      })
    })
  })
})
