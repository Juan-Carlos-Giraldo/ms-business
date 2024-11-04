import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'

export default class Departamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //RELACIONES

   //Relacion uno a muchos con la tabla de Seat
   @hasMany(() => Municipio, {
    //Nombre de la clave foranea que permita la relacion
    foreignKey: 'departamento_id'
  })
  public municipios: HasMany<typeof Municipio>

}
