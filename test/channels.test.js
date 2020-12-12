import { expect } from 'chai'
import { getChannel } from '../src/channels'

describe('channels', () => {
  describe('getChannel()', () => {
    describe('valid email channel', () => {
      let channel

      beforeEach(() => {
        channel = getChannel('email:xuntos@dgls.me')
      })

      it('expected key', () => {
        expect(channel.key).to.be.equal('xuntos@dgls.me')
      })
    })
  })
})
