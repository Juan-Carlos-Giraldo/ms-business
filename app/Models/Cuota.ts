import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato'

export default class Cuota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero: number

  @column()
  public fechaVencimiento: Date

  @column()
  public monto: number

  @column()
  public estado: string

  // Relaciones

  // Relacion de le pertenece a... Contrato
  @belongsTo(() => Contrato, {
    foreignKey: 'contrato_id'
  })
  public contrato: BelongsTo<typeof Contrato>

  // Relacion de tiene uno... Factura
  // @hasOne(() => Factura, {
  //   foreignKey: 'cuota_id'
  // })
  // public factura: HasOne<typeof Factura>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
