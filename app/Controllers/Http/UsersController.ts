import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  // register controller
  public async store({ request, response }: HttpContextContract) {
    const input = request.only(['email', 'password'])
    try {
      const users = await User.create(input)

      return response.status(200).json({
        status: 'success',
        data: users,
      })
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        data: error,
      })
    }
  }

  // login controller
  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const token = await auth.use('api').attempt(email, password)
      return response.status(200).json({
        status: 'success',
        data: token,
      })
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        data: error,
      })
    }
  }

  // get user data based on logged user
  public async me({ auth, response }: HttpContextContract) {
    try {
      if (auth.use('api').isLoggedIn) {
        return response.status(200).json({
          status: 'success',
          data: auth.user,
        })
      } else {
        return response.status(401).json({
          status: 'error',
          data: 'Authentication Failed',
        })
      }
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        data: error,
      })
    }
  }
}
