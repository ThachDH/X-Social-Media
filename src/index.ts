import express from 'express'
import usesRouter from './routes/users.routes'
import databaseServices from './services/database.services'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', usesRouter)
databaseServices.connect().catch(console.dir)

app.listen(2025, () => {
  console.log('running port 2025')
})
