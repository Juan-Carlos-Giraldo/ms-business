import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Contrato extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public dias: number

  @column()
  public cantidad: number

  @column()
  public precio_total: number

  @column()
  public estado: string

  // Relaciones

  // Relacion de tiene muchos... Ruta
  // @hasMany(() => Ruta, {
  //   foreignKey: 'ruta_id'
  // })
  // public rutas: HasMany<typeof Ruta>

  // Relacion de le pertenece a... Cliente
  // @belongsTo(() => Cliente, {
  //   foreignKey: 'cliente_id'
  // })
  // public cliente: BelongsTo<typeof Cliente>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
