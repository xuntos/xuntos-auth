import { expect } from 'chai'
import { Schema } from 'mongoose'
import AuthenticationRequest, { authenticationRequestSchema } from '../../src/models/authentication-request'

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
  })
})
