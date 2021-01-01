import { Error } from 'mongoose'
import { snakeCase } from 'change-case'
import logger from '../logger'

export default (error, req, res, next) => {
  if (!error) return next()
  logger.error(
    `express error catched: ${error}`,
    {
      type: 'express-error-handler',
      error
    }
  )
  const minimalResponse = {
    success: false,
    type: snakeCase(error.name),
    details: error.toString()
  }
  if (error instanceof Error.ValidationError) {
    res
      .status(400)
      .send({
        ...minimalResponse,
        ...error
      })
  } else {
    res
      .status(400)
      .send(minimalResponse)
  }
}
