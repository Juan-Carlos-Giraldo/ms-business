import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Ruta from './Ruta'
import Cuota from './Cuota'

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
  @hasMany(() => Ruta, {
    foreignKey: 'contrato_id'
  })
  public rutas: HasMany<typeof Ruta>

  // Relacion de le pertenece a... Cliente
  // @belongsTo(() => Cliente, {
  //   foreignKey: 'cliente_id'
  // })
  // public cliente: BelongsTo<typeof Cliente>

  // Relacion de tiene muchos... Cuota
  @hasMany(() => Cuota, {
    foreignKey: 'contrato_id'
  })
  public cuotas: HasMany<typeof Cuota>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
