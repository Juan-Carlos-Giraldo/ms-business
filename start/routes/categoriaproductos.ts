import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/categoriaproductos", "CategoriaproductosController.find");
    Route.get("/categoriaproductos/:id", "CategoriaproductosController.find");
    Route.post("/categoriaproductos", "CategoriaproductosController.create");
    Route.put("/categoriaproductos/:id", "CategoriaproductosController.update");
    Route.delete("/categoriaproductos/:id", "CategoriaproductosController.delete");
})