import { NotImplemented } from '../errors'

export default class Channel {
  static _type = 'email'
  static regex = /(?<key>[\w\W])+/

  constructor (uri) {
    const match = uri.match(this.constructor.regex)
    if (!match) throw new Error(`"${uri}" not match with ${this.constructor.name} channel regex`)
    if (!match.groups || !match.groups.key) throw new Error(`${this.constructor.name}.regex not has key in match group`)
    this.key = match.groups.key
  }

  static activated () {
    throw new NotImplemented(this.name, 'activated')
  }

  dispatchCode (_authenticationRequest) {
    throw new NotImplemented(this.constructor.name, 'dispatchCode')
  }
}
