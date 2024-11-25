import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'

export default class Restriction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: String

  @column()
  public fStart: Date

  @column()
  public fEnd: Date

  @column()
  public municipio_id: number

  @belongsTo(() => Municipio, {
    foreignKey: 'municipio_id'
  })
  public contrato: BelongsTo<typeof Municipio>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
