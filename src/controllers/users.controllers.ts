import { Request, Response } from 'express'
import User from '../models/schemas/User.schema'
import databaseServices from '../services/database.services'
import usersService from '../services/users.service'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  const { email, pass } = req.body
  if (email === 'hoducthach123' && pass === '123') {
    res.status(200).json({
      mesage: 'login sucess'
    })
  }
  res.status(400).json({
    error: 'login faild'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const results = await usersService.register(req.body)
    res.status(400).json({
      error: 'register success',
      data: results
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: 'register faild',
      err
    })
  }
}
