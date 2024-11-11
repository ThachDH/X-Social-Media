import { NextFunction, Request, Response } from 'express'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, pass } = req.body
  if (!email || !pass) {
    res.status(400).json({
      error: 'Missing email or passord'
    })
  }
  next()
}
