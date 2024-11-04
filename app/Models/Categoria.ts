import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CategoriaProducto from './CategoriaProducto'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public parent_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //RELACIONES

  //Relacion de tiene muchos... CategoriaProducto
  @hasMany(() => CategoriaProducto, {
    foreignKey: 'categoria_id'
  })
  public categoriaproductos: HasMany<typeof CategoriaProducto>
}
