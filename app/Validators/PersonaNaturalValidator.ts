import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PersonaNaturalValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    identificacion: schema.string([
      rules.regex(/^[0-9]+$/), // Solo permite dígitos del 0 al 9
      rules.required()
    ]),
    tipo_documento: schema.string([
      rules.required()
    ]),
    fecha_nacimiento: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    empresa_id: schema.number.optional([
      rules.exists({ table: 'empresas', column: 'id' })
    ])
  })


  public messages: CustomMessages = {
    'identificacion.regex': 'El campo identificacion solo acepta numeros',
    'identificacion.required': 'El campo identificacion es obligatorio',
    'tipo_docuento.enum': 'El tipo de documento debe ser uno de los siguientes: Cedula, Pasaporte, Cedula Extranjera',
    'tipo_documento.required': 'El campo tipoDocumento es obligatorio',
    'fecha_nacimiento.date.format': 'El campo fechaNacimiento debe estar en formato yyyy-MM-dd',
    'fecha_nacimiento.required': 'El campo fechaNacimiento es obligatorio'
  }
}
