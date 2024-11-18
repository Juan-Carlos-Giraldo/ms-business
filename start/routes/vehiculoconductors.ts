import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehiculoConductors", "vehiculoConductorsController.find");
    Route.get("/vehiculoConductors/:id", "vehiculoConductorsController.find"); 
    Route.post("/vehiculoConductors", "vehiculoConductorsController.create");
    Route.put("/vehiculoConductors/:id", "vehiculoConductorsController.update");
    Route.delete("/vehiculoConductors/:id", "vehiculoConductorsController.delete");
}).middleware(['security'])