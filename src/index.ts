import express, { NextFunction, Request, Response } from 'express'
import usesRouter from './routes/users.routes'
import databaseServices from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', usesRouter)
databaseServices.connect().catch(console.dir)

app.use(defaultErrorHandler)

app.listen(2025, () => {
  console.log('running port 2025')
})
