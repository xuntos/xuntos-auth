import { getChannel } from '.'

export const validateUserURI = {
  type: 'invalid_user_uri',
  validator: value => (!!getChannel(value)),
  message: ({ value }) => (`"${value}" is not a valid URI.`)
}
