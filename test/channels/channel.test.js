import { expect } from 'chai'
import Channel from '../../src/channels/channel'

describe('channel', () => {
  describe('Channel', () => {
    describe('#dispatchCode', () => {
      it('throw NotImplemented', () => {
        const channel = new Channel('uri')
        expect(() => {
          channel.dispatchCode()
        }).to.throw('Channel.dispatchCode not implemented')
      })
    })
  })
})
