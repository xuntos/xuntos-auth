import email from './email'

const CHANNELS = {
  email
}

export const getActivatedChannels = () => (Object
  .values(CHANNELS)
  .filter(Channel => (Channel.activated())))

export const getChannel = uri => {
  const Channel = getActivatedChannels().find(Channel => (Channel.regex.test(uri)))
  if (!Channel) return null
  return new Channel(uri)
}

export default CHANNELS
