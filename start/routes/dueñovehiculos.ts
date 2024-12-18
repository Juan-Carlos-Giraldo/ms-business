import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/duenoVehiculos", "DueOVehiculosController.find");
    Route.get("/duenoVehiculos/:id", "DueOVehiculosController.find");
    Route.post("/duenoVehiculos", "DueOVehiculosController.create");
    Route.put("/duenoVehiculos/:id", "DueOVehiculosController.update");
    Route.delete("/duenoVehiculos/:id", "DueOVehiculosController.delete");
}).middleware(['security'])