import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Restriccion from "App/Models/Restriccion";
import RestriccionValidator from 'App/Validators/RestriccionValidator';

export default class RestriccionsController {
      //Params son los parametros que vienen en la URL
      public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theRestriccion: Restriccion = await Restriccion.findOrFail(params.id)
            return theRestriccion;
        //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Restriccion.query().paginate(page, perPage)
            } else {
                return await Restriccion.query()
            }

        }

    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(RestriccionValidator);
        const body = request.body();
        const theRestriccion: Restriccion = await Restriccion.create(body);
        return theRestriccion;
    }

    public async update({ params, request }: HttpContextContract) {
        const theRestriccion: Restriccion = await Restriccion.findOrFail(params.id);
        const body = request.body();
        theRestriccion.descripcion = body.descripcion
        theRestriccion.fecha_inicio = body.fecha_inicio
        theRestriccion.fecha_fin = body.fecha_fin

        return await theRestriccion.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRestriccion: Restriccion = await Restriccion.findOrFail(params.id);
            response.status(204);
            return await theRestriccion.delete();
    }
}
