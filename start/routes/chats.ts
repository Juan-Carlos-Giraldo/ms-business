import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'ChatsController.find')
    Route.post('/', 'ChatsController.create')
    Route.get('/:id', 'ChatsController.find')
    Route.get('/user/:id/email/:emailTo', 'ChatsController.findByUser')
    Route.put('/:id', 'ChatsController.update')
    Route.delete('/:id', 'ChatsController.delete')
}).prefix('/chats').middleware('security')