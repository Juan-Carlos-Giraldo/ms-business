import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/administradors", "AdministradoresController.find");
    Route.get("/administradors/:id", "AdministradoresController.find"); 
    Route.post("/administradors", "AdministradoresController.create");
    Route.put("/administradors/:id", "AdministradoresController.update");
    Route.delete("/administradors/:id", "AdministradoresController.delete");
}).middleware(['security'])