import { NextFunction, Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import responseMessage from '../constant/responceMessage'
import httpError from '../utils/httpError';

export default {
  self: (req: Request, res: Response , next: NextFunction) => {
    try {
      httpResponse(req, res, 200, responseMessage.SUCCESS)
    } catch (err) {
     httpError(next , err , req , 500)
    }
  },
};
