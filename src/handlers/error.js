import { Error } from 'mongoose'
import logger from '../logger'

export default (error, req, res, next) => {
  if (!error) return next()
  logger.error(`Error catched: ${error}`)
  if (error instanceof Error.ValidationError) {
    res.status(400).send({
      success: false,
      details: error.toString(),
      ...error
    })
  } else {
    res.status(400).send({
      success: false,
      details: error.toString()
    })
  }
}
