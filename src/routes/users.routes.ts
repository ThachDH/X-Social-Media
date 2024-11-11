import express, { Request, Response } from 'express'
import { loginController } from 'src/controllers/users.controllers'

const usersRouter = express.Router()

// Attach the controller to the router
usersRouter.post('/login', loginController)

export default usersRouter
