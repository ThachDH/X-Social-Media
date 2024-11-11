import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
  const { email, pass } = req.body
  if (email === 'hoducthach123' && pass === '123') {
    res.status(200).json({
      mesage: 'login faild'
    })
  }
  res.status(400).json({
    error: 'login faild'
  })
}
