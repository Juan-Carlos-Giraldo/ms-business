import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Departamento from './Departamento'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public departamento_id: number

  @column()
  public zip_code: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //RELACIONES 
  
  //Relacion pertenece a 
  @belongsTo(() => Departamento, {
    //Clave foranea
    foreignKey: 'theater_id'
  })
  public departamento: BelongsTo<typeof Departamento>
  
}
