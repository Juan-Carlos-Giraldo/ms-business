import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { processCliArgs } from '@japa/runner'

export default class Security {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    await next()
    console.log("Llego una peticion: [" + request.method() + "]" + request.url())
    console.log("Body: " + JSON.stringify(request.body()))
    return
    console.log("Middleware de seguridad")
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
        console.log("La respuesta de ms-security >" + result.data + "<")
        if (result.data == true) {
          console.log(result.data)
          await next()
        } else {
          console.log("no puede ingresar")
          return response.status(401)
        }
      } catch (error) {
        console.error(error)
        return response.status(401)
      }
    } else {
      return response.status(401)
    }
  }
}
