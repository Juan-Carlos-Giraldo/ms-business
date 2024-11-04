import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producto from 'App/Models/Producto';
import ProductoValidator from 'App/Validators/ProductoValidator';

export default class ProductosController {
    //Params son los parametros que vienen en la URL
    public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theProducto: Producto = await Producto.findOrFail(params.id)
            return theProducto;
        //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Producto.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await Producto.query()
            }

        }

    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(ProductoValidator);
        const body = request.body();
        const theProducto: Producto = await Producto.create(body);
        return theProducto;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProducto: Producto = await Producto.findOrFail(params.id);
        const body = request.body();
        theProducto.name = body.name
        theProducto.description = body.descripction
        theProducto.price = body.price
        theProducto.stock = body.stock
        return await theProducto.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProducto: Producto = await Producto.findOrFail(params.id);
            response.status(204);
            return await theProducto.delete();
    }
}
