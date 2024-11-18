import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'RutasController.find')
    Route.post('/', 'RutasController.create')
    Route.get('/:id', 'RutasController.find')
    Route.put('/:id', 'RutasController.update')
    Route.delete('/:id', 'RutasController.delete')
}).prefix('/rutas').middleware('security');