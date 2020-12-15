import express from 'express'
import expressWinston  from 'express-winston'
import bodyParser from 'body-parser'
import logger from './logger'
import router from './router'
import errorHandler from './handlers/error'

const app = express()

app.use(expressWinston.logger({ winstonInstance: logger }))
app.use(bodyParser.json())
app.use(router)
app.use(errorHandler)

export default app
