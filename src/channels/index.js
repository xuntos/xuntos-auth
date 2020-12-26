import email from './email'

const CHANNELS = {
  email
}

export const getChannel = uri => {
  const Channel = Object
    .values(CHANNELS)
    .filter(Channel => (Channel.activated()))
    .find(Channel => (Channel.regex.test(uri)))
  if (!Channel) return null
  return new Channel(uri)
}

export default CHANNELS
