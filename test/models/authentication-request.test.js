import '../support'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import mongoose, { Schema } from 'mongoose'
import MongoMemoryServer from 'mongodb-memory-server'
import sinon from 'sinon'
import AuthenticationRequest, { authenticationRequestSchema } from '../../src/models/authentication-request'
import {
  AuthenticationRequestAlreadyValidated,
  AuthenticationRequestExpired
} from '../../src/errors'
import User, { UserURI } from '../../src/models/user'

chai.use(chaiAsPromised)

describe('authentication-request', () => {
  describe('authenticationRequestSchema', () => {
    it('is instance of Schema', () => {
      expect(authenticationRequestSchema).to.be.an.instanceof(Schema)
    })
  })

  describe('AuthenticationRequest', () => {
    describe('new', () => {
      describe('valid', () => {
        it('has code', () => {
          const authenticationRequest = new AuthenticationRequest({ userURI: 'email:xuntos@dgls.me' })
          const validation = authenticationRequest.validateSync()
          expect(validation).to.be.undefined
          expect(authenticationRequest.code).to.exist
        })
      })
    })

    describe('#turnValidated()', () => {
      let mongod
      let sandbox

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
        sandbox = sinon.createSandbox()
        sandbox
          .stub(authenticationRequestSchema, '_preSave')
          .callsFake((_, next) => { next() })
      })

      afterEach(async () => {
        await mongoose.disconnect()
        await mongod.stop()
        sandbox.restore()
      })

      describe('valid', () => {
        let authenticationRequest

        beforeEach(async () => {
          authenticationRequest = new AuthenticationRequest({ userURI: 'email:xuntos@dgls.me' })
          await authenticationRequest.save()
        })

        it('fill validatedAt', async () => {
          await authenticationRequest.turnValidated()
          expect(authenticationRequest.validatedAt).to.be.not.null
        })
      })

      describe('already validated', () => {
        let authenticationRequest

        beforeEach(async () => {
          authenticationRequest = new AuthenticationRequest({
            userURI: 'email:xuntos@dgls.me',
            validatedAt: Date.now()
          })
          await authenticationRequest.save()
        })

        it('raise already validated error', () => {
          expect(authenticationRequest.turnValidated()).to.eventually.throw(AuthenticationRequestAlreadyValidated)
        })
      })

      describe('expired', () => {
        let authenticationRequest

        beforeEach(async () => {
          authenticationRequest = new AuthenticationRequest({
            userURI: 'email:xuntos@dgls.me',
            validUntil: 0
          })
          await authenticationRequest.save()
        })

        it('raise expired error', () => {
          expect(authenticationRequest.turnValidated()).to.eventually.throw(AuthenticationRequestExpired)
        })
      })
    })

    describe('#getOrCreateUserFromUserURI()', () => {
      let mongod
      let authenticationRequest
      let sandbox

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
        authenticationRequest = new AuthenticationRequest({
          userURI: 'email:xuntos@dgls.me',
          validatedAt: Date.now()
        })
        await authenticationRequest.save()
        sandbox = sinon.createSandbox()
        sandbox
          .stub(authenticationRequestSchema, '_preSave')
          .callsFake((_, next) => { next() })
      })

      afterEach(async () => {
        await mongoose.disconnect()
        await mongod.stop()
        sandbox.restore()
      })

      describe('get exists user', () => {
        let user

        beforeEach(async () => {
          user = await new User()
          await user.save()
          const userURI = new UserURI({ user: user._id, uri: 'email:xuntos@dgls.me' })
          await userURI.save()
        })

        it('returns user', async () => {
          const retrievedUser = await authenticationRequest.getOrCreateUserFromUserURI()
          expect(retrievedUser).to.be.not.undefined
          expect(retrievedUser._id.toString()).to.be.equals(user._id.toString())
        })
      })

      describe('create user', () => {
        it('returns new user', async () => {
          const retrievedUser = await authenticationRequest.getOrCreateUserFromUserURI()
          expect(retrievedUser).to.be.not.undefined
          expect(retrievedUser._id).to.be.not.null
        })
      })
    })
  })
})
