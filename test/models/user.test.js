import '../support'

import { expect } from 'chai'
import { Schema } from 'mongoose'
import User, { userSchema } from '../../src/models/user'

describe('user', () => {
  describe('userSchema', () => {
    it('is instance of Schema', () => {
      expect(userSchema).to.be.an.instanceof(Schema)
    })
  })

  describe('User', () => {
    describe('new', () => {
      it('valid', () => {
        const user = new User({ uris: [{ uri: 'email:xuntos@dgls.me' }] })
        const validation = user.validateSync()
        expect(validation).to.be.undefined
      })

      describe('invalid', () => {
        it('empty uris', () => {
          const user = new User({ uris: [] })
          const validation = user.validateSync()
          expect(validation.errors.uris.properties.message).to.be.equal('URIs must be a list with a one item.')
        })

        it('invalid uri', () => {
          const user = new User({ uris: [{ uri: 'xuntos@dgls.me' }] })
          const validation = user.validateSync()
          expect(validation.errors['uris.0.uri'].properties.message).to.be.equal('xuntos@dgls.me is not a valid URI.')
        })
      })
    })
  })
})
