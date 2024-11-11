import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Contrato from "App/Models/Contrato";
import ContratoValidator from "App/Validators/ContratoValidator";

export default class ContratoesController {
    //Params son los parametros que vienen en la URL
    public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theContrato: Contrato = await Contrato.findOrFail(params.id)
            return theContrato;
        //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Contrato.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await Contrato.query()
            }

        }

    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(ContratoValidator);
        const body = request.body();
        const theContrato: Contrato = await Contrato.create(body);
        return theContrato;
    }

    public async update({ params, request }: HttpContextContract) {
        const theContrato: Contrato = await Contrato.findOrFail(params.id);
        const body = request.body();
        theContrato.dias = body.dias
        theContrato.cantidad = body.cantidad
        theContrato.precio_total = body.precio_total
        theContrato.estado = body.estado
        return await theContrato.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theContrato: Contrato = await Contrato.findOrFail(params.id);
            response.status(204);
            return await theContrato.delete();
    }
}
