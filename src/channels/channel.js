import { NotImplemented } from '../errors'

export default class Channel {
  static _type = 'email'
  static regex = /(?<key>[\w\W])+/

  constructor (uri) {
    this.key = uri.match(this.constructor.regex).groups.key
  }

  dispatchCode () {
    throw new NotImplemented(this.constructor.name, 'dispatchCode')
  }
}
