import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get('/', 'ClientesController.find')
    Route.post('/', 'ClientesController.create')
    Route.get('/:id', 'ClientesController.find')
    Route.put('/:id', 'ClientesController.update')
    Route.delete('/:id', 'ClientesController.delete')
}).prefix('/clientes').middleware('security');