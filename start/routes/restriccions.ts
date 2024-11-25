import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/restriccions", "RestriccionsController.find");
    Route.get("/restriccions/:id", "RestriccionsController.find");
    Route.post("/restriccions", "RestriccionsController.create");
    Route.put("/restriccions/:id", "RestriccionsController.update");
    Route.delete("/restriccions/:id", "RestriccionsController.delete");
}).middleware('security');