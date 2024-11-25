/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import './routes/departamentos'
import './routes/municipios'
import './routes/categorias'
import './routes/productos'
import './routes/categoriaproductos'
import './routes/direccions'
import './routes/centrodistribucions'
import './routes/lotes'
import './routes/vehiculos'
import './routes/operacions'
import './routes/contratoes'
import './routes/cuotas'
import './routes/rutas'
import './routes/clientes'
import './routes/facturas'
import './routes/vehiculoconductors'
import './routes/conductors'
import './routes/administradors'
import './routes/duenovehiculos'
import './routes/duenos'
import './routes/hotels'
import './routes/servicios'
import './routes/restaurantes'
import './routes/gastos'
import './routes/turnos'
import './routes/usuarios'
import './routes/empresas'
import './routes/personasNaturales'
import './routes/dirListaOrdendes'
import "./routes/seguros"
import "./routes/restriccions"

