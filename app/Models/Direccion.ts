import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Direccion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public neighborhood: string

  @column()
  public address: string

  @column()
  public comentaries: string
  
  @column()
  public municipio_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
