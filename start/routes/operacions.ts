import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/operacions", "OperacionsController.find");
    Route.get("/operacions/:id", "OperacionsController.find");
    Route.post("/operacions", "OperacionsController.create");
    Route.put("/operacions/:id", "OperacionsController.update");
    Route.delete("/operacions/:id", "OperacionsController.delete");
}).middleware('security');