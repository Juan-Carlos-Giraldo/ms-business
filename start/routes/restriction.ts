import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/restriction", "RestrictionsController.find");
    Route.get("/restriction/:id", "RestrictionsController.find");
    Route.post("/restriction", "RestrictionsController.create");
    Route.put("/restriction/:id", "RestrictionsController.update");
    Route.delete("/restriction/:id", "RestrictionsController.delete");
}).middleware(['security'])