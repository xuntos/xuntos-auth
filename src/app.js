import express from 'express'
import expressWinston  from 'express-winston'
import logger from './logger'
import pingHandler from './handlers/ping'

const app = express()

app.use(expressWinston.logger({ winstonInstance: logger }))

app.get('/ping', pingHandler)

export default app
