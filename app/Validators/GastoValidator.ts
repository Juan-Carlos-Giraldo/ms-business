import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GastoValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    detalles:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    })]),
    dueno_id: schema.number([
      rules.exists({ table: 'duenos', column: 'id' })
    ]),
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' })
    ]),
    servicio_id: schema.number([
      rules.exists({ table: 'servicios', column: 'id' })
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
