import sinon from 'sinon'
import redis from 'redis'
import redisMock from 'redis-mock'
import mongoose from 'mongoose'
import MongoMemoryServer from 'mongodb-memory-server'

sinon.stub(redis, 'createClient').returns(redisMock.createClient())

export default {
  applyMongoMemoryServer: () => {
    let mongod

    beforeEach(async () => {
      mongod = new MongoMemoryServer()
      await mongoose.connect(
        await mongod.getUri(),
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true
        }
      )
    })

    afterEach(async () => {
      await mongoose.disconnect()
      await mongod.stop()
    })
  }
}
