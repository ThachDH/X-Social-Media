import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import usersService from '../services/users.service'
import { ErrorWithStatus } from '../models/Errors'
import { USERS_MESSAGES } from '../constants/messages'
import databaseServices from '../services/database.services'

export const loginValidator = validate(
  checkSchema({
    email: {
      isEmail: {
        errorMessage: 'Invalid email'
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const user = await databaseServices.users.findOne({ email: value })
          if (user === null) {
            throw new Error(`Không tồn tại email ${value}`)
          }
          req.user = user;
          return true
        }
      }
    },
    password: {
      notEmpty: {
        errorMessage: 'Password is required'
      },
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
    }
  })
)

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
      },
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
          const isExistEmail = await usersService.checkEmailExists(value)
          if (isExistEmail) {
            throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS)
          }
          return true
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
