import { expect } from 'chai'
import config from '../../src/config'
import EmailChannel from '../../src/channels/email'

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
})
