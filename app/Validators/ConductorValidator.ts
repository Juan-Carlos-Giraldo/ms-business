import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConductorValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    telefono: schema.string([
      rules.regex(/^[0-9-]+$/) // Solo permite números y guiones
    ]),
    numero_licencia: schema.string([
      rules.regex(/^[0-9-]+$/) // Solo permite números y guiones
    ]),
    fecha_nacimiento: schema.date({
      format: 'yyyy-MM-dd'
    }),
    fecha_vencimiento_licencia: schema.date({
      format: 'yyyy-MM-dd'
    }),
    usuario_id: schema.string([
      rules.exists({ table: 'usuarios', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'telefono.required': 'El campo telefono es obligatorio',
    'telefono.regex': 'El campo telefono solo acepta numeros y guiones',
    'numero_licencia.required': 'El campo numeroLicencia es obligatorio',
    'numero_licencia.regex': 'El campo numeroLicencia solo acepta numeros',
    'fecha_nacimiento.date.format': 'La fechaNacimiento debe estar en formato yyyy-MM-dd',
    'fecha_vencimiento_licencia.date.format': 'La fechaVencimientoLicencia debe estar en formato yyyy-MM-dd',
    'usuario_id': 'El cmapo usuario es obligatorio'
  }
}
