import '../support'

import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'
import MongoMemoryServer from 'mongodb-memory-server'
import app from '../../src/app'

chai.use(chaiHttp)
chai.should()

describe('handlers/request', () => {
  let mongod

  beforeEach(async () => {
    mongod = new MongoMemoryServer()
    await mongoose.connect(
      await mongod.getUri(),
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    )
  })

  afterEach(async () => {
    await mongoose.disconnect()
    await mongod.stop()
  })

  describe('POST /request', () => {
    let response

    beforeEach(async () => {
      response = await chai.request(app)
        .post('/request')
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
