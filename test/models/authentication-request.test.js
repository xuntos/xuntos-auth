import support from '../support'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Schema } from 'mongoose'
import sinon from 'sinon'
import AuthenticationRequest, { authenticationRequestSchema } from '../../src/models/authentication-request'
import {
  AuthenticationRequestAlreadyValidated,
  AuthenticationRequestExpired
} from '../../src/errors'
import User, { UserURI } from '../../src/models/user'
import jwt from '../../src/jwt'

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
      support.applyMongoMemoryServer()

      let sandbox

      beforeEach(async () => {
        sandbox = sinon.createSandbox()
        sandbox
          .stub(authenticationRequestSchema, '_preSave')
          .callsFake((_, next) => { next() })
      })

      afterEach(async () => {
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
      let authenticationRequest
      let sandbox

      support.applyMongoMemoryServer()

      beforeEach(async () => {
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

    describe('#validateAndGetToken()', () => {
      let authenticationRequest
      let sandbox

      support.applyMongoMemoryServer()

      beforeEach(async () => {
        authenticationRequest = new AuthenticationRequest({ userURI: 'email:xuntos@dgls.me' })
        await authenticationRequest.save()
        sandbox = sinon.createSandbox()
        sandbox
          .stub(authenticationRequestSchema, '_preSave')
          .callsFake((_, next) => { next() })
      })

      afterEach(async () => {
        sandbox.restore()
      })

      it('returns valid token and user', async () => {
        const { token, user } = await authenticationRequest.validateAndGetToken()
        expect(token).to.be.not.null
        const out = jwt.verify(token)
        expect(out).to.be.a('object')
        expect(Object.keys(out)).to.be.deep.equal(['userUuid', 'iat', 'exp'])
        expect(out.userUuid).to.be.equals(user.uuid)
      })
    })
  })
})
