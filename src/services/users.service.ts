import User from '../models/schemas/User.schema'
import databaseServices from './database.services'

class UsersService {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload
    const results = await databaseServices.users.insertOne(new User({ email, password }))
    return results
  }

  async checkEmailExists(email: string) {
    const users = await databaseServices.users.findOne({ email })
    return Boolean(users);
  }
}

const usersService = new UsersService()
export default usersService
