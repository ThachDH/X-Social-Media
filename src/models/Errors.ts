import { USERS_MESSAGES } from '../constants/messages'
import HTTP_STATUS from '../constants/httpStatus'

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

type ErrorType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
> // {[key: string]: {msg: string, location: string, value: any}}
export class EntityError extends ErrorWithStatus {
  errors: ErrorType
  constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
