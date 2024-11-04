import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria';
import CategoriaValidator from 'App/Validators/CategoriaValidator';

export default class CategoriasController {
        //Params son los parametros que vienen en la URL
        public async find({ request, params }: HttpContextContract) {
            //Entonces si viene un id en los parametros, busco el teatro con ese id
            if (params.id) {
                let theCategoria: Categoria = await Categoria.findOrFail(params.id)
                return theCategoria;
            //Sino, se buscan todos los teatros
            } else {
                const data = request.all()
                //Para no mandar todos los registros de una, se maneja la paginacion
                if ("page" in data && "per_page" in data) {
                    //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                    const page = request.input('page', 1);
                    const perPage = request.input("per_page", 20);
                    return await Categoria.query().paginate(page, perPage)
                } else {
                    //Devuelve la lista de todos los teatros
                    return await Categoria.query()
                }
    
            }
    
        }
        
        //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
        public async create({ request }: HttpContextContract) {
            await request.validate(CategoriaValidator);
            const body = request.body();
            const theCategoria: Categoria = await Categoria.create(body);
            return theCategoria;
        }
    
        public async update({ params, request }: HttpContextContract) {
            const theCategoria: Categoria = await Categoria.findOrFail(params.id);
            const body = request.body();
            theCategoria.name = body.name
            theCategoria.description = body.descripction
            theCategoria.parent_id = body.parent_id
            return await theCategoria.save();
        }
    
        public async delete({ params, response }: HttpContextContract) {
            const theCategoria: Categoria = await Categoria.findOrFail(params.id);
                response.status(204);
                return await theCategoria.delete();
        }
}
