import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '../constants/httpStatus'
import { omit } from 'lodash'

export const defaultErrorHandler = (err: Error | any, req: Request, res: Response, next: NextFunction) => {
  console.log('asd', err)
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, 'status'))
}
