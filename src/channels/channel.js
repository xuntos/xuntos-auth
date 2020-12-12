export default class Channel {
  constructor (uri) {
    this.key = uri.match(this.constructor.regex).groups.key
  }
}
