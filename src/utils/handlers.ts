import { Request, Response, NextFunction, RequestHandler } from 'express'

export const wrapAsync = (fn: RequestHandler) => {
  //  Promise.resolve(fn(req, res, next)).catch(next)
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(213)
      await fn(req, res, next)
    } catch (err) {
      console.log(213123)
      next(err)
    }
  }
}
