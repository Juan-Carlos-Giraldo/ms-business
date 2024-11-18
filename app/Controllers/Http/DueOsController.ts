import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DueO from 'App/Models/DueO';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { Exception } from '@adonisjs/core/build/standalone';
import DueOValidator from 'App/Validators/DueOValidator';
export default class DueOsController {
    public async find({ request, params }: HttpContextContract) {
        let theDueno;
    
        try {
          if (params.id) {
            theDueno = await DueO.findOrFail(params.id);
            
    
            // Llamada al microservicio de usuarios
            const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${theDueno.usuario_id}`, {
              headers: { Authorization: request.headers().authorization || '' }
            });
    
            // Verificar si userResponse.data es null o está vacío
            if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
              throw new Exception('No se encontró información de usuario en el microservicio', 404);
            }
    
            // Combinar la respuesta con los datos del cliente
            return { cliente: theDueno, usuario: userResponse.data };
          } else {
            const data = request.all();
            if ("page" in data && "per_page" in data) {
              const page = request.input('page', 1);
              const perPage = request.input("per_page", 20);
              return await DueO.query().paginate(page, perPage);
            } else {
              return await DueO.query();
            }
          }
        } catch (error) {
          // Si hay un error, lanzar una excepción con un mensaje y código de estado
          throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
        }
      }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const payload = await request.validate(DueOValidator);

        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
            headers: { Authorization: request.headers().authorization || '' }
          });
          if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
            throw new Error('No se encontró información de usuario, verifique que el codigo sea correcto');
          }
        
          const fecha_nacimiento_date = payload.fecha_nacimiento.toJSDate();
          
      const theDueno = await DueO.create({
        ...payload,
        fecha_nacimiento: fecha_nacimiento_date,
        });

        return theDueno;
    }

    public async update({ params, request, response }: HttpContextContract) {
      let payload;

      try {
        // Validar los datos utilizando el ConductorValidator
        payload = await request.validate(DueOValidator);
        const body = request.body();
  
        const theDueno = await DueO.findOrFail(params.id);
  
        // Llamada al microservicio de usuarios para verificar el ID del usuario
        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
          headers: { Authorization: request.headers().authorization || '' }
        });
  
        // Verificar si no se encontró el usuario
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception('No se encontró información de usuario, verifique que el código sea correcto', 404);
        }
  
        const fechaNacimientoDate = payload.fecha_nacimiento.toJSDate();
        // Obtener el conductor y actualizar los datos
        theDueno.merge({
          usuario_id: body.usuario_id,
          fecha_nacimiento: fechaNacimientoDate,
          telefono: body.telefono,
          conductor_id: body.conductor_id
        });
  
        return await theDueno.save();
      } catch (error) {
        // Si el error es de validación, devolver los mensajes de error de forma legible
        if (error.messages) {
          return response.badRequest({ errors: error.messages.errors });
        }
        // Para cualquier otro tipo de error, lanzar una excepción genérica
        throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
      }
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDueno: DueO = await DueO.findOrFail(params.id);
            response.status(204);
            return await theDueno.delete();
    }
}
