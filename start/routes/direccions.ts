import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/direccions", "DireccionsController.find");
    Route.get("/direccions/:id", "DireccionsController.find");
    Route.post("/direccions", "DireccionsController.create");
    Route.put("/direccions/:id", "DireccionsController.update");
    Route.delete("/direccions/:id", "DireccionsController.delete");
})