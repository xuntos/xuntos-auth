import email from './email'

const CHANNELS = {
  email
}

export const getChannel = (uri) => {
  const Channel = Object
    .values(CHANNELS)
    .find(Channel => (Channel.regex.test(uri)))
  if (!Channel) return null
  return new Channel(uri)
}

export default CHANNELS
