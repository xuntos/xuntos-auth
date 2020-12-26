import { expect } from 'chai'
import Channel from '../../src/channels/channel'

describe('channel', () => {
  describe('Channel', () => {
    describe('constructor()', () => {
      describe('not match URI', () => {
        class NumberChannel extends Channel {
          static _type = 'number-channel'
          static regex = /(?<key>[\d]+)/
        }

        it('throw error', () => {
          expect(() => {
            new NumberChannel('abc')
          }).to.throw('"abc" not match with NumberChannel channel regex')
        })
      })

      describe('without key in channel regex', () => {
        class InvalidChannel extends Channel {
          static _type = 'invalid-channel'
          static regex = /[\w\W]+/
        }

        it('throw error', () => {
          expect(() => {
            new InvalidChannel('uri')
          }).to.throw('InvalidChannel.regex not has key in match group')
        })
      })
    })

    describe('#activated', () => {
      it('throw NotImplemented', () => {
        expect(() => {
          Channel.activated()
        }).to.throw('Channel.activated not implemented')
      })
    })

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
