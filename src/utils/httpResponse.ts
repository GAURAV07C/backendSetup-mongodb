import { Request, Response } from 'express'
import { THttpResponse } from '../types/types'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void =>{
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    }

    // log
    // eslint-disable-next-line no-console
    console.log(`CONTROLLER_RESPONSE`, {
        meta: data
    } )

     // Production Env check
     if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }



    res.status(responseStatusCode).json(response)
}
