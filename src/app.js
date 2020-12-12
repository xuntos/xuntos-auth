import express from 'express'
import expressWinston  from 'express-winston'
import logger from './logger'
import router from './router'

const app = express()

app.use(expressWinston.logger({ winstonInstance: logger }))
app.use(router)

export default app
