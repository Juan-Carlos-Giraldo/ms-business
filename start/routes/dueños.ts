import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/dueños", "DueOsController.find");
    Route.get("/dueños/:id", "DueOsController.find"); 
    Route.post("/dueños", "DueOsController.create");
    Route.put("/dueños/:id", "DueOsController.update");
    Route.delete("/dueños/:id", "DueOsController.delete");
}).middleware(['security'])