import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'
import Producto from './Producto'

export default class CategoriaProducto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public categoria_id: number

  @column()
  public producto_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //RELACIONES

  //Relacion de le pertenece a... Categoria
  @belongsTo(() => Categoria, {
  //Nombre de la clave foranea que permita la relacion
    foreignKey: 'categoria_id'
  })
  public categoria: BelongsTo<typeof Categoria>


  //Relacion de le pertenece a... Producto
  @belongsTo(() => Producto, {
  //Nombre de la clave foranea que permita la relacion
    foreignKey: 'producto_id'
  })
  public producto: BelongsTo<typeof Producto>

}
