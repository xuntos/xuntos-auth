import { getActivatedChannels } from '../channels'

export default (req, res) => {
  res.send(
    getActivatedChannels()
      .map(Channel => ({
        _type: Channel._type,
        regex: Channel.regex.toString()
      }))
  )
}
