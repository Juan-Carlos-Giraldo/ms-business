import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'MessagesController.find')
    Route.post('/', 'MessagesController.create')
    Route.get('/:id', 'MessagesController.find')
    Route.put('/:id', 'MessagesController.update')
    Route.delete('/:id', 'MessagesController.delete')
    Route.get('/viewed/:id', 'MessagesController.viewed')
}).prefix('/messages').middleware('security')