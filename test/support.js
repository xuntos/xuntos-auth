import sinon from 'sinon'
import redis from 'redis'
import redisMock from 'redis-mock'

sinon.stub(redis, 'createClient').returns(redisMock.createClient())
