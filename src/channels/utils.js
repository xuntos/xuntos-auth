import { getChannel } from '.'

export const validateUserURI = {
  validator: value => (!!getChannel(value)),
  message: ({ value }) => (`${value} is not a valid URI.`)
}
