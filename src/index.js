import mongoose from 'mongoose'
import app from './app'
import config from './config'

(() => {
  mongoose.connect(
    config.databaseURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )

  app.listen(
    config.apiPort,
    () => {
      console.log(`App listening at http://localhost:${config.apiPort}`)
    }
  )
})()
