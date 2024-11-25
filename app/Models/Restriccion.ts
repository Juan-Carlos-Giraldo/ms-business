import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'

export default class Restriccion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descripcion: string

  @column() 
  public fecha_inicio: Date

  @column()
  public fecha_fin: Date

  @column()
  public municipio_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relaciones
  @belongsTo(() => Municipio, {
    foreignKey: "municipio_id",
  })
  public municipio: BelongsTo<typeof Municipio>;
}
