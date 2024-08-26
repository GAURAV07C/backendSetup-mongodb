import { NextFunction, Request, Response } from 'express'
// import config from '../config/config'
// import { EApplicationEnvironment } from '../constant/application'
import { rateLimiterMongo } from '../config/rateLimiter'
import httpError from '../utils/httpError'
import responseMessage from '../constant/responceMessage'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'

export default (req: Request, _: Response, next: NextFunction) => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return next()
    }

    if (rateLimiterMongo) {
        rateLimiterMongo
            .consume(req.ip as string, 1)
            .then(() => {
                next()
            })
            .catch(() => {
                httpError(next, new Error(responseMessage.TOO_MANY_REQUESTS), req , 429)
            })
    }
}
