import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Vehiculo from './Vehiculo'

export default class Operacion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date_start: Date

  @column()
  public date_end: Date

  @column()
  public vehiculo_id: number

  @column()
  public municipio_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //RELACIONES

  //Relacion de le pertenece a... Municipio
  @belongsTo(() => Municipio, {
    //Nombre de la clave foranea que permita la relacion
    foreignKey: 'municipio_id'
  })
  public municipio: BelongsTo<typeof Municipio>


  //Relacion de le pertenece a... Vehiculo
  @belongsTo(() => Vehiculo, {
    //Nombre de la clave foranea que permita la relacion
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>
}
