export default class UserHandler {
  static async me (req, res, next) {
    try {
      const user = await req.getUser()
      res.send(user.toJSON())
    } catch (err) {
      next(err)
    }
  }
}
