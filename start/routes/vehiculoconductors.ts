import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehiculoConductores", "VehiculoConductorsController.find");
    Route.get("/vehiculoConductores/:id", "VehiculoConductorsController.find");
    Route.post("/vehiculoConductores", "VehiculoConductorsController.create");
    Route.put("/vehiculoConductores/:id", "VehiculoConductorsController.update");
    Route.delete("/vehiculoConductores/:id", "VehiculoConductorsController.delete");
}).middleware(['security'])