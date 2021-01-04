import support from '../support'

import { expect } from 'chai'
import { Schema } from 'mongoose'
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
      let user

      support.applyMongoMemoryServer()

      beforeEach(async () => {
        user = new User()
        await user.save()
        const userURI = new UserURI({ user: user._id, uri: 'email:xuntos@dgls.me' })
        await userURI.save()
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
