import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MultaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    valor: schema.number([
      rules.range(1, 1000000), // Valor mínimo y máximo permitido
    ]),
    descripcion: schema.string({ trim: true }, [
      rules.maxLength(255), // Máximo de caracteres en la descripción
    ]),
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' }), rules.required() 
    ])
  })


  public messages: CustomMessages = {
    'conductor_id.required': 'El campo conductor_id es obligatorio',
    'conductor_id.exists': 'El conductor especificado no existe',
    'valor.required': 'El campo valor es obligatorio',
    'valor.range': 'El valor debe estar entre 1 y 1,000,000',
    'descripcion.required': 'La descripción es obligatoria',
    'descripcion.maxLength': 'La descripción no puede exceder 255 caracteres',
  }
}
