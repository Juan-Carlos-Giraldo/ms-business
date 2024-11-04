import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Departamento from "App/Models/Departamento";
import DepartamentoValidator from "App/Validators/DepartamentoValidator";

export default class DepartamentosController {
    //Params son los parametros que vienen en la URL
    public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theDepartamento: Departamento = await Departamento.findOrFail(params.id)
            return theDepartamento;
        //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Departamento.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await Departamento.query()
            }

        }

    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(DepartamentoValidator);
        const body = request.body();
        const theDepartamento: Departamento = await Departamento.create(body);
        return theDepartamento;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDepartamento: Departamento = await Departamento.findOrFail(params.id);
        const body = request.body();
        theDepartamento.name = body.name
        theDepartamento.description = body.descripction
        return await theDepartamento.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDepartamento: Departamento = await Departamento.findOrFail(params.id);
            response.status(204);
            return await theDepartamento.delete();
    }
}



