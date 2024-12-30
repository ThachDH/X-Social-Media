import { RegisterReqBody } from '~/models/requests/User.requests'
import User from '../models/schemas/User.schema'
import databaseServices from './database.services'
import { TokenType } from '../constants/enum'
import { signToken } from '../utils/jwt'
import { hashPassword } from '../utils/crypto'

class UsersService {
  private signAccessToken(user_id: string) {
    console.log('process.env.ACCESS_TOKEN_EXPIRES_IN', process.env.ACCESS_TOKEN_EXPIRES_IN)
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  async signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }

  async register(payload: RegisterReqBody) {
    // const results = await databaseServices.users.insertOne(
    //   new User({ ...payload, date_of_birth: new Date(payload.date_of_birth), password: (payload.password) })
    // )
    try {
      const results: any = await databaseServices.users.findOne({ email: '21dddd1@gmail.com' })
      console.log('results', results)
    } catch (err) {
      console.log('err', err)
    }

    // const user_id = results.insertedId.toString()
    // const [accesstoken, refreshtoken] = await this.signAccessAndRefreshToken(user_id)
    // return {
    //   accesstoken,
    //   refreshtoken
    // }
  }

  async checkEmailExists(email: string) {
    const users = await databaseServices.users.findOne({ email })
    return Boolean(users)
  }

  async login(user_id: string) {
    const [accesstoken, refreshtoken] = await this.signAccessAndRefreshToken(user_id)
    return {
      accesstoken,
      refreshtoken
    }
  }
}

const usersService = new UsersService()
export default usersService
