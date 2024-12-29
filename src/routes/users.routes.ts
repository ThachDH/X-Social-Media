import express, { Request, Response } from 'express'
// import { loginController } from 'src/controllers/users.controllers'
import { loginController, registerController } from '../controllers/users.controllers'
import { registerValidator } from '../middlewares/users.middlewares'

const usersRouter = express.Router()

// Attach the controller to the router
usersRouter.post('/login', loginController)

// Description. Register a new user
// Path /register
// Method: POST
// Body: {name: string, email: string, password: string, confirm_password: string, date_of_birth: ISOString}
usersRouter.post('/register', registerValidator, registerController)

export default usersRouter
