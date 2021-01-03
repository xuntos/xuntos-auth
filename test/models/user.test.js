import '../support'

import { expect } from 'chai'
import mongoose, { Schema } from 'mongoose'
import MongoMemoryServer from 'mongodb-memory-server'
import User, { userSchema, UserURI } from '../../src/models/user'

describe('user', () => {
  describe('userSchema', () => {
    it('is instance of Schema', () => {
      expect(userSchema).to.be.an.instanceof(Schema)
    })
  })

  describe('User', () => {
    describe('new', () => {
      it('valid', () => {
        const user = new User()
        const validation = user.validateSync()
        expect(validation).to.be.undefined
      })

      describe('invalid', () => {
        it('invalid uri', () => {
          const userURI = new UserURI({ uri: 'xuntos@dgls.me' })
          const validation = userURI.validateSync()
          expect(validation.errors.uri.properties.message).to.be.equal('"xuntos@dgls.me" is not a valid URI.')
        })
      })
    })

    describe('.findByURI()', () => {
      let mongod
      let user

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
        user = new User()
        await user.save()
        const userURI = new UserURI({ user: user._id, uri: 'email:xuntos@dgls.me' })
        await userURI.save()
      })

      afterEach(async () => {
        await mongoose.disconnect()
        await mongod.stop()
      })

      it('found', async () => {
        const retrievedUser = await User.findByURI('email:xuntos@dgls.me')
        expect(retrievedUser).to.be.not.null
        expect(retrievedUser._id.toString()).to.be.equals(user._id.toString())
      })

      it('not found', async () => {
        const retrievedUser = await User.findByURI('email:xuntos-01@dgls.me')
        expect(retrievedUser).to.be.null
      })
    })
  })
})
