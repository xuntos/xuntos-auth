import Channel from '../channel';

export default class EmailChannel extends Channel {
  static _type = 'email'
  static regex = /^email:(?<key>[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?)$/
}
