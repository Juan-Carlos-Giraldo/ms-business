import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lote from 'App/Models/Lote';
import LoteValidator from 'App/Validators/LoteValidator';

export default class LotesController {
    //Params son los parametros que vienen en la URL
    public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theLote: Lote = await Lote.findOrFail(params.id)
            return theLote;
            //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Lote.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await Lote.query()
            }

        }

    }

    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(LoteValidator);
        const body = request.body();
        const theLote: Lote = await Lote.create(body);
        return theLote;
    }

    public async update({ params, request }: HttpContextContract) {
        const theLote: Lote = await Lote.findOrFail(params.id);
        const body = request.body();
        theLote.peso = body.peso;
        return await theLote.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theLote: Lote = await Lote.findOrFail(params.id);
        response.status(204);
        return await theLote.delete();
    }
}
