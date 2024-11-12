import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get('/', 'ClientesController.index')
    Route.post('/', 'ClientesController.store')
    Route.get('/:id', 'ClientesController.show')
    Route.put('/:id', 'ClientesController.update')
    Route.delete('/:id', 'ClientesController.destroy')
}).prefix('/clientes')