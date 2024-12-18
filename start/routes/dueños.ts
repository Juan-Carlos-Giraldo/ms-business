import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/duenos", "DueOsController.find");
    Route.get("/duenos/:id", "DueOsController.find");
    Route.post("/duenos", "DueOsController.create");
    Route.put("/duenos/:id", "DueOsController.update");
    Route.delete("/duenos/:id", "DueOsController.delete");
}).middleware(['security'])