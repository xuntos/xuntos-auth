import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'

chai.use(chaiHttp)
chai.should()

describe('app', () => {
  describe('GET /ping', () => {
    let response

    beforeEach(async () => {
      response = await chai.request(app).get('/ping')
    })

    it('status code 200', () => {
      response.should.have.status(200)
    })

    it('response pong', () => {
      response.text.should.to.be.equal('pong')
    })
  })
})
