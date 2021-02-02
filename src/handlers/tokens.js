export default class TokensHandler {
  static validate (req, res) {
    req.requireUser()
    res.send('OK')
  }
}
