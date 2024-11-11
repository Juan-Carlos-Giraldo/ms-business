import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/contratoes", "ContratoesController.find");
    Route.get("/contratoes/:id", "ContratoesController.find");
    Route.post("/contratoes", "ContratoesController.create");
    Route.put("/contratoes/:id", "ContratoesController.update");
    Route.delete("/contratoes/:id", "ContratoesController.delete");
})