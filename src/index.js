import app from './app'
import config from './config'

app.listen(
  config.apiPort,
  () => {
    console.log(`App listening at http://localhost:${config.apiPort}`)
  }
)
