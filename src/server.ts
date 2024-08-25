import app from './app'
import config from './config/config'
import logger from './utils/logger';
const server = app.listen(config.PORT)

;(() => {
  try{
    logger.info(`APPLICATION_STARTED`, {
      meta: {
        PORT:config.PORT,
        SERVER_URL: config.SERVER_URL
      }
    })

  } catch (err) {
    logger.error(`APPLICATION_ERROR`, { meta: err })

    server.close((error) => {
        if (error) {
              logger.error(`APPLICATION_ERROR`, { meta: error })
        }

        process.exit(1)
    })
}
})()
