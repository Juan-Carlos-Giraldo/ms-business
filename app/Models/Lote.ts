import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Producto from './Producto'

export default class Lote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public peso: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //RELACIONES

  //Relacion uno a muchos con la tabla de Producto
  @hasMany(() => Producto, {
  //Nombre de la clave foranea que permita la relacion
  foreignKey: 'departamento_id'
  })
  public productos: HasMany<typeof Producto>
}
