import express from 'express'
import pingHandler from './handlers/ping'

const app = express()

app.get('/ping', pingHandler)

export default app
