import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/dueñoVehiculos", "DueOVehiculosController.find");
    Route.get("/dueñoVehiculos/:id", "DueOVehiculosController.find"); 
    Route.post("/dueñoVehiculos", "DueOVehiculosController.create");
    Route.put("/dueñoVehiculos/:id", "DueOVehiculosController.update");
    Route.delete("/dueñoVehiculos/:id", "DueOVehiculosController.delete");
}).middleware(['security'])