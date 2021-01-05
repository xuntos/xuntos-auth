import { Error as MongooseError } from 'mongoose'
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
    type: snakeCase(error.constructor.name),
    details: error.toString()
  }
  if (error instanceof MongooseError.ValidationError) {
    res
      .status(400)
      .send({
        ...minimalResponse,
        ...error
      })
  } else {
    res
      .status(error.statusCode || 400)
      .send(minimalResponse)
  }
}
