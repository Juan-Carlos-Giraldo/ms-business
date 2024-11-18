import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/centroDistribucions", "CentroDistribucionsController.find");
    Route.get("/centroDistribucions/:id", "CentroDistribucionsController.find");
    Route.post("/centroDistribucions", "CentroDistribucionsController.create");
    Route.put("/centroDistribucions/:id", "CentroDistribucionsController.update");
    Route.delete("/centroDistribucions/:id", "CentroDistribucionsController.delete");
}).middleware('security');