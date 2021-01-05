export default (req, res) => {
  req.requireUser()
  res.send(req.user.toJSON())
}
