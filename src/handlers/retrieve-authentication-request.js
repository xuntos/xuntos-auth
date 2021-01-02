import AuthenticationRequest from '../models/authentication-request'

export default async (req, res) => {
  const { uuid } = req.params
  const authenticationRequest = await AuthenticationRequest.findOne({ uuid }).exec()
  if (!authenticationRequest) return res.status(404).send()
  res.send({
    ...authenticationRequest.toJSON(),
    code: undefined
  })
}
