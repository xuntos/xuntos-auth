export default class TokensHandler {
  static validate (req, res) {
    req.requireUser()
    res.send('OK')
  }

  static async refresh (req, res) {
    const user = await req.getUser()
    res.send({ user: user, ...user.jwtSign() })
  }
}
