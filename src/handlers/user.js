export default class UserHandler {
  static me (req, res) {
    req.requireUser()
    res.send(req.user.toJSON())
  }
}
