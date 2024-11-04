import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CentroDistribucion from 'App/Models/CentroDistribucion';
import CentroDistribucionValidator from 'App/Validators/CentroDistribucionValidator';

export default class CentroDistribucionsController {
     //Params son los parametros que vienen en la URL
     public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theCentroDistribucion: CentroDistribucion = await CentroDistribucion.findOrFail(params.id)
            return theCentroDistribucion;
        //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await CentroDistribucion.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await CentroDistribucion.query()
            }

        }

    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(CentroDistribucionValidator);
        const body = request.body();
        const theCentroDistribucion: CentroDistribucion = await CentroDistribucion.create(body);
        return theCentroDistribucion;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCentroDistribucion: CentroDistribucion = await CentroDistribucion.findOrFail(params.id);
        const body = request.body();
        theCentroDistribucion.name = body.name
        theCentroDistribucion.capacity = body.capacity
        theCentroDistribucion.municipio_id = body.municipio_id
        theCentroDistribucion.direccion_id = body.direccion_id
        return await theCentroDistribucion.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCentroDistribucion: CentroDistribucion = await CentroDistribucion.findOrFail(params.id);
            response.status(204);
            return await theCentroDistribucion.delete();
    }
}
