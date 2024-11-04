import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio';
import MunicipioValidator from 'App/Validators/MunicipioValidator';

export default class MunicipiosController {
    //Params son los parametros que vienen en la URL
    public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theMunicipio: Municipio = await Municipio.findOrFail(params.id)
            return theMunicipio;
        //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Municipio.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await Municipio.query()
            }

        }

    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(MunicipioValidator);
        const body = request.body();
        const theMunicipio: Municipio = await Municipio.create(body);
        return theMunicipio;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
        const body = request.body();
        theMunicipio.name = body.name
        theMunicipio.departamento_id = body.departamento_id
        theMunicipio.zip_code = body.zip_code
        return await theMunicipio.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
            response.status(204);
            return await theMunicipio.delete();
    }
}
