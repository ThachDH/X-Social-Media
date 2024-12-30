import { NextFunction, Request, Response } from 'express'
import User from '../models/schemas/User.schema'
import databaseServices from '../services/database.services'
import usersService from '../services/users.service'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  const user: any = {req}
  const {user_id} = user
  console.log('user_id', user_id)
  usersService.login(user_id.toString());
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await usersService.register(req.body)
    res.status(200).json({
      message: 'Register success',
      data: results
    })
  } catch (err) {
    console.log('registerControllerdd', err)
    next(err)
  }
}
