import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/apiRouter';
import globalErrorHandler from './middleware/globalErrorHandler';
import httpError from './utils/httpError';
import responseMessage from './constant/responceMessage'
import helmet from 'helmet';
import cors from 'cors'
const app:Application = express();

// middleWare
app.use(helmet())
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: ['https://client.com'],
        credentials: true
    })
)
app.use(express.json())

app.use(express.static(path.join(__dirname, '../public')));





// Router
app.use('/api/v1',router)

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage .NOT_FOUND('route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})

// Global Error Handler
app.use(globalErrorHandler)




export default app;
