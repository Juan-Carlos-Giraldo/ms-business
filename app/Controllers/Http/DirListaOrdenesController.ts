import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DirListaOrden from 'App/Models/DirListaOrden';
import { Exception } from '@adonisjs/core/build/standalone';
import DirListaOrdenValidator from 'App/Validators/DirListaOrdenValidator'; // Importar el validador

export default class DirListaOrdenesController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    //Entonces si viene un id en los parametros, busco el teatro con ese id
    if (params.id) {
      let theDirListaOrden: DirListaOrden = await DirListaOrden.findOrFail(params.id)
      return theDirListaOrden;
      //Sino, se buscan todos los teatros
    } else {
      const data = request.all()
      //Para no mandar todos los registros de una, se maneja la paginacion
      if ("page" in data && "per_page" in data) {
        //Si lo mandan, coja el atributo, sino asuma lo de la derecha
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await DirListaOrden.query().paginate(page, perPage)
      } else {
        //Devuelve la lista de todos los teatros
        return await DirListaOrden.query()
      }

    }

  }

  // Método para crear un DirListaOrden
  public async create({ request }: HttpContextContract) {
    await request.validate(DirListaOrdenValidator);
    const body = request.body();
    const theDirListaOrden: DirListaOrden = await DirListaOrden.create(body);
    return theDirListaOrden;
  }

  // Método para actualizar un DirListaOrden
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con DirListaOrdenValidator
      payload = await request.validate(DirListaOrdenValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener el DirListaOrden y actualizar los datos
    const theDirListaOrden = await DirListaOrden.findOrFail(params.id);
    theDirListaOrden.orden = payload.orden;
    theDirListaOrden.descripcion = payload.descripcion;
    theDirListaOrden.ruta_id = payload.ruta_id;
    theDirListaOrden.direccion_id = payload.direccion_id;


    return await theDirListaOrden.save();
  }

  // Método para eliminar un DirListaOrden
  public async delete({ params, response }: HttpContextContract) {
    const theDirListaOrden = await DirListaOrden.findOrFail(params.id);
    response.status(204);
    return await theDirListaOrden.delete();
  }
}
