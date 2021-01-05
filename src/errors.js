export class NotImplemented extends Error {
  constructor (className, method) {
    super(`${className}.${method} not implemented`)
  }
}

export class AuthenticationRequestAlreadyValidated extends Error {
  constructor () {
    super('authentication request already validated')
  }
}

export class AuthenticationRequestExpired extends Error {
  constructor () {
    super('authentication request expired')
  }
}

export class Unauthorized extends Error {
  constructor () {
    super('Unauthorized')
    this.statusCode = 401
  }
}

export class InvalidAuthenticationMethod extends Error {
  constructor () {
    super('invalid authentication method')
    this.statusCode = 401
  }
}
