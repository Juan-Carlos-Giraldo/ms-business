import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario';
import UsuarioValidator from 'App/Validators/UsuarioValidator';

export default class UsuariosController {
    //Params son los parametros que vienen en la URL
    public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theUsuario: Usuario = await Usuario.findOrFail(params.id)
            return theUsuario;
            //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Usuario.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await Usuario.query()
            }

        }

    }

    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(UsuarioValidator);
        const body = request.body();
        const theUsuario: Usuario = await Usuario.create(body);
        return theUsuario;
    }

    public async update({ params, request }: HttpContextContract) {
        const theUsuario: Usuario = await Usuario.findOrFail(params.id);
        const body = request.body();
        theUsuario.securityId = body.securityId;
        theUsuario.username = body.username;
        return await theUsuario.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theUsuario: Usuario = await Usuario.findOrFail(params.id);
        response.status(204);
        return await theUsuario.delete();
    }
}
