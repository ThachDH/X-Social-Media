import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import usersService from '../services/users.service'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, pass } = req.body
  if (!email || !pass) {
    res.status(400).json({
      error: 'Missing email or passord'
    })
  }
  next()
}

export const registerValidator = validate(
  checkSchema({
    name: {
      errorMessage: 'Name is required',
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          max: 10,
          min: 3
        }
      },
      trim: true
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const temp = await usersService.checkEmailExists(value)
          if (temp) {
            throw new Error('Email already exists')
          }
          return temp
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }
      }
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
          }
          return true
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
