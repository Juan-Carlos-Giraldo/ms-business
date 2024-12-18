import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { processCliArgs } from '@japa/runner'

export default class Security {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    await next()
    return
    let theRequest = request.toJSON()
    if (theRequest.headers.authorization) {
      let token = theRequest.headers.authorization.replace("Bearer ", "")
      let thePermission: object = {
        url: theRequest.url,
        method: theRequest.method
      }
      try {
        const result = await axios.post(`${Env.get('MS_SECURITY')}/api/public/security/permissions-validation`, thePermission,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (result.data == true) {
          await next()
        } else {
          return response.status(401)
        }
      } catch (error) {
        return response.status(401)
      }
    } else {
      return response.status(401)
    }
  }
}
