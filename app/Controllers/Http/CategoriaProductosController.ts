import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoriaProducto from 'App/Models/CategoriaProducto';
import CategoriaProductoValidator from 'App/Validators/CategoriaProductoValidator';

export default class CategoriaProductoProductosController {
     //Params son los parametros que vienen en la URL
     public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(params.id)
            return theCategoriaProducto;
        //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await CategoriaProducto.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await CategoriaProducto.query()
            }
        }
    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(CategoriaProductoValidator);
        const body = request.body();
        const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.create(body);
        return theCategoriaProducto;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(params.id);
        const body = request.body();
        theCategoriaProducto.categoria_id = body.categoria_id
        theCategoriaProducto.producto_id = body.producto_id
        return await theCategoriaProducto.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(params.id);
            response.status(204);
            return await theCategoriaProducto.delete();
    }
}
