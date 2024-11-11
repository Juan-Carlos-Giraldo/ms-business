import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Cuota from "App/Models/Cuota";
import CuotaValidator from "App/Validators/CuotaValidator";

export default class CuotasController {
    //Params son los parametros que vienen en la URL
    public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theCuota: Cuota = await Cuota.findOrFail(params.id)
            return theCuota;
        //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cuota.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await Cuota.query()
            }

        }

    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(CuotaValidator);
        const body = request.body();
        const theCuota: Cuota = await Cuota.create(body);
        return theCuota;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCuota: Cuota = await Cuota.findOrFail(params.id);
        const body = request.body();
        theCuota.numero = body.numero
        theCuota.fechaVencimiento = body.fechaVencimiento
        theCuota.monto = body.monto
        theCuota.estado = body.estado
        return await theCuota.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCuota: Cuota = await Cuota.findOrFail(params.id);
            response.status(204);
            return await theCuota.delete();
    }
}
