import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cuota from './Cuota'

export default class Factura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero: string

  @column()
  public fecha: Date

  @column()
  public total: string

  @column()
  public estado: string

  // Relaciones

  // Relacion de tiene uno... Cuota
  @hasOne(() => Cuota)
  public cuota: HasOne<typeof Cuota>

  // Relacion de tiene uno... Gasto
  // @hasOne(() => Gasto)
  // public gasto: HasOne<typeof Gasto>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
