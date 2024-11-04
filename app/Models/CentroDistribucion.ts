import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Direccion from './Direccion'

export default class CentroDistribucion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public capacity: number

  @column()
  public municipio_id: number

  @column()
  public direccion_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  // RELACIONES

  //Relacion pertenece a 
  @belongsTo(() => Municipio, {
  //Clave foranea
  foreignKey: 'municipio_id'
  })
  public municipio: BelongsTo<typeof Municipio>

  //Relacion pertenece a 
  @belongsTo(() => Direccion, {
  //Clave foranea
  foreignKey: 'direccion_id'
  })
  public direccion: BelongsTo<typeof Direccion>

  


}
