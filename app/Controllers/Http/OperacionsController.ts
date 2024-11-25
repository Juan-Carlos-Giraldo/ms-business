import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operacion from 'App/Models/Operacion';
import OperacionValidator from 'App/Validators/OperacionValidator';

export default class OperacionsController {
    //Params son los parametros que vienen en la URL
    theDueno = null;

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOperacion: Operacion = await Operacion.findOrFail(params.id)
            await theOperacion.load('vehiculo' , queryVehiculo => {
                queryVehiculo.preload('duenosVehiculos', queryDuenosVehiculos => {
                    queryDuenosVehiculos.preload('dueno')
                    //mandar correo a este dueño
                })
            }
            )
            await theOperacion.load('municipio' , queryMunicipio => {
                queryMunicipio.preload('restriccions')
            })
            return theOperacion;

        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Operacion.query().paginate(page, perPage)
            } else {
                return await Operacion.query()
            }
        }
    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(OperacionValidator);
        const body = request.body();
        const theOperacion: Operacion = await Operacion.create(body);
        return theOperacion;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOperacion: Operacion = await Operacion.findOrFail(params.id);
        const body = request.body();
        theOperacion.date_start = body.date_start;
        theOperacion.date_end = body.date_end;
        theOperacion.vehiculo_id = body.vehiculo_id;
        theOperacion.municipio_id = body.municipio_id;
        return await theOperacion.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOperacion: Operacion = await Operacion.findOrFail(params.id);
            response.status(204);
            return await theOperacion.delete();
    }
}
