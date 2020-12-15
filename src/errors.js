export class NotImplemented extends Error {
  constructor (className, method) {
    super(`${className}.${method} not implemented`)
  }
}
