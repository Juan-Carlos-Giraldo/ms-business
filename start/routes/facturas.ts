import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'FacturasController.find')
    Route.post('/', 'FacturasController.create')
    Route.get('/:id', 'FacturasController.find')
    Route.put('/:id', 'FacturasController.update')
    Route.delete('/:id', 'FacturasController.delete')
}).prefix('/facturas').middleware('security');