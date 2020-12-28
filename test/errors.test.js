import './support'

import { expect } from 'chai'
import { NotImplemented } from '../src/errors'

describe('errors', () => {
  describe('NotImplemented', () => {
    it('expect error message', () => {
      const error = new NotImplemented('Class', 'method')
      expect(error.message).to.be.equal('Class.method not implemented')
    })
  })
})
