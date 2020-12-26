import Channel from '../channel'
import config from '../../config'

export default class EmailChannel extends Channel {
  static _type = 'email'
  static regex = /^email:(?<key>[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?)$/

  static activated () {
    return config.channels.email.enabled
  }
}
