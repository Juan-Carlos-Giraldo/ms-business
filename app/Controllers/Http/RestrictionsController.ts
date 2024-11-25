import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DueO from 'App/Models/DueO';
import Municipio from 'App/Models/Municipio';
import Restriction from 'App/Models/Restriction';
import RestrictionValidator from 'App/Validators/RestrictionValidator';
import Vehiculo from 'App/Models/Vehiculo';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'

export default class RestrictionsController {
    public async create({ request }: HttpContextContract) {
        await request.validate(RestrictionValidator);
        const body = request.body();
        const theRestriction: Restriction = await Restriction.create(body);

        if (body.municipio_id) {
            const theMunicipio = await Municipio.findOrFail(body.municipio_id)
            await theMunicipio.load('operacions')
            let duenos: any
            theMunicipio.operacions.forEach(operation => {
                duenos.add(this.findDueno(operation.vehiculo_id))
            });
            if (duenos) {
                duenos.array.forEach(dueno => {
                    this.notify(dueno)
                });
            } else {
                this.noduenos()
            }
        }
        return theRestriction;
    }

    public async findDueno(vehiculo_id: number,) {
        let theVehiculo = await Vehiculo.findOrFail(vehiculo_id)
        await theVehiculo.load('duenosVehiculos')
        let duenos: any
        theVehiculo.duenosVehiculos.forEach(duenoVehiculo => {
            duenos.add(this.findDuenoAuxiliar(duenoVehiculo.dueno_id))
        });
    }

    public async findDuenoAuxiliar(dueno_id: number) {
        return await DueO.findOrFail(dueno_id)
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRestriction: Restriction = await Restriction.findOrFail(params.id);
        response.status(204);
        return await theRestriction.delete();
    }

    public async notify(who: DueO) {
        try {
            let theEmail = {}
            theEmail['subject'] = 'Factura Notification';
            theEmail['recipients'] = [
                {
                    "name": who.usuario_id,
                    "email": "juan.giraldo43633@ucaldas.edu.co"
                }
            ];
            const result = await axios.post(`${Env.get('MS_NOTIFICATION')}/sendFactura`, theEmail)
            return await result.data;
        } catch (error) {
            return;
        }
    }

    public async noduenos() {
        try {
            let theEmail = {}
            theEmail['subject'] = 'Factura Notification';
            theEmail['recipients'] = [
                {
                    "name": "No dueños resgistrados para la restriccion",
                    "email": "juan.giraldo43633@ucaldas.edu.co"
                }
            ];
            const result = await axios.post(`${Env.get('MS_NOTIFICATION')}/sendFactura`, theEmail)
            return await result.data;
        } catch (error) {
            return;
        }
    }
}
