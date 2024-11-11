import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruta from 'App/Models/Ruta';
import RutaValidator from 'App/Validators/RutaValidator';

export default class RutasController {
    //Params son los parametros que vienen en la URL
    public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theRuta: Ruta = await Ruta.findOrFail(params.id)
            return theRuta;
        //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Ruta.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await Ruta.query()
            }

        }

    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(RutaValidator);
        const body = request.body();
        const theRuta: Ruta = await Ruta.create(body);
        return theRuta;
    }

    public async update({ params, request }: HttpContextContract) {
        const theRuta: Ruta = await Ruta.findOrFail(params.id);
        const body = request.body();
        theRuta.nombre = body.nombre;
        theRuta.origen = body.origen;
        theRuta.destino = body.destino;
        theRuta.distancia = body.distancia;
        return await theRuta.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRuta: Ruta = await Ruta.findOrFail(params.id);
            response.status(204);
            return await theRuta.delete();
    }
}
