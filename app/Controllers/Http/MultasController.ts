import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Multa from 'App/Models/Multa'
import { Exception } from '@adonisjs/core/build/standalone';
import axios from 'axios'
import MultaValidator from 'App/Validators/MultaValidator';

export default class MultasController {
    public async find({ request, params }: HttpContextContract) {
        let multa;
    
        try {
          // Si hay un ID en los parámetros, busca esa multa específica
          if (params.id) {
            multa = await Multa.findOrFail(params.id); // Busca la multa por ID
            await multa.load('conductor'); // Carga la relación con el conductor
            return multa;
          } else {
            // Si no hay un ID, verifica si hay paginación
            const data = request.all();
            if ('page' in data && 'per_page' in data) {
              const page = request.input('page', 1);
              const perPage = request.input('per_page', 20);
              return await Multa.query().preload('conductor').paginate(page, perPage); // Pagina y carga la relación
            } else {
              // Si no hay paginación, devuelve todas las multas
              return await Multa.query().preload('conductor'); // Carga todas las multas con la relación conductor
            }
          }
        } catch (error) {
          // Manejo de errores
          throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
        }
      }

       // Método para crear una Multa
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos usando el MultaValidator
      const payload = await request.validate(MultaValidator)
      
      // Crear la multa con los datos validados
      const multa = await Multa.create(payload)
      
      // Emitir un evento para enviar un correo al dueño del vehículo
     
      
      return multa
    } catch (error) {
      // Si el error es de validación, devolver los mensajes legibles
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors })
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }
  }

  // Método para actualizar una Multa
  public async update({ params, request, response }: HttpContextContract) {
    let payload

    try {
      // Validar los datos con MultaValidator
      payload = await request.validate(MultaValidator)
    } catch (error) {
      // Si el error es de validación, devolver mensajes legibles
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors })
      }
      // Para otros errores, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500)
    }

    // Buscar la multa por ID y actualizarla
    const multa = await Multa.findOrFail(params.id)
    multa.merge(payload)

    return await multa.save()
  }

  // Método para eliminar una Multa
  public async delete({ params, response }: HttpContextContract) {
    // Buscar la multa por ID y eliminarla
    const multa = await Multa.findOrFail(params.id)
    response.status(204)
    return await multa.delete()
  }
}
