import '../support'

import { expect } from 'chai'
import sinon from 'sinon'
import nodemailer from 'nodemailer'
import config from '../../src/config'
import EmailChannel from '../../src/channels/email'
import AuthenticationRequest from '../../src/models/authentication-request'

describe('EmailChannel', () => {
  describe('activated()', () => {
    describe('config.channels.email.enabled true', () => {
      const enabled = config.channels.email.enabled

      beforeEach(() => {
        config.channels.email.enabled = true
      })

      afterEach(() => {
        config.channels.email.enabled = enabled
      })

      it('returns true', () => {
        expect(EmailChannel.activated()).to.be.true
      })
    })

    describe('config.channels.email.enabled false', () => {
      const enabled = config.channels.email.enabled

      beforeEach(() => {
        config.channels.email.enabled = false
      })

      afterEach(() => {
        config.channels.email.enabled = enabled
      })

      it('returns false', () => {
        expect(EmailChannel.activated()).to.be.false
      })
    })
  })

  describe('#getSendMailOpts()', () => {
    let emailChannel
    let authenticationRequest

    beforeEach(() => {
      emailChannel = new EmailChannel('email:xuntos@dgls.me')
      authenticationRequest = new AuthenticationRequest()
    })

    it('expected structure', async () => {
      const r = await emailChannel.getSendMailOpts(authenticationRequest)
      expect(Object.keys(r)).deep.equal(['from', 'to', 'subject', 'text', 'html'])
    })
  })

  describe('#dispatchCode()', () => {
    let emailChannel
    let authenticationRequest
    let sandbox
    let testAccount

    beforeEach(async () => {
      emailChannel = new EmailChannel('email:xuntos@dgls.me')
      authenticationRequest = new AuthenticationRequest()
      sandbox = sinon.createSandbox()
      testAccount = await nodemailer.createTestAccount()
      sandbox.stub(EmailChannel, 'getTransporter').returns(nodemailer.createTransport(`smtp://${testAccount.user}:${testAccount.pass}@smtp.ethereal.email:587`))
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('expected success true', async () => {
      const r = await emailChannel.dispatchCode(authenticationRequest)
      expect(r.success).to.be.true
      console.log(`see email: ${nodemailer.getTestMessageUrl(r.mailInfo)}`)
    })
  })
})
