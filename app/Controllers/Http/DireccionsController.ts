import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Direccion from 'App/Models/Direccion';
import DireccionValidator from 'App/Validators/DireccionValidator';

export default class DireccionsController {
       //Params son los parametros que vienen en la URL
       public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theDireccion: Direccion = await Direccion.findOrFail(params.id)
            return theDireccion;
        //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Direccion.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await Direccion.query()
            }

        }

    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(DireccionValidator);
        const body = request.body();
        const theDireccion: Direccion = await Direccion.create(body);
        return theDireccion;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDireccion: Direccion = await Direccion.findOrFail(params.id);
        const body = request.body();
        theDireccion.neighborhood = body.neighborhood
        theDireccion.address = body.name
        theDireccion.comentaries = body.comentaries
        theDireccion.municipio_id = body.municipio_id
        
        return await theDireccion.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDireccion: Direccion = await Direccion.findOrFail(params.id);
            response.status(204);
            return await theDireccion.delete();
    }
}
