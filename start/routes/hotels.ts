import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/hotels", "HotelesController.find");
    Route.get("/hotels/:id", "HotelesController.find"); 
    Route.post("/hotels", "HotelesController.create");
    Route.put("/hotels/:id", "HotelesController.update");
    Route.delete("/hotels/:id", "HotelesController.delete");
}).middleware(['security'])